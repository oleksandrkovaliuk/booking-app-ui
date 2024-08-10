import {
  deleteObject,
  getDownloadURL,
  listAll,
  ListResult,
  ref,
  uploadBytes,
} from "firebase/storage";
import { storage } from "@/configs/firebase";
import { toast } from "sonner";

interface UploadImgProps {
  event: React.ChangeEvent<HTMLInputElement>;
  user: string;

  location: string;
}
export const uploadUserListingImages = async ({
  event,
  user,
  location,
}: UploadImgProps) => {
  try {
    if (!event || !user || !location) {
      throw new Error("Some details are missing");
    } else {
      const uploadedImages = event.target.files as FileList;
      const uploadImagesIntoUserFolder = ref(
        storage,
        `users/${user}/listings/${location}/`
      );

      for (let i = 0; i < uploadedImages.length; i++) {
        const uploadingImg = uploadedImages[i];
        const pathToUserImg = ref(
          uploadImagesIntoUserFolder,
          uploadingImg.name
        );
        await uploadBytes(pathToUserImg, uploadingImg);
      }

      const resultImages = await listAll(uploadImagesIntoUserFolder);
      return await Promise.all(
        resultImages.items.map((item) => getDownloadURL(item))
      ).then((res) => res);
    }
  } catch (error) {
    toast.error((error as Error).message);
  }
};

export const deleteUserListingImages = async ({
  user,
  location,
}: {
  user: string;
  location: string;
}) => {
  try {
    const uploadImagesIntoUserFolder = ref(
      storage,
      `users/${user}/listings/${location}/`
    );
    const resultImages = await listAll(uploadImagesIntoUserFolder);
    await Promise.all(
      resultImages.items.map((item) => deleteObject(item))
    ).then((res) => res);
  } catch (error) {
    toast.error((error as Error).message);
  }
};

export const deleteIndividualListingImage = async ({
  user,
  location,
  image,
}: {
  user: string;
  location: string;
  image: string;
}) => {
  try {
    const uploadImagesIntoUserFolder = ref(
      storage,
      `users/${user}/listings/${location}/`
    );
    const resultImages = await listAll(uploadImagesIntoUserFolder);
    return await Promise.all(
      resultImages.items.map(async (item) => {
        const urls = await getDownloadURL(item).then((res) => res);
        if (urls === image) {
          await deleteObject(item);
        } else {
          return urls;
        }
      })
    ).then((res) => res);
  } catch (error) {
    toast.error((error as Error).message);
  }
};

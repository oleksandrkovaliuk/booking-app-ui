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
import { ListingState } from "@/app/api/apiCalls";
import { FormState } from "@/app/manage/_components/type";

interface UploadImgProps {
  event: React.ChangeEvent<HTMLInputElement>;
  user_email: string;
  location: string;
}
export const uploadUserListingImages = async ({
  event,
  user_email,
  location,
}: UploadImgProps) => {
  try {
    if (!event || !user_email || !location) {
      throw new Error("Some details are missing");
    } else {
      const uploadedImages = event.target.files as FileList;
      const uploadImagesIntoUserFolder = ref(
        storage,
        `users/${user_email}/listings/${location}/`
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
      const urls = await Promise.all(
        resultImages.items.map((item) => getDownloadURL(item))
      ).then((res) => res);
      return urls.reduce((acc: { url: string }[], curr) => {
        if (curr !== undefined) {
          acc.push({ url: curr });
        }
        return acc;
      }, []);
    }
  } catch (error) {
    toast.error((error as Error).message);
  }
};

export const deleteUserListingImages = async ({
  user_email,
  location,
}: {
  user_email: string;
  location: string;
}) => {
  try {
    const uploadImagesIntoUserFolder = ref(
      storage,
      `users/${user_email}/listings/${location}/`
    );
    const resultImages = await listAll(uploadImagesIntoUserFolder);
    const urls = await Promise.all(
      resultImages.items.map((item) => deleteObject(item))
    ).then((res) => res);
    return urls.reduce((acc: { url: string }[], curr) => {
      if (curr !== undefined) {
        acc.push({ url: curr });
      }
      return acc;
    }, []);
  } catch (error) {
    toast.error((error as Error).message);
  }
};

export const deleteIndividualListingImage = async ({
  user_email,
  location,
  image,
}: {
  user_email: string;
  location: string;
  image: string;
}) => {
  try {
    const uploadImagesIntoUserFolder = ref(
      storage,
      `users/${user_email}/listings/${location}/`
    );
    const resultImages = await listAll(uploadImagesIntoUserFolder);
    const urls = await Promise.all(
      resultImages.items.map(async (item) => {
        const urls = await getDownloadURL(item).then((res) => res);
        if (urls === image) {
          await deleteObject(item);
        } else {
          return urls;
        }
      })
    ).then((res) => res);

    return urls.reduce((acc: { url: string }[], curr) => {
      if (curr !== undefined) {
        acc.push({ url: curr });
      }
      return acc;
    }, []);
  } catch (error) {
    toast.error((error as Error).message);
  }
};

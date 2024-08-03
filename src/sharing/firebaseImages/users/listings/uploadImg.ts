import {
  deleteObject,
  getDownloadURL,
  listAll,
  ListResult,
  ref,
  uploadBytes,
} from "firebase/storage";
import { storage } from "@/configs/firebase";
import { validateImagesTypes } from "./validation";
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
      if (!validateImagesTypes(uploadedImages)) {
        throw new Error("Some of the uploaded images are not supported");
      } else {
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
        console.log(
          resultImages.items.map((item) => getDownloadURL(item)),
          "result urls"
        );
        return resultImages.items.map((item) => getDownloadURL(item));
      }
    }
  } catch (error) {
    toast.error((error as Error).message);
  }

  //   try {
  //     if (validationOnImgType(uploadingImg.type)) {
  //       const res = await listAll(pathToEventFolder);
  //       if (res.items.length) {
  //         await Promise.all(res.items.map((item) => deleteObject(item)));
  //       }

  //       await uploadBytes(insertImgIntoFolder, uploadingImg);

  //       const resWithUpdatedImg = await listAll(pathToEventFolder);
  //       const returnedUrl = await getDownloadURL(resWithUpdatedImg.items[0]);
  //       return { url: returnedUrl, message: "your img succesfully uploaded" };
  //     } else {
  //       return { message: "you cannot upload this type of file" };
  //     }
  //   } catch (error) {
  //     return null;
  //   }
};

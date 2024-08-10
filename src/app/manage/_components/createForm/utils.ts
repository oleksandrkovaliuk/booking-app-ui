import { deleteUserListingImages } from "@/sharing/firebaseImages/users/listings/uploadImg";
import { toast } from "sonner";

export const clearAllStorage = async ({
  user,
  location,
}: {
  user: string;
  location: string;
}) => {
  try {
    await deleteUserListingImages({
      user,
      location,
    });

    localStorage.removeItem("step");
    localStorage.removeItem("typeOfPlace");
    localStorage.removeItem("category");
    localStorage.removeItem("cordinates");
    localStorage.removeItem("formattedAddress");
    localStorage.removeItem("guests");
    localStorage.removeItem("additionalDetails");
    localStorage.removeItem("startingDate");
    localStorage.removeItem("images");
    localStorage.removeItem("title");
    localStorage.removeItem("aboutplace");
    localStorage.removeItem("placeis");
    localStorage.removeItem("notes");
    localStorage.removeItem("price");
    localStorage.removeItem("description");
  } catch (error) {
    toast.error((error as Error).message);
  }
};

import { deleteUserListingImages } from "@/sharing/firebaseImages/users/listings/uploadImg";
import { toast } from "sonner";

export const clearAllStorage = () => {
  try {
    localStorage.removeItem("step");
    localStorage.removeItem("typeOfPlace");
    localStorage.removeItem("category");
    localStorage.removeItem("cordinates");
    localStorage.removeItem("address");
    localStorage.removeItem("formattedAddress");
    localStorage.removeItem("guests");
    localStorage.removeItem("additionalDetails");
    localStorage.removeItem("startingDate");
    localStorage.removeItem("images");
    localStorage.removeItem("title");
    localStorage.removeItem("aboutPlace");
    localStorage.removeItem("placeIs");
    localStorage.removeItem("notes");
    localStorage.removeItem("price");
    localStorage.removeItem("description");
  } catch (error) {
    toast.error((error as Error).message);
  }
};

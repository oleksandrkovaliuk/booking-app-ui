import { toast } from "sonner";

export const clearAllStorage = () => {
  try {
    localStorage.removeItem("step");
    localStorage.removeItem("type");
    localStorage.removeItem("category");
    localStorage.removeItem("cordinates");
    localStorage.removeItem("address");
    localStorage.removeItem("guests");
    localStorage.removeItem("pets_allowed");
    localStorage.removeItem("accesable");
    localStorage.removeItem("startingDate");
    localStorage.removeItem("images");
    localStorage.removeItem("title");
    localStorage.removeItem("aboutplace");
    localStorage.removeItem("placeis");
    localStorage.removeItem("notes");
    localStorage.removeItem("price");
  } catch (error) {
    toast.error((error as Error).message);
  }
};

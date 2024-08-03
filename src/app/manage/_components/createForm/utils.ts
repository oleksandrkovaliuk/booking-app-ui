import { Category, TypeOfPlace } from "@/store/reducers/listingsReducer";
import { FormState, GoogleMapProps } from "../type";

export const initialFormState = {
  step: Number(localStorage.getItem("step")) ?? 0,
  category: JSON.parse(
    localStorage.getItem("category") || "{}"
  ) as Category | null,
  typeOfPlace: JSON.parse(
    localStorage.getItem("typeOfPlace") || "{}"
  ) as TypeOfPlace | null,
  cordinates: JSON.parse(
    localStorage.getItem("cordinates") || '{"lat": 0, "lng": 0}'
  ) as GoogleMapProps["cordinates"],
  address: localStorage.getItem("address") ?? "",
  amoutOfPeople: Number(localStorage.getItem("guests")) ?? 1,
  guests: Number(localStorage.getItem("guests")) ?? 1,
  additionalDetails: JSON.parse(
    localStorage.getItem("additionalDetails") || "{}"
  ) as {
    pets: boolean;
    accesable: boolean;
  },
  images: JSON.parse(localStorage.getItem("images") || "[]") as string[],
};

export const clearAllStorage = () => {
  localStorage.removeItem("step");
  localStorage.removeItem("typeOfPlace");
  localStorage.removeItem("category");
  localStorage.removeItem("cordinates");
  localStorage.removeItem("address");
  localStorage.removeItem("guests");
  localStorage.removeItem("additionalDetails");
  localStorage.removeItem("startingDate");
};
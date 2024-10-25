import { IFormState } from "@/app/manage/_components/type";

type optionalTypes = "guests" | "placeis" | "notes" | "aboutplace" | "address";
export interface IListingCardProps
  extends Omit<IFormState, optionalTypes>,
    Partial<Pick<IFormState, optionalTypes>> {
  id?: number;
  isPreview?: boolean;
  isPublic?: boolean;
  isManagable?: boolean;
  isInProccess?: boolean;
  typeOfPlace?: string;
  isComplete?: boolean;
}

import { FormState } from "@/app/manage/_components/type";

type optionalTypes = "guests" | "placeis" | "notes" | "aboutplace" | "address";
export interface ListingCardProps
  extends Omit<FormState, optionalTypes>,
    Partial<Pick<FormState, optionalTypes>> {
  id?: number;
  isPreview?: boolean;
  isPublic?: boolean;
  isManagable?: boolean;
  isInProccess?: boolean;
  typeOfPlace?: string;
  isComplete?: boolean;
}

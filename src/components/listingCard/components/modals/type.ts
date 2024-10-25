import { IListingCardProps } from "../../type";

export interface ModalProps extends Omit<IListingCardProps, "price"> {
  onClose: () => void;
  isOpen: boolean;
  listingHasUnsavedChanges?: {
    is_edit: boolean;
    is_availability: boolean;
  };
  onOpenChange?: () => void;
}

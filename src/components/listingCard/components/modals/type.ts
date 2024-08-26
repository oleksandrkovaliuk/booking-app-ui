import { ListingCardProps } from "../../type";

export interface ModalProps extends Omit<ListingCardProps, "price"> {
  onClose: () => void;
  isOpen: boolean;
  listingHasUnsavedChanges?: {
    is_edit: boolean;
    is_availability: boolean;
  };
  onOpenChange?: () => void;
}

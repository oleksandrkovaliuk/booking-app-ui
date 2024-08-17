import { ListingCardProps } from "../../type";

export interface ModalProps extends Omit<ListingCardProps, "price"> {
  onClose: () => void;
  isOpen: boolean;
  onOpenChange?: () => void;
}

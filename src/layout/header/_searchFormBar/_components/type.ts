import { TypesOfSelections } from "@/_utilities/enums";

export interface HandlePopUpMenuOpening {
  (e: React.MouseEvent, type: TypesOfSelections): void;
}
export interface SelectionComponentsProps {
  searchBarRef: React.RefObject<HTMLFormElement>;

  handlePopUpMenuOpening: HandlePopUpMenuOpening;
}

export interface ClearDateSelectionProps {
  callback: (...args: any[]) => void;
  show: boolean;
  disabled: boolean;
}

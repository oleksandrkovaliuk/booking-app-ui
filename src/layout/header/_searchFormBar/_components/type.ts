import { TypesOfSelections } from "@/_utilities/enums";

export interface IHandlePopUpMenuOpening {
  (e: React.MouseEvent, type: TypesOfSelections): void;
}
export interface ISelectionComponentsProps {
  searchBarRef: React.RefObject<HTMLFormElement>;

  handlePopUpMenuOpening: IHandlePopUpMenuOpening;
}

export interface IClearDateSelectionProps {
  callback: (...args: any[]) => void;
  show: boolean;
  disabled: boolean;
}

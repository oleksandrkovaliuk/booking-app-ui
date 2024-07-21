import { StaticImageData } from "next/image";

export interface CenterNavigationMenuProps {
  windowIsScrolled: boolean;
  mobile: boolean;
  onCloseCallBack?: () => void;
}

export interface RightNavigationMenuProps
  extends Omit<CenterNavigationMenuProps, "onCloseCallBack"> {
  windowIsScrolledToTop: boolean;
}

export interface SearchFormBarProps {
  staysButtonState: boolean;
  isCategoryChanged: boolean;
  setIsCategoryChanged: React.Dispatch<React.SetStateAction<boolean>>;
  trackScrolled: boolean;
  isMobile: boolean;
  onCloseCallBack?: () => void;
}

export interface regionResponceType {
  id: number;
  city: string;
  country: string;
  countryCode: string;
}
export interface regionsType {
  id: number;
  region: string;
  map: StaticImageData;
}

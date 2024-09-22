import { StaticImageData } from "next/image";

export interface CenterNavigationMenuProps {
  windowIsScrolled: boolean;
  mobile: boolean;
  onCloseCallBack?: () => void;
}

export interface RightNavigationMenuProps
  extends Omit<CenterNavigationMenuProps, "onCloseCallBack" | "mobile"> {
  windowIsScrolledToTop: boolean;
}

export interface SearchFormBarProps {
  trackScrolled: boolean;

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

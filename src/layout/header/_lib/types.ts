import { StaticImageData } from "next/image";

export interface ICenterNavigationMenuProps {
  windowIsScrolled: boolean;
  mobile: boolean;
  onCloseCallBack?: () => void;
}

export interface IRightNavigationMenuProps
  extends Omit<ICenterNavigationMenuProps, "onCloseCallBack" | "mobile"> {
  windowIsScrolledToTop: boolean;
}

export interface ISearchFormBarProps {
  trackScrolled: boolean;

  onCloseCallBack?: () => void;
}

export interface IRegionResponceType {
  id: number;
  city: string;
  country: string;
  countryCode: string;
}
export interface IRegionsType {
  id: number;
  region: string;
  map: StaticImageData;
}

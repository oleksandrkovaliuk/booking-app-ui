import { DateValue } from "@nextui-org/calendar";

import { IFormState } from "@/app/manage/_components/type";
import { IRegionResponceType } from "@/layout/header/_lib/types";
import { IShowCaseUser } from "@/_utilities/interfaces";

export interface ICategory {
  id: number;
  category_name: string;
  category_icon?: string;
}

export interface ITypeOfPlace {
  id: number;
  type_name: string;
  type_img: string;
  type_description: string;
}

export interface IListingState extends IFormState {
  id?: number;
  host_id?: number;
  host_email?: string;
  host_name?: string;
  iscomplete?: boolean;
  disabled_dates?: DateValue[];
  [key: string]: any;
}

export interface IUserSearchRegionHistory {
  id: number;
  requestedAt: string;
  region: IRegionResponceType;
  formattedValue: string;
}

export interface IChatData {
  chat_data: {
    to: string;
    from: string;
    sent_at: Date;
    message: string;
    seenByReceiver: boolean;
    required_reservation?: boolean;
  }[];
  reciever: IShowCaseUser;
}

export interface IUsersChats {
  id: number;
  listing_info: {
    id: number;
    address: google.maps.places.PlaceResult["address_components"];
    preview: string;
  };
  chatPartner: IShowCaseUser;
  reservation_dates: string;
}

export interface IUserNotifications {
  id: number;
  type: "INBOX_MESSAGE";
  seen: boolean;
  message: string;
  created_at: Date;
  user_email: string;
  listing_id?: number;
  redirect_href?: string;
}

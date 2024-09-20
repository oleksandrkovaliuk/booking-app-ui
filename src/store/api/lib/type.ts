import { DateValue } from "@nextui-org/calendar";

import { FormState } from "@/app/manage/_components/type";
import { regionResponceType } from "@/layout/header/_lib/types";

export interface Category {
  id: number;
  category_name: string;
  category_icon?: string;
}

export interface TypeOfPlace {
  id: number;
  type_name: string;
  type_img: string;
  type_description: string;
}

export interface ListingState extends FormState {
  id?: number;
  host_id?: number;
  host_email?: string;
  host_name?: string;
  iscomplete?: boolean;
  disabled_dates?: DateValue[];
  [key: string]: any;
}

export interface UserSearchRegionHistory {
  id: number;
  requestedAt: string;
  region: regionResponceType;
  formattedValue: string;
}

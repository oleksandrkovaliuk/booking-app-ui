import { FormState } from "@/app/manage/_components/type";

export interface ParamsProps {
  user: string;
  id: string;
}

export interface ContentProps {
  params: ParamsProps;
}

export interface EditFormValues extends FormState {
  edit_category?: FormState["category"];
  edit_type?: FormState["type"];
  edit_cordinates?: FormState["cordinates"];
  edit_address?: FormState["address"];
  edit_guests?: FormState["guests"];
  edit_pets_allowed?: FormState["pets_allowed"];
  edit_accesable?: FormState["accesable"];
  edit_images?: FormState["images"] | [];
  edit_title?: FormState["title"];
  edit_placeis?: FormState["placeis"];
  edit_aboutplace?: FormState["aboutplace"];
  edit_notes?: FormState["notes"];
  edit_price?: FormState["price"];
}

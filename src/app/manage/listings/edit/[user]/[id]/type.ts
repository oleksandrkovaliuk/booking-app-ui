import { IFormState } from "@/app/manage/_components/type";

export interface IParamsProps {
  user: string;
  id: string;
}

export interface ContentProps {
  params: IParamsProps;
}

export interface IEditFormValues extends IFormState {
  edit_category?: IFormState["category"];
  edit_type?: IFormState["type"];
  edit_cordinates?: IFormState["cordinates"];
  edit_address?: IFormState["address"];
  edit_guests?: IFormState["guests"];
  edit_pets_allowed?: IFormState["pets_allowed"];
  edit_accesable?: IFormState["accesable"];
  edit_images?: IFormState["images"] | [];
  edit_title?: IFormState["title"];
  edit_placeis?: IFormState["placeis"];
  edit_aboutplace?: IFormState["aboutplace"];
  edit_notes?: IFormState["notes"];
  edit_price?: IFormState["price"];
}

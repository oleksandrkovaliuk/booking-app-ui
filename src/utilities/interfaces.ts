export interface SvgProps extends React.SVGProps<SVGSVGElement> {}

export interface FullUserTypes {
  email: string;
  user_name?: string;
  user_lastname?: string;
  img_url?: string;
  provider?: string;
}
export interface UserTypes
  extends Omit<
    FullUserTypes,
    "user_name" | "user_lastname" | "img_url" | "provider"
  > {
  password: string;
}

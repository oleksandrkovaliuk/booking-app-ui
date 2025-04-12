export interface ISvgProps extends React.SVGProps<SVGSVGElement> {}

export interface IFullIUserTypes {
  user_email: string;
  user_name?: string;
  user_lastname?: string;
  img_url?: string;
  provider?: string;
  role?: string;
}

export interface IShowCaseUser
  extends Omit<IFullIUserTypes, "user_lastname" & "provider" & "role"> {}

export interface IUserTypes
  extends Omit<
    IFullIUserTypes,
    "user_name" | "user_lastname" | "img_url" | "provider"
  > {
  password: string;
}

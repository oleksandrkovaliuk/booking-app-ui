export interface SvgProps extends React.SVGProps<SVGSVGElement> {}

export interface FullUserTypes {
  email: string;
  user_name?: string;
  user_lastname?: string;
  img_url?: string;
  provider?: string;
  role?: string;
}

export interface ShowCaseUser
  extends Omit<FullUserTypes, "user_lastname" & "provider" & "role"> {}

export interface UserTypes
  extends Omit<
    FullUserTypes,
    "user_name" | "user_lastname" | "img_url" | "provider"
  > {
  password: string;
}

export interface UploadImgProps {
  incomingData: FormData;
}

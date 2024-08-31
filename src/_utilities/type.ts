export type ReactEvent =
  | React.ChangeEvent<HTMLInputElement>
  | React.MouseEvent<HTMLElement>;

export type GoogleProfile = {
  email: string;
  name: string;
  picture: string;
};

export type FacebookProfile = {
  email: string;
  name: string;
  picture: {
    data: {
      url: string;
    };
  };
};

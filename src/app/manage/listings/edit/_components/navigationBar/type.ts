import { IParamsProps } from "../../[user]/[id]/type";

export interface NavigationBarProps {
  params: IParamsProps;
  children?: React.ReactNode;
}

export interface NavigationListProps {
  content: { id: number; href: string; content: string }[];
}

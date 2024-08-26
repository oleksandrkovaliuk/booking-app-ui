import { ParamsProps } from "../../[user]/[id]/type";

export interface NavigationBarProps {
  params: ParamsProps;
  children?: React.ReactNode;
}

export interface NavigationListProps {
  content: { id: number; href: string; content: string }[];
}

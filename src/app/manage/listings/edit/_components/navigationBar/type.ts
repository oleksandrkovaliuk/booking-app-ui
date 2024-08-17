import { ParamsProps } from "../../[user]/[id]/type";

export interface NavigationBarProps {
  params: ParamsProps;
}

export interface NavigationListProps {
  content: { id: number; href: string; content: string }[];
}

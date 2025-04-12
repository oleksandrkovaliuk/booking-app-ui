export interface RoundButtonProps {
  action: (...args: any[]) => void;
  arrow_direction: "left" | "right";
  showToolTip: boolean;
  toolTipPlacement?:
    | "top"
    | "bottom"
    | "right"
    | "left"
    | "top-start"
    | "top-end"
    | "bottom-start"
    | "bottom-end"
    | "left-start"
    | "left-end"
    | "right-start"
    | "right-end";
  className?: string;
  toolTipContent?: string;
  toolTipDelay?: number;
}

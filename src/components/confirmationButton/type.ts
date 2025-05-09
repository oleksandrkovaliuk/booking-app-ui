export interface IConfirmationButtonProps {
  position: "bottom-left" | "bottom-right";
  children: React.ReactNode;
  onConfirm: (e: React.FormEvent | React.MouseEvent, args?: any) => void;
  enable: boolean;
}

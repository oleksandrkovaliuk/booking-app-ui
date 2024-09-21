import { createContext, useContext } from "react";
import { TypesOfSelections } from "@/_utilities/enums";

export const StaysButtonContextData = createContext<{
  staysButtonState: boolean;
  isCategoryChanged: boolean;
}>({
  staysButtonState: true,
  isCategoryChanged: false,
});

export const StaysButtonContextApi = createContext<{
  setIsCategoryChanged: React.Dispatch<React.SetStateAction<boolean>>;
  setStaysButtonState: React.Dispatch<React.SetStateAction<boolean>>;
}>({
  setIsCategoryChanged: () => {},
  setStaysButtonState: () => {},
});

export const TriggeredSelectionData = createContext<{
  triggeredSelection: TypesOfSelections;
}>({
  triggeredSelection: TypesOfSelections.UNSELECTED,
});

export const TriggeredSelectionApi = createContext<{
  setTriggeredSelection: (type: TypesOfSelections) => void;
}>({
  setTriggeredSelection: () => {},
});

export const useTriggeredSelectionData = () =>
  useContext(TriggeredSelectionData);
export const useTriggeredSelectionApi = () => useContext(TriggeredSelectionApi);

export const useStaysButtonContextApi = () => useContext(StaysButtonContextApi);
export const useStaysButtonContextData = () =>
  useContext(StaysButtonContextData);

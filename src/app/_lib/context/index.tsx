import { createContext, useContext } from "react";

export const IsSearchTriggeredContextApi = createContext<{
  setIsSearchTriggered: (isSearchedTriggered: boolean) => void;
}>({
  setIsSearchTriggered: () => {},
});

export const IsSearchTriggeredContextData = createContext<{
  isSearchTriggered: boolean;
}>({
  isSearchTriggered: false,
});

export const useIsSearchTriggeredApi = () =>
  useContext(IsSearchTriggeredContextApi);
export const useIsSearchTriggeredData = () =>
  useContext(IsSearchTriggeredContextData);

import React, { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";

import { IsSearchTriggeredContextApi, IsSearchTriggeredContextData } from "..";
import { SEARCH_PARAM_KEYS } from "@/layout/header/_lib/enums";

export const IsSearchTriggeredProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const params = useSearchParams();
  const [isSearchTriggered, setIsSearchTriggered] = useState<boolean>(false);

  const searchedTriggeredData = useMemo(() => {
    return {
      isSearchTriggered,
    };
  }, [isSearchTriggered]);

  const searchedTriggeredApi = useMemo(() => {
    return {
      setIsSearchTriggered,
    };
  }, [setIsSearchTriggered]);

  return (
    <IsSearchTriggeredContextApi.Provider value={searchedTriggeredApi}>
      <IsSearchTriggeredContextData.Provider value={searchedTriggeredData}>
        {children}
      </IsSearchTriggeredContextData.Provider>
    </IsSearchTriggeredContextApi.Provider>
  );
};

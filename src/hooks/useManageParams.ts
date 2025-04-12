import { useCallback } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

import { CreateNewQueryParams } from "@/helpers/paramsManagment";

interface ParamsObject {
  [key: string]: string | null;
}

export const useManageParams = () => {
  const router = useRouter();
  const pathname = usePathname();
  const params = useSearchParams();

  const setParams = useCallback(
    (newParams: ParamsObject) => {
      const updatedParams = CreateNewQueryParams({
        updatedParams: newParams,
        params,
      });

      router.replace(`${pathname}?${updatedParams}`, {
        scroll: false,
      });
    },
    [router, pathname, params]
  );

  return { setParams };
};

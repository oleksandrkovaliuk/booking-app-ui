import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";

export const updateAndStoreQueryParams = ({
  updatedParams,
  isOnlyParams,
  pathname,
  params,
  router,
}: {
  isOnlyParams?: boolean;
  updatedParams: { [key: string]: string | null };
  pathname: string | null;
  params: URLSearchParams;
  router: AppRouterInstance;
}) => {
  const newparams = new URLSearchParams(params);
  Object.entries(updatedParams).forEach(([key, value]) => {
    if (value) {
      !isOnlyParams && localStorage.setItem(key, value);
      newparams.set(key, value);
    } else {
      !isOnlyParams && localStorage.removeItem(key);
      newparams.delete(key);
    }
  });
  console.log("calls");
  router.replace(`${pathname}?${newparams.toString()}`);
};

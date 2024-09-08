import { SEARCH_PARAM_KEYS } from "@/layout/header/_lib/enums";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";

export const updateAndStoreQueryParams = ({
  updatedParams,
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
      newparams.set(key, value);
    } else {
      newparams.delete(key);
    }
  });

  router.replace(`${pathname}?${newparams.toString()}&`);
};

export const ExtractAvailableQueryParams = (params: URLSearchParams) => {
  const query: { [key: string]: string | null } = {};
  params.forEach((value, key) => {
    query[key] = value;
  });
  return query;
};

export const PrepareExtractedQueryParams = ({
  searchParamsResult,
}: {
  searchParamsResult: { [key: string]: string | null };
}) => {
  let query: string = "";
  Object.keys(searchParamsResult).forEach((key) => {
    if (key) {
      query += `${key}=${searchParamsResult[key]}&`;
    }
  });

  return query;
};

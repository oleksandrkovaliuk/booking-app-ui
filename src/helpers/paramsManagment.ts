import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";

export const assignNewQueryParams2 = ({
  updatedParams,
  params,
}: {
  updatedParams: { [key: string]: string | null };
  params: URLSearchParams;
}) => {
  const existingParams = new URLSearchParams(params);
  Object.entries(updatedParams).forEach(([key, value]) => {
    if (value || value === '0') {
      existingParams.set(key, value);
    }
  });

  return existingParams.toString();
};

export const AssignNewQueryParams = ({
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
  const existingParams = new URLSearchParams(params);
  Object.entries(updatedParams).forEach(([key, value]) => {
    if (value) {
      existingParams.set(key, value);
    } else {
      existingParams.delete(key);
    }
  });

  router.replace(`${pathname}?${existingParams.toString()}`, {
    scroll: false,
  });
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
  const searchParams = new URLSearchParams();

  Object.keys(searchParamsResult).forEach((key) => {
    if (key) {
      searchParams.append(key, searchParamsResult[key]!);
    }
  });

  return searchParams.toString();
};

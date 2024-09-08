export const getSearchSelection = (
  params: URLSearchParams,
  searchParamsTypes: { [key: string]: string }
): { [key in keyof typeof searchParamsTypes]: string } => {
  const result: Partial<{ [key in keyof typeof searchParamsTypes]: string }> =
    {};

  Object.values(searchParamsTypes).forEach((searchParamKey) => {
    const value = params.get(searchParamKey);
    if (value) {
      result[searchParamKey] = value;
    }
  });

  return result as { [key in keyof typeof searchParamsTypes]: string };
};

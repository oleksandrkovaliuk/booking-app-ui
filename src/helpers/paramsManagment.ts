export const CreateNewQueryParams = ({
  updatedParams,
  params,
}: {
  updatedParams: { [key: string]: string | null };
  params: URLSearchParams;
}) => {
  const existingParams = new URLSearchParams(params);
  Object.entries(updatedParams).forEach(([key, value]) => {
    if (value) {
      existingParams.set(key, value);
    } else {
      existingParams.delete(key);
    }
  });

  return existingParams.toString();
};

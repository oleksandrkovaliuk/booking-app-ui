export const URL = process.env.NEXT_PUBLIC_SERVER_URL;
const HEADER = {
  "Content-Type": "application/json",
};

// Case if no URL defined
if (!URL) throw new Error("SERVER URL is not defined");

const handleError = async (response: Response) => {
  const resjson = await response?.json();
  if (!response.ok) throw Error(resjson?.message || resjson?.status);
  return resjson;
};

export const GET = async (apiPath: string) =>
  await fetch(`${URL}/${apiPath}`, {
    method: "GET",
    headers: { ...HEADER },
  })
    .then(handleError)
    .catch((error) => {
      throw Error(error);
    });

export const POST = async (apiPath: string, content: Record<string, any>) =>
  await fetch(`${URL}/${apiPath}`, {
    method: "POST",
    headers: { ...HEADER },
    body: JSON.stringify(content),
  })
    .then(handleError)
    .catch((error) => {
      throw Error(error);
    });

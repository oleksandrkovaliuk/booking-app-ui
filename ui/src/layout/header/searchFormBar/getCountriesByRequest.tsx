export const getCountriesByRequest = async (value: string) => {
  const url = `https://wft-geo-db.p.rapidapi.com/v1/geo/cities?namePrefix=${value}&limit=5`;
  const options = {
    method: "GET",
    headers: {
      "x-rapidapi-key": process.env.NEXT_PUBLIC_COUNTRIES_API_KEY || "",
      "x-rapidapi-host": "wft-geo-db.p.rapidapi.com",
    },
  };
  console.log(process.env.REACT_APP_COUNTRIES_API_KEY, "check");
  try {
    const response = await fetch(url, options);
    const result = await response.json();
    return result;
  } catch (error) {
    console.error(error);
    return null;
  }
};

import { ListingState } from "@/app/api/apiCalls";

export const ParseJSONFields = (data: ListingState) => {
  const parsedObj = {} as ListingState;

  for (let [key, values] of Object.entries(data)) {
    try {
      if (key === "images" && typeof values === "string") {
        parsedObj[key] = values
          .slice(1, -1)
          .split('","')
          .map((url) => url.replace(/\\/g, ""));
      } else {
        parsedObj[key] = JSON.parse(values);
      }
    } catch (e) {
      parsedObj[key] = values;
    }
  }

  return parsedObj;
};

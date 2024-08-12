import { ListingState } from "@/app/api/apiCalls";

export const ParseJSONFields = (data: ListingState) => {
  const parsedObj = {} as ListingState;

  for (let [key, values] of Object.entries(data)) {
    try {
      parsedObj[key] = JSON.parse(values);
    } catch (e) {
      parsedObj[key] = values;
    }
  }

  console.log(parsedObj);
  return parsedObj;
};

// REQUIRMENT FOR ADDRESS
export const requirmentForAddressComponent = [
  "neighborhood",
  "locality",
  "administrative_area_level_1",
  "country",
];

const formatsOfAddress = {
  country: ["country"],
  cityCountry: ["locality", "country"],
  cityStateCountry: ["locality", "administrative_area_level_1", "country"],
  neighborhoodCityStateCountry: [
    "neighborhood",
    "locality",
    "administrative_area_level_1",
    "country",
  ],
  neighboorhoodCountry: ["neighborhood", "country"],
  neighboorhoodStateCountry: [
    "neighborhood",
    "administrative_area_level_1",
    "country",
  ],
};

interface FormattedAddressProps {
  detailedAddressComponent: google.maps.places.PlaceResult["address_components"];
  variant:
    | "country"
    | "cityCountry"
    | "cityStateCountry"
    | "neighborhoodCityStateCountry"
    | "neighboorhoodCountry"
    | "neighboorhoodStateCountry";
}
export const formattedAddressComponent = ({
  detailedAddressComponent,
  variant,
}: FormattedAddressProps) => {
  if (!detailedAddressComponent) return;
  const result = detailedAddressComponent?.reduce<
    FormattedAddressProps["detailedAddressComponent"]
  >((acc, current) => {
    if (acc && formatsOfAddress[variant].includes(current.types[0])) {
      acc.push(current);
    }
    return acc;
  }, []);
  return result?.map(({ long_name }) => long_name).join(" , ");
};

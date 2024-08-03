import { useRef } from "react";
import { motion } from "framer-motion";
import {
  MarkerF,
  useLoadScript,
  StandaloneSearchBox,
  GoogleMap as GoogleMapComponent,
} from "@react-google-maps/api";
import { GoogleMapProps } from "../type";
import {
  appearAnimation,
  mapContainerStyle,
  options,
  sloverTransition,
} from "../consts";

import styles from "./googleMap.module.scss";
export const GoogleMap: React.FC<GoogleMapProps> = ({
  register,
  cordinates,
  setCordinates,
}) => {
  const searchBar = useRef<google.maps.places.SearchBox | null>(null);

  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAP_API_KEY!,
    libraries: ["places"],
  });

  if (loadError) return <div>Error loading map</div>;
  if (!isLoaded) return <div>Loading...</div>;

  const handleCordinatesChange = () => {
    if (searchBar.current) {
      const [places] =
        searchBar.current.getPlaces() as google.maps.places.PlaceResult[];
      if (places) {
        setCordinates({
          lat: places.geometry?.location?.lat() as number,
          lng: places.geometry?.location?.lng() as number,
          name: places.formatted_address as string,
        });
      }
    }
  };

  const handleMarkerDragEnd = async (e: google.maps.MapMouseEvent) => {
    if (e.latLng) {
      const street = await new google.maps.Geocoder().geocode(
        {
          location: {
            lat: e.latLng.lat(),
            lng: e.latLng.lng(),
          },
        },
        (results) => {
          return results;
        }
      );
      setCordinates({
        lat: e.latLng.lat() as number,
        lng: e.latLng.lng() as number,
        name: street.results[0].formatted_address as string,
      });
    }
  };

  return (
    <motion.div className={styles.location_map}>
      <StandaloneSearchBox
        onLoad={(searchBox) => (searchBar.current = searchBox)}
        onPlacesChanged={handleCordinatesChange}
      >
        <motion.input
          type="text"
          placeholder="Type your house address..."
          id="location"
          className="input"
          initial={appearAnimation.initial}
          animate={appearAnimation.animate}
          transition={sloverTransition}
          {...register("address", {
            onChange: (e: React.ChangeEvent<HTMLInputElement>) =>
              setCordinates({ ...cordinates!, name: e.target.value }),
          })}
        />
      </StandaloneSearchBox>
      <motion.div
        className={styles.map_container}
        initial={appearAnimation.initial}
        animate={appearAnimation.animate}
        transition={sloverTransition}
      >
        <GoogleMapComponent
          mapContainerStyle={mapContainerStyle}
          center={cordinates}
          zoom={17}
          options={options}
        >
          <MarkerF
            position={cordinates}
            draggable={true}
            onDragEnd={handleMarkerDragEnd}
            icon={{
              url: "https://firebasestorage.googleapis.com/v0/b/booking-app-31ebf.appspot.com/o/home.png?alt=media&token=5117ac6d-3d52-478b-a971-67f20e72bb40",
              scaledSize: new google.maps.Size(50, 50),
            }}
          />
        </GoogleMapComponent>
      </motion.div>
    </motion.div>
  );
};

"use client";
import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import {
  MarkerF,
  useLoadScript,
  StandaloneSearchBox,
  GoogleMap,
} from "@react-google-maps/api";

import {
  appearAnimation,
  mapContainerStyle,
  options,
  sloverTransition,
} from "@/app/manage/_components/consts";

import { IGoogleMapProps } from "./type";

import styles from "./googleMap.module.scss";
import "@/app/manage/_components/createForm/additionalStyles.scss";

export const GoogleMapComponent: React.FC<IGoogleMapProps> = ({
  editPage,
  register,
  isOnlyMap,
  cordinates,
  setCordinates,
  onConfirmation,
}) => {
  const searchBar = useRef<google.maps.places.SearchBox | null>(null);

  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAP_API_KEY!,
    libraries: ["places"],
  });

  console.log(
    isLoaded,
    searchBar,
    loadError,
    process.env.NEXT_PUBLIC_GOOGLE_MAP_API_KEY
  );

  const handleCordinatesChange = () => {
    if (searchBar.current) {
      const places =
        searchBar.current.getPlaces() as google.maps.places.PlaceResult[];

      if (places) {
        editPage && onConfirmation!(true);
        setCordinates!({
          lat: places[0].geometry?.location?.lat() as number,
          lng: places[0].geometry?.location?.lng() as number,
          address: places[0] as google.maps.places.PlaceResult,
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
      editPage && onConfirmation!(true);
      setCordinates!({
        lat: e.latLng.lat() as number,
        lng: e.latLng.lng() as number,
        address: street.results[0] as google.maps.places.PlaceResult,
      });
    }
  };

  useEffect(() => {
    const handlePreventEvent = (e: KeyboardEvent) => {
      if (e.key === "Enter") {
        e.preventDefault();
      }
    };
    document.addEventListener("keydown", handlePreventEvent);
    return () => document.removeEventListener("keydown", handlePreventEvent);
  }, []);

  if (loadError) return <div>Error loading map</div>;
  if (!isLoaded) return <div>Loading...</div>;

  return (
    <motion.div className={styles.location_map}>
      {!isOnlyMap && (
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
            {...register!(
              editPage
                ? `edit_address.formattedAddress`
                : `address.formattedAddress`
            )}
          />
        </StandaloneSearchBox>
      )}
      <motion.div
        className={styles.map_container}
        initial={appearAnimation.initial}
        animate={appearAnimation.animate}
        transition={sloverTransition}
      >
        <GoogleMap
          mapContainerStyle={mapContainerStyle}
          center={cordinates}
          zoom={isOnlyMap ? 14 : 17}
          options={options}
        >
          <MarkerF
            position={cordinates}
            draggable={isOnlyMap ? false : true}
            onDragEnd={handleMarkerDragEnd}
            icon={{
              url: "https://firebasestorage.googleapis.com/v0/b/booking-app-31ebf.appspot.com/o/home_ned.png?alt=media&token=417db10b-fab7-49b0-aed0-41fba0c65f32",
              scaledSize: new google.maps.Size(50, 50),
            }}
          />
        </GoogleMap>
      </motion.div>
    </motion.div>
  );
};

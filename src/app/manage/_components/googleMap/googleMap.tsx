"use client";
import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import {
  MarkerF,
  useLoadScript,
  StandaloneSearchBox,
  GoogleMap as GoogleMapComponent,
} from "@react-google-maps/api";

import {
  appearAnimation,
  mapContainerStyle,
  options,
  sloverTransition,
} from "../consts";

import { GoogleMapProps } from "../type";

import styles from "./googleMap.module.scss";
import "../createForm/additionalStyles.scss";
export const GoogleMap: React.FC<GoogleMapProps> = ({
  editPage,
  register,
  cordinates,
  setCordinates,
  onConfirmation,
}) => {
  const searchBar = useRef<google.maps.places.SearchBox | null>(null);

  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAP_API_KEY!,
    libraries: ["places"],
  });

  const handleCordinatesChange = () => {
    if (searchBar.current) {
      const places =
        searchBar.current.getPlaces() as google.maps.places.PlaceResult[];

      if (places) {
        editPage && onConfirmation!(true);
        setCordinates({
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
      setCordinates({
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
          {...register(
            editPage
              ? `edit_address.formattedAddress`
              : `address.formattedAddress`
          )}
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

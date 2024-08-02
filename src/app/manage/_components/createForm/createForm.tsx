"use client";
import React, {
  useEffect,
  useLayoutEffect,
  useReducer,
  useRef,
  useState,
} from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import {
  Button,
  Modal,
  ModalContent,
  Progress,
  Switch,
  useDisclosure,
} from "@nextui-org/react";
import {
  GoogleMap,
  useLoadScript,
  StandaloneSearchBox,
  MarkerF,
} from "@react-google-maps/api";
import {
  FieldValues,
  RegisterOptions,
  useForm,
  UseFormRegister,
  UseFormRegisterReturn,
  UseFormReturn,
} from "react-hook-form";

import { RootState } from "@/store";
import { Counter } from "@/components/counter";
import { videos } from "@/information/data";
import { CreateListingSteps } from "./type";
import { Category, TypeOfPlace } from "@/store/reducers/listingsReducer";

import styles from "./createForm.module.scss";
import "./additionalStyles.scss";
import { toast } from "sonner";

export interface FormState {
  step: CreateListingSteps;
  category: Category | null;
  type: TypeOfPlace | null;
  cordinates: GoogleMapProps["cordinates"];
  address: string;
  amoutOfPeople: number;
  additionalDetails: {
    pets: boolean;
    accesable: boolean;
  };
  startingDate: string;
}
export interface GoogleMapProps {
  cordinates: { lat: number; lng: number; name?: string };
  setCordinates: ({
    lat,
    lng,
    name,
  }: {
    lat: number;
    lng: number;
    name: string;
  }) => void;
  register: UseFormRegister<FormState>;
}

// FORMAT DATE TO DD/MM/HH/MM

const formatDate = (date: Date) => {
  return new Intl.DateTimeFormat("en-GB", {
    day: "numeric",
    month: "long",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  }).format(date);
};
// ANIMATIONS
const appearAnimation = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
};
const deepAppearAnimation = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
};
const transition = { duration: 0.4, ease: "easeOut" };
const sloverTransition = { ...transition, duration: 0.6 };

// MAP OPATIONS/STYLES
const mapContainerStyle = {
  width: "100%",
  height: "100%",
  borderRadius: "10px",
  outline: "none",
};

const options = {
  gestureHandling: "greedy",
  scrollwheel: true,
  draggable: true,
  fullscreenControl: false,
  mapTypeControl: false,
  zoomControl: false,
  streetViewControl: true,
};

const GoogleMapComponent: React.FC<GoogleMapProps> = ({
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
        <GoogleMap
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
        </GoogleMap>
      </motion.div>
    </motion.div>
  );
};
export const CreateForm: React.FC = () => {
  const router = useRouter();
  const { categories, typeOfPlace } = useSelector(
    (state: RootState) => state.listingsAdditionals
  );

  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [guests, setGuests] = useState(1);
  const [additionalDetails, setAdditionalDetails] = useState<
    FormState["additionalDetails"]
  >({ pets: false, accesable: false });
  const { register, watch, setValue } = useForm({
    defaultValues: {
      step: 0,
      category: null,
      type: null,
      cordinates: { lat: 0, lng: 0 } as GoogleMapProps["cordinates"],
      address: "",
      amoutOfPeople: guests,
      additionalDetails: additionalDetails,
    } as FormState,
  });

  // WATCH VALUES
  const formStep = watch("step");
  const selectedCategory = watch("category");
  const selectedTypeOfPlace = watch("type");
  const selectedCordinates = watch("cordinates");
  const selectedAdress = watch("address");

  const [startingDate] = useState<string>(() => {
    return formatDate(new Date());
  });

  // CONDITIONS
  const enumsKeys = Object.keys(CreateListingSteps)
    .map((item) => Number(item) + 1)
    .filter((item) => !isNaN(Number(item)));

  const isLastStep = formStep === Number(enumsKeys[enumsKeys.length - 1]);

  const isDoesntSelected =
    (formStep === CreateListingSteps.LOCATION && selectedCordinates === null) ||
    (formStep === CreateListingSteps.CATEGORY && selectedCategory === null) ||
    (formStep === CreateListingSteps.TYPE_OF_PLACE &&
      selectedTypeOfPlace === null) ||
    (formStep === CreateListingSteps.LOCATION && selectedAdress === "");

  // NAVIGATION
  const handleNextStep = () => {
    if (!isLastStep) {
      setValue("step", formStep! + 1);
      localStorage.setItem("step", JSON.stringify(formStep! + 1));
    }
  };
  const handlePreviousStep = () => {
    if (formStep === CreateListingSteps.INTRODUCING) {
      onOpen();
    } else {
      setValue("step", formStep! - 1);
      localStorage.setItem("step", JSON.stringify(formStep! - 1));
    }
  };
  const handleLeaveTheForm = () => {
    clearAllStorage();
    onOpenChange();
    router.back();
  };
  // CATEGORIES
  const handleSelectCategory = (
    e: React.ChangeEvent<HTMLInputElement>,
    category: Category
  ) => {
    e.preventDefault();
    setValue("category", category);
    if (category) {
      localStorage.setItem("category", JSON.stringify({ ...category }));
    }
  };

  // TYPE_OF_PLACE
  const handleSelectTypeOfPlace = (
    e: React.ChangeEvent<HTMLInputElement>,
    type: TypeOfPlace
  ) => {
    e.preventDefault();
    setValue("type", type);
    if (type) {
      localStorage.setItem("typeOfPlace", JSON.stringify({ ...type }));
    }
  };

  // CORDINATES
  const handleCordinatesChange = (cordinates: GoogleMapProps["cordinates"]) => {
    setValue("cordinates", { lat: cordinates.lat, lng: cordinates.lng });
    setValue("address", cordinates.name!);
    localStorage.setItem("address", JSON.stringify(cordinates.name));
    localStorage.setItem(
      "cordinates",
      JSON.stringify({ lat: cordinates.lat, lng: cordinates.lng })
    );
  };

  // ADDITIONAL DETAILS
  const handleAdditionalDetailsChange = (
    name: keyof FormState["additionalDetails"]
  ) => {
    setAdditionalDetails({
      ...additionalDetails!,
      [name]: !additionalDetails![name],
    });
    localStorage.setItem(
      "additionalDetails",
      JSON.stringify({
        ...additionalDetails!,
        [name]: !additionalDetails![name],
      })
    );
  };

  // CLEAR
  const clearAllStorage = () => {
    localStorage.removeItem("step");
    localStorage.removeItem("typeOfPlace");
    localStorage.removeItem("category");
    localStorage.removeItem("cordinates");
    localStorage.removeItem("address");
    localStorage.removeItem("guests");
    localStorage.removeItem("additionalDetails");
    localStorage.removeItem("startingDate");
  };
  // SUBMIT
  const submitCreatedListing = (e: React.FormEvent) => {
    e.preventDefault();
    clearAllStorage();
    toast(
      <div className="toast success">
        🎉 Your listing has been created successfully.
      </div>
    );
    router.back();
  };

  useEffect(() => {
    const typeOfPlace = localStorage.getItem("typeOfPlace");
    const category = localStorage.getItem("category");
    const address = localStorage.getItem("address");
    const cordinates = localStorage.getItem("cordinates");
    const guests = localStorage.getItem("guests");
    const additionalDetails = localStorage.getItem("additionalDetails");
    const body = document.body;
    if (formStep !== CreateListingSteps.CATEGORY && window.innerWidth >= 375)
      body.classList.add("disable-scroll");

    if (category) setValue("category", JSON.parse(category));

    if (typeOfPlace) setValue("type", JSON.parse(typeOfPlace));

    if (address) setValue("address", JSON.parse(address));

    if (cordinates) setValue("cordinates", JSON.parse(cordinates));

    if (guests) setGuests(Number(guests));

    if (additionalDetails) setAdditionalDetails(JSON.parse(additionalDetails));

    return () => {
      body.classList.remove("disable-scroll");
    };
  }, [formStep, setValue, startingDate]);

  useEffect(() => {
    if (guests !== 1) localStorage.setItem("guests", JSON.stringify(guests));
  }, [guests]);
  useLayoutEffect(() => {
    if (typeof localStorage !== "undefined") {
      const step = localStorage.getItem("step");
      const type = localStorage.getItem("typeOfPlace");
      const category = localStorage.getItem("category");
      const address = localStorage.getItem("address");
      const cordinates = localStorage.getItem("cordinates");
      const guests = localStorage.getItem("guests");
      const additionalDetails = localStorage.getItem("additionalDetails");

      if (step) setValue("step", Number(step));

      if (category) setValue("category", JSON.parse(category));

      if (type) setValue("type", JSON.parse(type));

      if (address) setValue("address", JSON.parse(address));

      if (cordinates) setValue("cordinates", JSON.parse(cordinates));

      if (guests) setGuests(Number(guests));

      if (additionalDetails)
        setAdditionalDetails(JSON.parse(additionalDetails));

      localStorage.setItem("startingDate", JSON.stringify(startingDate));
    }
  }, [setValue, startingDate]);

  return (
    <>
      <form className={styles.create_form}>
        {formStep === CreateListingSteps.INTRODUCING && (
          <motion.div className={styles.introducing}>
            <motion.div
              className={styles.introducing_text}
              initial={appearAnimation.initial}
              animate={appearAnimation.animate}
              transition={transition}
            >
              <motion.h1
                className={styles.title}
                initial={deepAppearAnimation.initial}
                animate={deepAppearAnimation.animate}
                transition={sloverTransition}
              >
                Tell us about your place
              </motion.h1>
              <motion.p
                className={styles.description}
                initial={deepAppearAnimation.initial}
                animate={deepAppearAnimation.animate}
                transition={sloverTransition}
              >
                In this step , we will ask you which type of place are you
                offering and if guest will book entire place or just a room .
                Then let us now your location.
              </motion.p>
            </motion.div>
            <motion.video
              autoPlay
              muted
              playsInline
              className={styles.video}
              initial={deepAppearAnimation.initial}
              animate={deepAppearAnimation.animate}
              transition={sloverTransition}
            >
              <source src={videos.apartament_building} type="video/mp4" />
            </motion.video>
          </motion.div>
        )}

        {formStep === CreateListingSteps.CATEGORY && (
          <motion.div
            className={styles.category_selections}
            initial={appearAnimation.initial}
            animate={appearAnimation.animate}
            transition={transition}
          >
            <motion.h1
              className={`${styles.title} ${styles.title_selections}`}
              initial={appearAnimation.initial}
              animate={appearAnimation.animate}
              transition={sloverTransition}
            >
              Which of these best describes your place?
            </motion.h1>

            <div className={styles.selections_container}>
              {categories?.map((category) => {
                return (
                  <motion.div
                    key={category.id}
                    className={`${styles.category}  ${styles.selection}`}
                    initial={deepAppearAnimation.initial}
                    animate={deepAppearAnimation.animate}
                    transition={sloverTransition}
                    data-selected={
                      selectedCategory && selectedCategory?.id === category?.id
                    }
                  >
                    <input
                      type="checkbox"
                      id={`category${category.id}`}
                      className={styles.hidden_checkbox}
                      {...(register("category"),
                      { onChange: (e) => handleSelectCategory(e, category) })}
                    />
                    <label
                      htmlFor={`category${category.id}`}
                      className={`${styles.selection_block}`}
                    >
                      <Image
                        src={category.category_icon!}
                        alt={category.category_icon!}
                        width={30}
                        height={30}
                        className={styles.category_img}
                      />
                      <motion.span className={styles.category_name}>
                        {category.category_name}
                      </motion.span>
                    </label>
                  </motion.div>
                );
              })}
              ;
            </div>
          </motion.div>
        )}

        {formStep === CreateListingSteps.TYPE_OF_PLACE && (
          <motion.div
            className={styles.type_of_place}
            initial={appearAnimation.initial}
            animate={appearAnimation.animate}
            transition={transition}
          >
            <motion.h1
              className={`${styles.title} ${styles.title_selections}`}
              initial={appearAnimation.initial}
              animate={appearAnimation.animate}
              transition={sloverTransition}
            >
              What type of place will guests have?
            </motion.h1>
            <div className={styles.selections_container}>
              {typeOfPlace?.map((type) => (
                <motion.div
                  key={type.id}
                  initial={deepAppearAnimation.initial}
                  animate={deepAppearAnimation.animate}
                  transition={sloverTransition}
                  className={`${styles.type_button} ${styles.selection}`}
                  data-selected={
                    selectedTypeOfPlace && type.id === selectedTypeOfPlace.id
                  }
                >
                  <input
                    type="checkbox"
                    id={`typeOfPlace${type.id}`}
                    aria-label={`typeOfPlace${type.id}`}
                    className={styles.hidden_checkbox}
                    {...(register("type"),
                    { onChange: (e) => handleSelectTypeOfPlace(e, type) })}
                  />

                  <div className={styles.type_of_place_text}>
                    <motion.span className={styles.type_name}>
                      {type.type_name}
                    </motion.span>
                    <motion.p className={styles.type_description}>
                      {type.type_description}
                    </motion.p>
                  </div>
                  <Image
                    src={type.type_img}
                    alt={type.type_img}
                    width={30}
                    height={30}
                    className={styles.type_img}
                  />
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {formStep === CreateListingSteps.LOCATION && (
          <motion.div
            className={styles.location}
            initial={appearAnimation.initial}
            animate={appearAnimation.animate}
            transition={transition}
          >
            <motion.h1
              className={styles.title}
              initial={appearAnimation.initial}
              animate={appearAnimation.animate}
              transition={sloverTransition}
            >
              Where is your place located?
            </motion.h1>

            <GoogleMapComponent
              register={register}
              cordinates={selectedCordinates!}
              setCordinates={handleCordinatesChange}
            />
            <motion.p className={styles.description}>
              Please ensure the pin is accurately placed on your address. If
              not, you can always drag it to the correct location.
            </motion.p>
          </motion.div>
        )}

        {formStep === CreateListingSteps.BASICS && (
          <motion.div
            className={styles.basics}
            initial={appearAnimation.initial}
            animate={appearAnimation.animate}
            transition={transition}
          >
            <motion.h1
              className={styles.title}
              initial={appearAnimation.initial}
              animate={appearAnimation.animate}
              transition={sloverTransition}
            >
              Share with us some basics about your place.
            </motion.h1>
            <motion.div
              className={styles.basic_selections}
              initial={deepAppearAnimation.initial}
              animate={deepAppearAnimation.animate}
              transition={sloverTransition}
            >
              <span className={styles.basic_selections_title}>
                How many guests will have their own private space?
              </span>
              <Counter state={guests!} callback={setGuests} />
            </motion.div>
            <motion.div
              className={styles.basic_selections}
              initial={deepAppearAnimation.initial}
              animate={deepAppearAnimation.animate}
              transition={sloverTransition}
            >
              <span className={styles.basic_selections_title}>
                Is your place pet-friendly?
              </span>
              <Switch
                isSelected={additionalDetails?.pets}
                aria-label={`pets-friedly-switch`}
                onValueChange={() =>
                  handleAdditionalDetailsChange(
                    "pets" as keyof FormState["additionalDetails"]
                  )
                }
              />
            </motion.div>
            <motion.div
              className={styles.basic_selections}
              initial={deepAppearAnimation.initial}
              animate={deepAppearAnimation.animate}
              transition={sloverTransition}
            >
              <span className={styles.basic_selections_title}>
                Is your place wheelchair accessible?
              </span>
              <Switch
                isSelected={additionalDetails?.accesable}
                aria-label={`pets-friedly-switch`}
                onValueChange={() =>
                  handleAdditionalDetailsChange(
                    "accesable" as keyof FormState["additionalDetails"]
                  )
                }
              />
            </motion.div>
          </motion.div>
        )}
        {formStep === CreateListingSteps.INTRODUCING_2 && (
          <motion.div className={styles.introducing}>
            <motion.div
              className={styles.introducing_text}
              initial={appearAnimation.initial}
              animate={appearAnimation.animate}
              transition={transition}
            >
              <motion.h1
                className={styles.title}
                initial={deepAppearAnimation.initial}
                animate={deepAppearAnimation.animate}
                transition={sloverTransition}
              >
                Make your place stand out
              </motion.h1>
              <motion.p
                className={styles.description}
                initial={deepAppearAnimation.initial}
                animate={deepAppearAnimation.animate}
                transition={sloverTransition}
              >
                In this step, you’ll add some of the amenities your place
                offers, plus 5 or more photos. Then, you’ll create a title and
                description.
              </motion.p>
            </motion.div>
            <motion.video
              autoPlay
              muted
              playsInline
              className={styles.video}
              initial={deepAppearAnimation.initial}
              animate={deepAppearAnimation.animate}
              transition={sloverTransition}
            >
              <source src={videos.apartament_building2} type="video/mp4" />
            </motion.video>
          </motion.div>
        )}
      </form>
      <motion.div
        className={styles.navigation_bar}
        initial={appearAnimation.initial}
        animate={appearAnimation.animate}
        transition={transition}
      >
        <Modal
          isOpen={isOpen}
          placement="top-center"
          onOpenChange={onOpenChange}
          isDismissable={false}
          isKeyboardDismissDisabled={true}
          backdrop="blur"
          className="leave_modal"
        >
          <ModalContent className="modal_content">
            <motion.div className="text_content">
              <motion.p
                initial={deepAppearAnimation.initial}
                animate={deepAppearAnimation.animate}
                transition={transition}
                className="modal_description"
              >
                Heads up! Are you sure you want to go back? 🫣
              </motion.p>
            </motion.div>
            <motion.div className="text_content">
              <motion.p
                initial={deepAppearAnimation.initial}
                animate={deepAppearAnimation.animate}
                transition={transition}
                className="modal_question"
              >
                If you hit that back button once more, all your data will vanish
                into thin air.
              </motion.p>
            </motion.div>

            <motion.div className="buttons_container">
              <Button onClick={handleLeaveTheForm}>Leave</Button>
              <Button onClick={onOpenChange}>Stay</Button>
            </motion.div>
          </ModalContent>
        </Modal>
        <Progress
          size="sm"
          value={formStep! * 10}
          className={styles.progress_bar}
        />
        <div className={styles.navigation_buttons}>
          <motion.button
            className={styles.button_back}
            onClick={handlePreviousStep}
          >
            Back
          </motion.button>
          <Button
            className={styles.button_next}
            size="md"
            onClick={!isLastStep ? handleNextStep : submitCreatedListing}
            data-last={isLastStep}
            disabled={isDoesntSelected}
          >
            {!isLastStep ? "Next" : "Submit"}
          </Button>
        </div>
      </motion.div>
    </>
  );
};

"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { toast } from "sonner";
import { motion } from "framer-motion";
import { useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { DevTool } from "@hookform/devtools";
import { useSession } from "next-auth/react";

import {
  Button,
  Modal,
  ModalContent,
  Progress,
  Spinner,
  Switch,
  useDisclosure,
} from "@nextui-org/react";

import { RootState } from "@/store";
import camera from "@/assets/3d-camera.png";
import { videos } from "@/information/data";
import { Counter } from "@/components/counter";

import { CreateListingSteps } from "../enums";
import { FormState, GoogleMapProps } from "../type";
import { GoogleMap } from "../googleMap/googleMap";
import { uploadUserListingImages } from "@/sharing/firebaseImages/users/listings/uploadImg";

import { clearAllStorage, initialFormState } from "./utils";

import {
  transition,
  appearAnimation,
  sloverTransition,
  deepAppearAnimation,
} from "../consts";

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

import styles from "./createForm.module.scss";
import "./additionalStyles.scss";
export const CreateForm: React.FC = () => {
  const router = useRouter();
  const { data: session } = useSession();
  const { categories, typeOfPlace } = useSelector(
    (state: RootState) => state.listingsAdditionals
  );

  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const [isLoading, setIsLoading] = useState(false);

  const { register, watch, setValue, control } = useForm({
    defaultValues: initialFormState as FormState,
  });

  const handleUpdateFormAndLocalStorage = (
    name: keyof FormState,
    value: FormState[keyof FormState]
  ) => {
    setValue(name, value);
    localStorage.setItem(name, JSON.stringify(value));
  };

  // WATCH VALUES
  const formStep = watch("step");
  const selectedAdress = watch("address");
  const selectedTypeOfPlace = watch("typeOfPlace");
  const selectedCategory = watch("category");
  const selectedCordinates = watch("cordinates");
  const selectedAdditionalDetails = watch("additionalDetails");
  const selectedGuests = watch("guests");

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

  // IMAGES
  const handleImagesUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsLoading(true);
    try {
      await uploadUserListingImages({
        event: e,
        user: session?.user.name!,
        location: selectedAdress,
      });
      setIsLoading(false);
    } catch (error) {}
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
    const body = document.body;
    if (formStep !== CreateListingSteps.CATEGORY && window.innerWidth >= 375)
      body.classList.add("disable-scroll");

    localStorage?.setItem("startingDate", JSON.stringify(startingDate));

    return () => {
      body.classList.remove("disable-scroll");
    };
  }, [formStep, startingDate]);

  // useLayoutEffect(() => {
  //   if (typeof localStorage !== "undefined") {
  //     const step = localStorage.getItem("step");
  //     const type = localStorage.getItem("typeOfPlace");
  //     const category = localStorage.getItem("category");
  //     const address = localStorage.getItem("address");
  //     const cordinates = localStorage.getItem("cordinates");
  //     const guests = localStorage.getItem("guests");
  //     const additionalDetails = localStorage.getItem("additionalDetails");

  //     if (step) setValue("step", Number(step));

  //     if (category) setValue("category", JSON.parse(category));

  //     if (type) setValue("type", JSON.parse(type));

  //     if (address) setValue("address", JSON.parse(address));

  //     if (cordinates) setValue("cordinates", JSON.parse(cordinates));

  //     if (guests) setGuests(Number(guests));

  //     if (additionalDetails)
  //       setValue("additionalDetails", JSON.parse(additionalDetails));

  // localStorage.setItem("startingDate", JSON.stringify(startingDate));
  //   }
  // }, [setValue, startingDate]);

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
              preload="auto"
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
                      {
                        onChange: () => {
                          handleUpdateFormAndLocalStorage("category", category);
                        },
                      })}
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
                    {...(register("typeOfPlace"),
                    {
                      onChange: (e) => {
                        handleUpdateFormAndLocalStorage("typeOfPlace", type);
                      },
                    })}
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

            <GoogleMap
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
              <Counter
                counter={Number(selectedGuests) || 1}
                {...(register("guests"),
                {
                  setCounter: (value) => {
                    handleUpdateFormAndLocalStorage("guests", value);
                  },
                })}
              />
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
                aria-label={`pets-friedly-switch`}
                {...(register("additionalDetails"),
                {
                  onValueChange: (e) => {
                    handleUpdateFormAndLocalStorage("additionalDetails", {
                      pets: !selectedAdditionalDetails?.pets,
                      accesable: selectedAdditionalDetails?.accesable!,
                    });
                  },
                })}
                isSelected={selectedAdditionalDetails?.pets}
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
                aria-label={`pets-friedly-switch`}
                {...(register("additionalDetails"),
                {
                  onValueChange: (e) => {
                    handleUpdateFormAndLocalStorage("additionalDetails", {
                      pets: selectedAdditionalDetails?.pets!,
                      accesable: !selectedAdditionalDetails?.accesable,
                    });
                  },
                })}
                isSelected={selectedAdditionalDetails?.accesable}
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
                offers, plus 5 or more images. Then, you’ll create a title and
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
              preload="auto"
            >
              <source src={videos.apartament_building2} type="video/mp4" />
            </motion.video>
          </motion.div>
        )}
        {formStep === CreateListingSteps.IMAGES && (
          <motion.div
            className={styles.images_container}
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
              Please provide at least 5 creative images of your place.
            </motion.h1>
            <motion.div
              initial={deepAppearAnimation.initial}
              animate={deepAppearAnimation.animate}
              transition={sloverTransition}
              className={styles.images_files_container}
              data-isLoading={isLoading}
            >
              <label
                htmlFor="images"
                className={`${styles.uploading_images_button}`}
              >
                <input
                  type="file"
                  {...register("images")}
                  multiple
                  className={styles.hidden_input}
                  onChange={(e) => handleImagesUpload(e)}
                />
                {isLoading ? (
                  <Spinner
                    color="default"
                    size="lg"
                    style={{ pointerEvents: "none" }}
                  />
                ) : (
                  <Image
                    src={camera}
                    alt="3d_camera"
                    width={100}
                    height={100}
                    className={styles.camera_icon}
                  />
                )}
              </label>
            </motion.div>
            <motion.p className={styles.description}>
              Please ensure that all provided photo has good lighting and are of
              good quality.
            </motion.p>
          </motion.div>
        )}

        {/* <DevTool control={control} /> */}
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
          value={formStep! * 12}
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

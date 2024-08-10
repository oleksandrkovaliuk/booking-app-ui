"use client";
import React, { useEffect, useRef, useState } from "react";
import {
  Button,
  Modal,
  ModalContent,
  Progress,
  useDisclosure,
} from "@nextui-org/react";
import { toast } from "sonner";
import { motion } from "framer-motion";
import { useForm, UseFormSetValue } from "react-hook-form";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";

import { RootState } from "@/store";

import { CreateListingSteps } from "../enums";
import { FormState, GoogleMapProps } from "../type";
import { Category, TypeOfPlace } from "@/store/reducers/listingsReducer";
import { clearAllStorage } from "./utils";

import {
  motion_transition,
  appearAnimation,
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
import { Content } from "./content";
import { useSession } from "next-auth/react";
import { deleteUserListingImages } from "../../../../sharing/firebaseImages/users/listings/uploadImg";
export const CreateForm: React.FC = () => {
  const setValueRef = useRef<UseFormSetValue<FormState> | null>(null);

  const router = useRouter();
  const { data: session } = useSession();
  const { categories, typeOfPlace } = useSelector(
    (state: RootState) => state.listingsAdditionals
  );

  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const { register, watch, setValue, handleSubmit } = useForm({
    defaultValues: {
      step: CreateListingSteps.INTRODUCING as CreateListingSteps,
      category: null as Category | null,
      typeOfPlace: null as TypeOfPlace | null,
      cordinates: { lat: 50, lng: 14 } as GoogleMapProps["cordinates"],
      address: {
        formattedAddress: "",
        shorterAddress: "",
      },
      amoutOfPeople: 1,
      guests: 1,
      additionalDetails: {
        pets: false,
        accesable: false,
      },
      startingDate: "",
      images: [],
      title: "",
      aboutplace: "",
      placeis: "",
      notes: "",
      price: "0",
    } as FormState,
  });

  // UPDATE FORM AND LOCAL STORAGE
  const handleUpdateFormAndLocalStorage = (
    name: keyof FormState,
    value: FormState[keyof FormState]
  ) => {
    setValue(name, value);
    localStorage.setItem(name, JSON.stringify(value));
  };

  // WATCH VALUES
  const formStep = watch("step");
  const selectedAddress = watch("address");
  const selectedTypeOfPlace = watch("typeOfPlace");
  const selectedCategory = watch("category");
  const selectedCordinates = watch("cordinates");
  const selectedAdditionalDetails = watch("additionalDetails");
  const selectedGuests = watch("guests");
  const selectedImages = watch("images");
  const selectedTitle = watch("title");
  const selectedAboutPlace = watch("aboutplace");
  const selectedPlaceIs = watch("placeis");
  const selectedNotes = watch("notes");
  const selectedPrice = watch("price");

  // CONDITIONS
  const enumsKeys = Object.keys(CreateListingSteps)
    .map((item) => Number(item))
    .filter((item) => !isNaN(Number(item)));

  const isLastStep = formStep === Number(enumsKeys[enumsKeys.length - 1]);

  const isAdditionalFieldsEmpty =
    selectedTitle.trim() === "" ||
    selectedTitle.length <= 10 ||
    selectedAboutPlace.trim() === "" ||
    selectedAboutPlace.length <= 10 ||
    selectedPlaceIs.trim() === "" ||
    selectedPlaceIs.length <= 10 ||
    selectedNotes.trim() === "" ||
    selectedNotes.length <= 10;

  const isDoesntSelected =
    (formStep === CreateListingSteps.CATEGORY && selectedCategory === null) ||
    (formStep === CreateListingSteps.TYPE_OF_PLACE &&
      selectedTypeOfPlace === null) ||
    (formStep === CreateListingSteps.LOCATION &&
      selectedAddress.formattedAddress === "") ||
    selectedAddress.shorterAddress === "" ||
    selectedCordinates === null ||
    (formStep === CreateListingSteps.IMAGES && selectedImages!.length < 5) ||
    (formStep === CreateListingSteps.ADDITIONAL_DETAILS &&
      isAdditionalFieldsEmpty) ||
    (formStep === CreateListingSteps.PRICE &&
      selectedPrice.split("").length <= 0);

  const allowScroll =
    formStep === CreateListingSteps.CATEGORY ||
    formStep === CreateListingSteps.IMAGES ||
    formStep === CreateListingSteps.ADDITIONAL_DETAILS;

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

  const handleClearForm = async () => {
    clearAllStorage();
    await deleteUserListingImages({
      user: session?.user.name!,
      location: selectedAddress.formattedAddress!,
    });
  };

  // LEAVE THE FORM
  const handleLeaveTheForm = () => {
    handleClearForm();
    onOpenChange();
    router.push("/");
  };

  // CORDINATES
  const handleCordinatesChange = (cordinates: GoogleMapProps["cordinates"]) => {
    const shorterAddress =
      cordinates.address?.address_components
        ?.filter((parts_of_adress) =>
          [
            "route",
            "neighborhood",
            "administrative_area_level_1",
            "country",
          ].includes(parts_of_adress.types[0])
        )
        .map(({ short_name }) => short_name)
        .join(", ") || "";

    handleUpdateFormAndLocalStorage("address", {
      formattedAddress: cordinates.address?.formatted_address || "",
      shorterAddress,
    });
    handleUpdateFormAndLocalStorage("cordinates", {
      lat: cordinates.lat,
      lng: cordinates.lng,
    });
  };

  // SUBMIT
  const submitCreatedListing = async () => {
    handleClearForm();

    toast(
      <div className="toast success">
        🎉 Your listing has been created successfully.
      </div>
    );
    router.back();
  };

  useEffect(() => {
    setValueRef.current = setValue;
  }, [setValue]);

  useEffect(() => {
    const body = document.body;
    if (!allowScroll && window.innerWidth >= 375) {
      window.scrollTo(0, 0);
      body.classList.add("disable-scroll");
    }

    return () => {
      body.classList.remove("disable-scroll");
    };
  }, [allowScroll, formStep]);

  useEffect(() => {
    if (typeof localStorage !== "undefined") {
      const step = localStorage.getItem("step");
      const type = localStorage.getItem("typeOfPlace");
      const category = localStorage.getItem("category");
      const address = localStorage.getItem("address");
      const cordinates = localStorage.getItem("cordinates");
      const guests = localStorage.getItem("guests");
      const additionalDetails = localStorage.getItem("additionalDetails");
      const images = localStorage.getItem("images");
      const title = localStorage.getItem("title");
      const aboutplace = localStorage.getItem("aboutplace");
      const placeis = localStorage.getItem("placeis");
      const notes = localStorage.getItem("notes");
      const price = localStorage.getItem("price");

      if (step) setValueRef?.current!("step", Number(step));

      if (category) setValueRef?.current!("category", JSON.parse(category));

      if (type) setValueRef?.current!("typeOfPlace", JSON.parse(type));

      if (address) setValueRef?.current!("address", JSON.parse(address));

      if (cordinates)
        setValueRef?.current!("cordinates", JSON.parse(cordinates));

      if (guests) setValueRef?.current!("guests", Number(guests));

      if (additionalDetails)
        setValueRef?.current!(
          "additionalDetails",
          JSON.parse(additionalDetails)
        );

      if (images) setValueRef?.current!("images", JSON.parse(images));

      if (title) setValueRef?.current!("title", JSON.parse(title));

      if (placeis) setValueRef?.current!("placeis", JSON.parse(placeis));

      if (aboutplace)
        setValueRef?.current!("aboutplace", JSON.parse(aboutplace));

      if (notes) setValueRef?.current!("notes", JSON.parse(notes));

      if (price) setValueRef?.current!("price", JSON.parse(price));

      localStorage.setItem(
        "startingDate",
        JSON.stringify(formatDate(new Date()))
      );
    }
  }, [formStep]);

  return (
    <>
      <form className={styles.create_form}>
        <Content
          register={register}
          images={selectedImages!}
          selectedPrice={selectedPrice!}
          selectedGuests={selectedGuests!}
          selectedAdress={selectedAddress.formattedAddress}
          key={formStep as CreateListingSteps}
          selectedCategory={selectedCategory!}
          type={formStep as CreateListingSteps}
          categories={categories as Category[]}
          selectedCordinates={selectedCordinates!}
          selectedTypeOfPlace={selectedTypeOfPlace!}
          typeOfPlace={typeOfPlace as TypeOfPlace[]}
          handleCordinatesChange={handleCordinatesChange}
          selectedAdditionalDetails={selectedAdditionalDetails!}
          handleUpdateFormAndLocalStorage={handleUpdateFormAndLocalStorage}
        />
      </form>
      <motion.div
        className={styles.navigation_bar}
        initial={appearAnimation.initial}
        animate={appearAnimation.animate}
        transition={motion_transition}
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
                transition={motion_transition}
                className="modal_description"
              >
                Heads up! Are you sure you want to go back? 🫣
              </motion.p>
            </motion.div>
            <motion.div className="text_content">
              <motion.p
                initial={deepAppearAnimation.initial}
                animate={deepAppearAnimation.animate}
                transition={motion_transition}
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
            {!isLastStep ? "Next" : "Publish"}
          </Button>
        </div>
      </motion.div>
    </>
  );
};

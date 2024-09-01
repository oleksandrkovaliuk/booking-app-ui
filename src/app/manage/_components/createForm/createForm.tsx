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
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { useForm, UseFormSetValue } from "react-hook-form";

import { useSelector } from "@/store";

import { Content } from "./content";
import { clearAllStorage } from "./utils";
import { CreateListingSteps } from "../enums";
import { FormState } from "../type";

import { GoogleMapProps } from "@/components/googleMap/type";
import { deleteUserListingImages } from "../../../../sharing/firebaseImages/users/listings/uploadImg";
import { requirmentForAddressComponent } from "@/sharing/address/formattedAddressVariants";

import {
  motion_transition,
  appearAnimation,
  deepAppearAnimation,
} from "../consts";

import { RequestCreateListing } from "@/store/thunks/listings/create";
import { Category, TypeOfPlace } from "@/store/slices/listingsInfoSlice/type";
import { handleUpdateFormAndLocalStorage } from "@/sharing/updateFormAndStorageStates";

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
  const setValueRef = useRef<UseFormSetValue<FormState> | null>(null);

  const dispath = useDispatch();
  const router = useRouter();
  const { data: session } = useSession();
  const { categories, typeOfPlace } = useSelector(
    (state) => state.listingsInfo
  );

  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const { register, watch, setValue } = useForm({
    defaultValues: {
      step: CreateListingSteps.INTRODUCING as CreateListingSteps,
      category: null as Category | null,
      type: null as TypeOfPlace | null,
      cordinates: { lat: 50, lng: 14 } as GoogleMapProps["cordinates"],
      address: {
        formattedAddress: "",
        shorterAddress: "",
        detailedAddressComponent: [],
      },
      guests: 1,
      accesable: false,
      pets_allowed: false,
      startingDate: "",
      images: [],
      title: "",
      aboutplace: "",
      placeis: "",
      notes: "",
      price: "14",
    } as FormState,
  });

  // WATCH VALUES
  const formStep = watch("step");
  const selectedAddress = watch("address");
  const selectedTypeOfPlace = watch("type");
  const selectedCategory = watch("category");
  const selectedCordinates = watch("cordinates");
  const selectedAccesable = watch("accesable");
  const selectedPetsAllowed = watch("pets_allowed");
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
    selectedTitle.length >= 33 ||
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
      selectedAddress.shorterAddress === "") ||
    (selectedAddress.formattedAddress === "" && selectedCordinates === null) ||
    (formStep === CreateListingSteps.IMAGES && selectedImages?.length < 5) ||
    (formStep === CreateListingSteps.ADDITIONAL_DETAILS &&
      isAdditionalFieldsEmpty) ||
    (formStep === CreateListingSteps.PRICE &&
      Number(selectedPrice.split(",")) < 14);

  const allowScroll =
    formStep === CreateListingSteps.CATEGORY ||
    formStep === CreateListingSteps.IMAGES ||
    formStep === CreateListingSteps.ADDITIONAL_DETAILS ||
    formStep === CreateListingSteps.READY;

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
      user_email: session?.user.email!,
      location: selectedAddress.formattedAddress!,
    });
  };

  // LEAVE THE FORM
  const handleLeaveTheForm = () => {
    handleClearForm();
    onOpenChange();
    router.back();
  };

  // CORDINATES
  const handleCordinatesChange = (cordinates: GoogleMapProps["cordinates"]) => {
    const detailedAddressComponent =
      cordinates.address?.address_components?.reduce<
        google.maps.places.PlaceResult["address_components"]
      >((acc, current) => {
        if (acc && requirmentForAddressComponent.includes(current.types[0])) {
          acc.push(current);
        }
        return acc;
      }, []);

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

    handleUpdateFormAndLocalStorage(
      "address",
      {
        formattedAddress: cordinates.address?.formatted_address || "",
        detailedAddressComponent: detailedAddressComponent,
        shorterAddress,
      },
      setValue
    );
    handleUpdateFormAndLocalStorage(
      "cordinates",
      {
        lat: cordinates.lat,
        lng: cordinates.lng,
      },
      setValue
    );
  };

  // SUBMIT
  const submitCreatedListing = async () => {
    try {
      await dispath(
        RequestCreateListing({
          host_email: session?.user.email!,
          host_name: session?.user.name || "",
          category: selectedCategory,
          type: selectedTypeOfPlace,
          cordinates: selectedCordinates,
          address: selectedAddress,
          guests: selectedGuests,
          accesable: selectedAccesable,
          pets_allowed: selectedPetsAllowed,
          images: selectedImages,
          title: selectedTitle,
          aboutplace: selectedAboutPlace,
          placeis: selectedPlaceIs,
          notes: selectedNotes,
          price: selectedPrice,
        }) as any
      );

      toast(
        <div className="toast success">
          🎉 Your listing has been created successfully.
        </div>
      );
      clearAllStorage();
      router.push("/manage/listings");
    } catch (error) {
      toast.error((error as Error).message);
    }
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
      const type = localStorage.getItem("type");
      const category = localStorage.getItem("category");
      const address = localStorage.getItem("address");
      const cordinates = localStorage.getItem("cordinates");
      const guests = localStorage.getItem("guests");
      const accesable = localStorage.getItem("accesable");
      const pets_allowed = localStorage.getItem("pets_allowed");
      const images = localStorage.getItem("images");
      const title = localStorage.getItem("title");
      const aboutplace = localStorage.getItem("aboutplace");
      const placeis = localStorage.getItem("placeis");
      const notes = localStorage.getItem("notes");
      const price = localStorage.getItem("price");

      if (step) setValueRef?.current!("step", Number(step));

      if (category) setValueRef?.current!("category", JSON.parse(category));

      if (type) setValueRef?.current!("type", JSON.parse(type));

      if (address) setValueRef?.current!("address", JSON.parse(address));

      if (cordinates)
        setValueRef?.current!("cordinates", JSON.parse(cordinates));

      if (guests) setValueRef?.current!("guests", Number(guests));

      if (accesable) setValueRef?.current!("accesable", JSON.parse(accesable));

      if (pets_allowed)
        setValueRef?.current!("pets_allowed", JSON.parse(pets_allowed));

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
          setValue={setValue}
          images={selectedImages!}
          selectedPrice={selectedPrice!}
          selectedGuests={selectedGuests!}
          selectedAdress={selectedAddress}
          key={formStep as CreateListingSteps}
          selectedCategory={selectedCategory!}
          type={formStep as CreateListingSteps}
          categories={categories as Category[]}
          selectedCordinates={selectedCordinates!}
          selectedTypeOfPlace={selectedTypeOfPlace!}
          typeOfPlace={typeOfPlace as TypeOfPlace[]}
          handleCordinatesChange={handleCordinatesChange}
          selectedAccesable={selectedAccesable!}
          selectedPetsAllowed={selectedPetsAllowed!}
          selectedTitle={selectedTitle}
          selectedPlaceIs={selectedPlaceIs}
          selectedAboutPlace={selectedAboutPlace}
          selectedNotes={selectedNotes}
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

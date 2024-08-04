"use client";
import React, { useEffect, useState } from "react";
import {
  Button,
  Modal,
  ModalContent,
  Progress,
  useDisclosure,
} from "@nextui-org/react";
import { toast } from "sonner";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
// import { DevTool } from "@hookform/devtools";

import { RootState } from "@/store";

import { CreateListingSteps } from "../enums";
import { FormState, GoogleMapProps } from "../type";
import { uploadUserListingImages } from "@/sharing/firebaseImages/users/listings/uploadImg";
import { Category, TypeOfPlace } from "@/store/reducers/listingsReducer";
import { clearAllStorage } from "./utils";

import { transition, appearAnimation, deepAppearAnimation } from "../consts";

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
export const CreateForm: React.FC = () => {
  const router = useRouter();
  const { data: session } = useSession();
  const { categories, typeOfPlace } = useSelector(
    (state: RootState) => state.listingsAdditionals
  );

  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const [isLoading, setIsLoading] = useState(false);

  const { register, watch, setValue, handleSubmit } = useForm({
    defaultValues: {
      step: CreateListingSteps.INTRODUCING as CreateListingSteps,
      category: null as Category | null,
      typeOfPlace: null as TypeOfPlace | null,
      cordinates: { lat: 50, lng: 14 } as GoogleMapProps["cordinates"],
      address: "",
      amoutOfPeople: 1,
      guests: 1,
      additionalDetails: {
        pets: false,
        accesable: false,
      },
      startingDate: "",
      images: [],
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

  // LEAVE THE FORM
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
  const submitCreatedListing = async () => {
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

    return () => {
      body.classList.remove("disable-scroll");
    };
  }, [formStep]);

  useEffect(() => {
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

      if (type) setValue("typeOfPlace", JSON.parse(type));

      if (address) setValue("address", JSON.parse(address));

      if (cordinates) setValue("cordinates", JSON.parse(cordinates));

      if (guests) setValue("guests", Number(guests));

      if (additionalDetails)
        setValue("additionalDetails", JSON.parse(additionalDetails));

      localStorage.setItem("startingDate", JSON.stringify(startingDate));
    }
  }, [setValue, startingDate]);
  return (
    <>
      <form className={styles.create_form}>
        <Content
          register={register}
          isLoading={isLoading}
          selectedGuests={selectedGuests!}
          key={formStep as CreateListingSteps}
          selectedCategory={selectedCategory!}
          type={formStep as CreateListingSteps}
          categories={categories as Category[]}
          handleImagesUpload={handleImagesUpload}
          selectedCordinates={selectedCordinates!}
          selectedTypeOfPlace={selectedTypeOfPlace!}
          typeOfPlace={typeOfPlace as TypeOfPlace[]}
          handleCordinatesChange={handleCordinatesChange}
          selectedAdditionalDetails={selectedAdditionalDetails!}
          handleUpdateFormAndLocalStorage={handleUpdateFormAndLocalStorage}
        />
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

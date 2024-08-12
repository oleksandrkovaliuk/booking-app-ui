import { FC, useEffect, useLayoutEffect, useState } from "react";

import { CreateListingSteps } from "../../enums";
import { Category } from "./_components/category";
import { Introducing } from "./_components/indtroducing";
import { ContentProps } from "./type";
import { TypeOfPlace } from "./_components/typeOfPlace";
import { Location } from "./_components/location";
import { Basics } from "./_components/basics";
import { Introducing_2 } from "./_components/introducing_2";
import { Images } from "./_components/images/images";
import { AdditionalDetails } from "./_components/additionalDetails";
import { Introducing_3 } from "./_components/introducing_3";
import { Price } from "./_components/price";
import { Ready } from "./_components/ready";

import styles from "@/app/manage/_components/createForm/createForm.module.scss";
import "@/app/manage/_components/createForm/additionalStyles.scss";

const ComponentSelection: Record<CreateListingSteps, FC<ContentProps>> = {
  [CreateListingSteps.INTRODUCING]: Introducing,
  [CreateListingSteps.CATEGORY]: Category,
  [CreateListingSteps.TYPE_OF_PLACE]: TypeOfPlace,
  [CreateListingSteps.LOCATION]: Location,
  [CreateListingSteps.BASICS]: Basics,
  [CreateListingSteps.INTRODUCING_2]: Introducing_2,
  [CreateListingSteps.IMAGES]: Images,
  [CreateListingSteps.ADDITIONAL_DETAILS]: AdditionalDetails,
  [CreateListingSteps.INTRODUCING_3]: Introducing_3,
  [CreateListingSteps.PRICE]: Price,
  [CreateListingSteps.READY]: Ready,
};

export const Content: FC<ContentProps> = ({
  type,
  images,
  register,
  categories,
  typeOfPlace,
  selectedNotes,
  selectedPrice,
  selectedTitle,
  selectedGuests,
  selectedAdress,
  selectedPlaceIs,
  selectedCategory,
  selectedAboutPlace,
  selectedCordinates,
  selectedTypeOfPlace,
  handleCordinatesChange,
  selectedAdditionalDetails,
  handleUpdateFormAndLocalStorage,
}) => {
  const Component = ComponentSelection[type as CreateListingSteps];

  return (
    <Component
      key={type}
      type={type}
      images={images}
      styles={styles}
      register={register}
      categories={categories}
      typeOfPlace={typeOfPlace}
      selectedTitle={selectedTitle}
      selectedNotes={selectedNotes}
      selectedPrice={selectedPrice}
      selectedAdress={selectedAdress}
      selectedGuests={selectedGuests}
      selectedPlaceIs={selectedPlaceIs}
      selectedCategory={selectedCategory}
      selectedAboutPlace={selectedAboutPlace}
      selectedCordinates={selectedCordinates}
      selectedTypeOfPlace={selectedTypeOfPlace}
      handleCordinatesChange={handleCordinatesChange}
      selectedAdditionalDetails={selectedAdditionalDetails}
      handleUpdateFormAndLocalStorage={handleUpdateFormAndLocalStorage}
    />
  );
};

import { FC, ReactElement } from "react";
import { CreateListingSteps } from "../../enums";
import { Category } from "./_components/category";
import { Introducing } from "./_components/indtroducing";
import { ContentProps } from "./type";
import { TypeOfPlace } from "./_components/typeOfPlace";
import { Location } from "./_components/location";
import { Basics } from "./_components/basics";
import { Introducing_2 } from "./_components/introducing_2";
import { Images } from "./_components/images";

import styles from "@/app/manage/_components/createForm/createForm.module.scss";

const ComponentSelection: Record<CreateListingSteps, FC<ContentProps>> = {
  [CreateListingSteps.INTRODUCING]: Introducing,
  [CreateListingSteps.CATEGORY]: Category,
  [CreateListingSteps.TYPE_OF_PLACE]: TypeOfPlace,
  [CreateListingSteps.LOCATION]: Location,
  [CreateListingSteps.BASICS]: Basics,
  [CreateListingSteps.INTRODUCING_2]: Introducing_2,
  [CreateListingSteps.IMAGES]: Images,
};

export const Content: FC<ContentProps> = ({
  type,
  register,
  isLoading,
  categories,
  typeOfPlace,
  selectedGuests,
  selectedCategory,
  handleImagesUpload,
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
      styles={styles}
      register={register}
      isLoading={isLoading}
      categories={categories}
      typeOfPlace={typeOfPlace}
      selectedGuests={selectedGuests}
      selectedCategory={selectedCategory}
      selectedCordinates={selectedCordinates}
      handleImagesUpload={handleImagesUpload}
      selectedTypeOfPlace={selectedTypeOfPlace}
      handleCordinatesChange={handleCordinatesChange}
      selectedAdditionalDetails={selectedAdditionalDetails}
      handleUpdateFormAndLocalStorage={handleUpdateFormAndLocalStorage}
    />
  );
};

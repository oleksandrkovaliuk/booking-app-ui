import React, { useEffect, useLayoutEffect, useState } from "react";
import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Spinner,
  Tooltip,
  useDisclosure,
} from "@nextui-org/react";
import Image from "next/image";
import { toast } from "sonner";
import { motion, Reorder } from "framer-motion";
import { useSession } from "next-auth/react";

import { ImagesCard } from "./card";
import { AddIcon } from "@/svgs/Addicon";
import camera from "@/assets/3d-camera.png";
import {
  appearAnimation,
  deepAppearAnimation,
  imageTypes,
  sloverTransition,
  motion_transition,
} from "@/app/manage/_components/consts";
import {
  ContentProps,
  ImagesStoreType,
} from "@/app/manage/_components/createForm/content/type";
import {
  deleteIndividualListingImage,
  deleteUserListingImages,
  uploadUserListingImages,
} from "@/sharing/firebaseImages/users/listings/uploadImg";

export const Images: React.FC<ContentProps> = ({
  styles,
  images,
  register,
  selectedAdress,
  handleUpdateFormAndLocalStorage,
}) => {
  const { data: session } = useSession();

  const [isLoading, setIsLoading] = useState<{ [key: string]: boolean }>({
    deletingImages: false,
  });

  const [isDragged, setIsDragged] = useState(false);

  const [uploadedImages, setUploadedImages] = useState<ImagesStoreType>({
    images: images,
    isImagesReady: images?.length >= 1 ? true : false,
  });

  const { isOpen, onOpen, onClose } = useDisclosure();

  const handelModalOpening = (e: React.FormEvent) => {
    e.preventDefault();
    onOpen();
  };
  const handleSetHeadImage = (image: string, i: number) => {
    let copyOfImages = [...uploadedImages.images];
    let prevHeadImage = copyOfImages[0];
    if (i) {
      copyOfImages[0] = image;
      copyOfImages[i] = prevHeadImage;
    }
    setUploadedImages({
      ...uploadedImages,
      images: copyOfImages,
    });
    handleUpdateFormAndLocalStorage("images", copyOfImages);
  };

  const handleSetHeadImageDown = (image: string, i: number) => {
    let copyOfImages = [...uploadedImages.images];
    let underHeadImage = copyOfImages[i + 1];
    if (!underHeadImage)
      toast.info(
        <div className="toast">
          🫣 Oops! You’ve reached the end of your list.
        </div>
      );
    else {
      copyOfImages[i + 1] = image;
      copyOfImages[i] = underHeadImage;
      setUploadedImages({
        ...uploadedImages,
        images: copyOfImages,
      });
      handleUpdateFormAndLocalStorage("images", copyOfImages);
    }
  };

  const handleImagesUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    try {
      onOpen();
      const res = await uploadUserListingImages({
        event: e,
        user: session?.user.email!,
        location: selectedAdress.formattedAddress,
      });
      setUploadedImages({
        ...uploadedImages,
        images: res!,
      });
      handleUpdateFormAndLocalStorage("images", res);
    } catch (error) {
      toast.error("Something went wrong");
      onClose();
    }
  };

  const handleCancelUploading = async () => {
    try {
      setIsLoading({ ...isLoading, deletingImages: true });
      await deleteUserListingImages({
        user: session?.user.email!,
        location: selectedAdress.formattedAddress,
      });
      setUploadedImages({
        ...uploadedImages,
        images: [],
      });
      handleUpdateFormAndLocalStorage("images", []);
      onClose();
      setIsLoading({ ...isLoading, deletingImages: false });
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  const handleDeleteIndividualImage = async (image: string) => {
    try {
      const res = await deleteIndividualListingImage({
        user: session?.user.email!,
        location: selectedAdress.formattedAddress,
        image,
      });
      if (res?.length! <= 1) {
        onClose();
        setUploadedImages({
          images: [],
          isImagesReady: false,
        });
        handleUpdateFormAndLocalStorage("images", []);
      } else {
        setUploadedImages({
          ...uploadedImages,
          images: uploadedImages.images.filter((item) => item !== image),
        });
        handleUpdateFormAndLocalStorage(
          "images",
          uploadedImages.images.filter((item) => item !== image)
        );
      }
      toast.info(
        <div className="toast success">
          📂 The image has been successfully deleted.
        </div>
      );
    } catch (error) {
      toast.error("Something went wrong . Please try again");
    }
  };

  const handleSubmitUploadedImages = () => {
    if (uploadedImages.images.length > 0) {
      setUploadedImages({
        ...uploadedImages,
        isImagesReady: true,
      });
      onClose();
      if (uploadedImages.images.length < 5) {
        toast.info(
          <div className="toast">
            👏 Hey !! Please upload 5 more images to proceed to the next step.
          </div>
        );
      }
    } else {
      toast.error("Please upload at least one image");
    }
  };

  return (
    <>
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        isDismissable={false}
        isKeyboardDismissDisabled={true}
        size="xl"
        backdrop="opaque"
        className="images_modal"
      >
        <ModalContent>
          <Tooltip
            placement="top"
            content="Upload images"
            color="primary"
            size="sm"
            delay={1500}
            classNames={{
              content: ["text-white bg-[#2f2f2f]"],
            }}
          >
            <label className="images_modal_add_images">
              <input
                title=""
                type="file"
                multiple
                accept={imageTypes.join(",")}
                className={styles.hidden_input}
                onChange={(e) => handleImagesUpload(e)}
              />
              <AddIcon />
            </label>
          </Tooltip>
          <ModalHeader className="images_modal_header">
            <motion.h3
              className={`${styles.title} title`}
              {...deepAppearAnimation}
              transition={sloverTransition}
            >
              Uploaded images.
            </motion.h3>
            <motion.p
              className={`${styles.description} description`}
              {...deepAppearAnimation}
              transition={sloverTransition}
            >
              {uploadedImages.images.length > 0
                ? `${uploadedImages.images.length} items selected`
                : `No items selected`}
            </motion.p>
          </ModalHeader>
          <ModalBody className="images_modal_body">
            <motion.div
              className="images_modal_uploaded_container"
              transition={sloverTransition}
            >
              {!uploadedImages.images.length ? (
                <Spinner color="default" size="lg" />
              ) : (
                uploadedImages.images?.map((item, i) => (
                  <ImagesCard
                    i={i}
                    key={item + i}
                    item={item}
                    isProccessing={true}
                    onDelete={handleDeleteIndividualImage}
                  />
                ))
              )}
            </motion.div>
          </ModalBody>
          <ModalFooter className="images_modal_footer">
            <div className="images_modal_footer_buttons">
              <Button
                size="md"
                variant="light"
                onClick={
                  uploadedImages.isImagesReady ? onClose : handleCancelUploading
                }
              >
                {isLoading.deletingImages ? (
                  <Spinner color="default" size="sm" />
                ) : uploadedImages.images.length > 0 ? (
                  "Cancel"
                ) : (
                  "Done"
                )}
              </Button>

              <Button
                size="md"
                isDisabled={uploadedImages.images.length === 0}
                onClick={handleSubmitUploadedImages}
              >
                Upload
              </Button>
            </div>
          </ModalFooter>
        </ModalContent>
      </Modal>
      <motion.div
        className={styles.images_container}
        initial={appearAnimation.initial}
        animate={appearAnimation.animate}
        transition={motion_transition}
      >
        <motion.h1
          className={styles.title}
          initial={appearAnimation.initial}
          animate={appearAnimation.animate}
          transition={sloverTransition}
          data-isimagesready={uploadedImages.isImagesReady}
        >
          {!uploadedImages.isImagesReady
            ? "Please provide at least 5 creative images of your place."
            : "Hey, take a look at your images !"}
        </motion.h1>
        {uploadedImages.isImagesReady && (
          <motion.p
            className={styles.description}
            initial={appearAnimation.initial}
            animate={appearAnimation.animate}
            transition={sloverTransition}
            data-isimagesready={uploadedImages.isImagesReady}
          >
            They look fantastic! Just a couple more steps left. Please sort them
            and select your profile image for your listing.
          </motion.p>
        )}
        <motion.div
          initial={deepAppearAnimation.initial}
          animate={deepAppearAnimation.animate}
          transition={sloverTransition}
          className={styles.images_files_container}
          data-isloading={isLoading}
          data-isready={uploadedImages.isImagesReady}
        >
          <Reorder.Group
            values={uploadedImages.images}
            onReorder={(newOrder) =>
              setUploadedImages({ ...uploadedImages, images: newOrder })
            }
            className={styles.reorder_group}
            axis="y"
          >
            {uploadedImages.isImagesReady &&
              uploadedImages.images?.map((item, i) => (
                <Reorder.Item
                  key={item + i}
                  value={item}
                  className={styles.image_wrapper}
                  onDrag={() => setIsDragged(true)}
                  onDragEnd={() => setIsDragged(false)}
                >
                  <ImagesCard
                    i={i}
                    item={item}
                    isProccessing={false}
                    makeHeadImage={() => handleSetHeadImage(item, i)}
                    setHeadImageDown={() => handleSetHeadImageDown(item, i)}
                    onDelete={handleDeleteIndividualImage}
                    isDrag={isDragged}
                  />
                </Reorder.Item>
              ))}
            {uploadedImages.isImagesReady &&
            uploadedImages.images.length >= 1 ? (
              <button
                className={styles.uploading_images_button}
                onClick={handelModalOpening}
              >
                <AddIcon className={styles.add_icon} />
              </button>
            ) : (
              <label
                htmlFor="images"
                className={`${styles.uploading_images_button}`}
              >
                <input
                  title=""
                  type="file"
                  multiple
                  accept={imageTypes.join(",")}
                  className={styles.hidden_input}
                  {...(register("images"),
                  { onChange: (e) => handleImagesUpload(e) })}
                />

                <Image
                  src={camera}
                  alt="3d_camera"
                  width={100}
                  height={100}
                  className={styles.camera_icon}
                />
              </label>
            )}
          </Reorder.Group>
        </motion.div>

        <motion.p className={styles.description}>
          Please ensure that all provided photo has good lighting and are of
          good quality.
        </motion.p>
      </motion.div>
    </>
  );
};

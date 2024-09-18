import React, { useState } from "react";
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

import { store } from "@/store";
import { uploadListingImages } from "@/store/api/endpoints/listings/uploadListingImages";
import { requestDeleteUserListingImages } from "@/store/api/endpoints/listings/requestDeleteUserListingImages";
import { requestDeleteIndividualListingImage } from "@/store/api/endpoints/listings/requestDeleteIndividualListingImage";

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

import { ImagesCard } from "./card";
import { LoadingValue } from "./type";
import { AddIcon } from "@/svgs/Addicon";
import camera from "@/assets/3d-camera.png";

export const Images: React.FC<ContentProps> = ({
  styles,
  images,
  register,
  setValue,
  editPage,
  onConfirmation,
  selectedAdress,
  handleUpdateFormAndLocalStorage,
}) => {
  const { data: session } = useSession();

  const [isLoading, setIsLoading] = useState<LoadingValue>({
    deletingImages: {
      status: false,
      item: "",
    },
    uploadingImgs: false,
  });

  const [isDragged, setIsDragged] = useState(false);

  const [uploadedImages, setUploadedImages] = useState<ImagesStoreType>({
    images: images!,
    isImagesReady: images?.length! >= 1 ? true : false,
  });

  const { isOpen, onOpen, onClose } = useDisclosure();

  const handelModalOpening = (e: React.FormEvent) => {
    e.preventDefault();
    onOpen();
  };
  const handleSetHeadImage = (image: string, i: number) => {
    let copyOfImages = [...uploadedImages.images];
    let prevHeadImage = {
      ...copyOfImages[0],
      url: copyOfImages[0].url,
    };
    if (i) {
      copyOfImages[0] = {
        ...copyOfImages[0],
        url: image,
      };
      copyOfImages[i] = prevHeadImage;
    }
    setUploadedImages({
      ...uploadedImages,
      images: copyOfImages,
    });
    editPage && uploadedImages.images.length > 5 && onConfirmation!(true);
    handleUpdateFormAndLocalStorage(
      editPage ? "edit_images" : "images",
      copyOfImages,
      setValue
    );
  };

  const handleSetHeadImageDown = (image: string, i: number) => {
    let copyOfImages = [...uploadedImages.images];
    let underHeadImage = {
      ...copyOfImages[i + 1],
      url: copyOfImages[i + 1].url,
    };
    if (!underHeadImage) {
      toast.info(
        <div className="toast">
          🫣 Oops! You’ve reached the end of your list.
        </div>
      );
      return;
    } else {
      copyOfImages[i + 1] = {
        ...copyOfImages[i],
        url: image,
      };
      copyOfImages[i] = underHeadImage;
      setUploadedImages({
        ...uploadedImages,
        images: copyOfImages,
      });
      editPage && uploadedImages.images.length > 5 && onConfirmation!(true);
      handleUpdateFormAndLocalStorage(
        editPage ? "edit_images" : "images",
        copyOfImages,
        setValue
      );
    }
  };

  const handleImagesUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    try {
      onOpen();
      setIsLoading({ ...isLoading, uploadingImgs: true });

      // conver data info formdata
      const formData = new FormData();
      for (let i = 0; i < e.target.files!.length; i++) {
        formData.append("files", e.target.files![i]);
      }
      formData.append("user_email", session?.user.email!);
      formData.append("location", selectedAdress!.formattedAddress);

      const { data: res, error } = await store.dispatch(
        uploadListingImages.initiate(formData)
      );

      if (error && !res) {
        setIsLoading({ ...isLoading, uploadingImgs: false });
        throw new Error();
      }
      setIsLoading({ ...isLoading, uploadingImgs: false });

      setUploadedImages({
        ...uploadedImages,
        images: res!,
      });
      handleUpdateFormAndLocalStorage(
        editPage ? "edit_images" : "images",
        res,
        setValue
      );
      editPage && uploadedImages.images.length > 5 && onConfirmation!(true);
    } catch (error) {
      toast.error("Something went wrong");
      onClose();
    }
  };

  const handleCancelUploading = async () => {
    try {
      setIsLoading({
        ...isLoading,
        deletingImages: {
          status: true,
        },
      });
      const { error } = await store.dispatch(
        requestDeleteUserListingImages.initiate({
          user_email: session?.user?.email || "",
          location: selectedAdress!.formattedAddress,
        })
      );

      if (error) throw new Error();

      setUploadedImages({
        ...uploadedImages,
        images: [],
      });
      handleUpdateFormAndLocalStorage(
        editPage ? "edit_images" : "images",
        [],
        setValue
      );
      setIsLoading({
        ...isLoading,
        deletingImages: {
          status: false,
        },
      });
      onClose();
    } catch (error) {
      toast.error(
        "Something went wrong with canceling your operetion. Please try again.",
        {
          action: {
            label: "Close",
            onClick: () => {},
          },
        }
      );
    }
  };

  const handleDeleteIndividualImage = async (image: string) => {
    try {
      setIsLoading({
        ...isLoading,
        deletingImages: {
          status: true,
          item: image,
        },
      });

      const { data: res, error } = await store.dispatch(
        requestDeleteIndividualListingImage.initiate({
          user_email: session?.user.email!,
          location: selectedAdress!.formattedAddress,
          image,
        })
      );

      if (error || !res) throw new Error();

      setIsLoading({
        ...isLoading,
        deletingImages: {
          status: false,
          item: image,
        },
      });

      if (res?.length! < 1) {
        onClose();
        setUploadedImages({
          images: [],
          isImagesReady: false,
        });
        handleUpdateFormAndLocalStorage(
          editPage ? "edit_images" : "images",
          [],
          setValue
        );
      } else {
        setUploadedImages({
          ...uploadedImages,
          images: res!,
        });
        handleUpdateFormAndLocalStorage(
          editPage ? "edit_images" : "images",
          res,
          setValue
        );
      }
      editPage && uploadedImages.images.length > 5 && onConfirmation!(true);
      editPage && uploadedImages.images.length < 5 && onConfirmation!(false);
      toast.info(
        <div className="toast success">
          📂 The image has been successfully deleted.
        </div>
      );
    } catch (error) {
      toast.error(
        "Something went wrong with deleting this image. Please try again.",
        {
          action: {
            label: "Close",
            onClick: () => {},
          },
        }
      );
    }
  };

  const handleSubmitUploadedImages = () => {
    if (uploadedImages.images.length > 0) {
      setUploadedImages({
        ...uploadedImages,
        isImagesReady: true,
      });
      onClose();
      editPage && onConfirmation!(true);
      if (uploadedImages.images.length < 5) {
        toast.info(
          <div className="toast">
            👏 Hey !! Please upload 5 more images to proceed to the next step.
          </div>
        );
      }
    } else {
      toast.info("It is required to upload at least five images. Thanks", {
        action: {
          label: "Close",
          onClick: () => {},
        },
      });
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
            <label
              className="images_modal_add_images"
              data-isdisabled={isLoading.uploadingImgs}
            >
              <input
                title=""
                type="file"
                multiple
                accept={imageTypes.join(",")}
                className={`${styles.hidden_input} hidden_input`}
                disabled={isLoading.uploadingImgs}
                onChange={(e) => handleImagesUpload(e)}
              />
              {isLoading.uploadingImgs ? (
                <Spinner color="default" size="sm" />
              ) : (
                <AddIcon />
              )}
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
                    isImgsProcessing={isLoading.deletingImages}
                    key={item.url + i}
                    item={item.url}
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
                  uploadedImages.isImagesReady
                    ? () => {
                        onClose();
                        setIsLoading({ ...isLoading, uploadingImgs: false });
                      }
                    : handleCancelUploading
                }
              >
                {isLoading.deletingImages.status &&
                !isLoading.deletingImages.item ? (
                  <Spinner color="default" size="sm" />
                ) : uploadedImages.isImagesReady ? (
                  "Done"
                ) : (
                  "Cancel"
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
        {!editPage && (
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
        )}

        {uploadedImages.isImagesReady && !editPage && (
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
            onReorder={(newOrder) => {
              setUploadedImages({ ...uploadedImages, images: newOrder });
              handleUpdateFormAndLocalStorage(
                editPage ? "edit_images" : "images",
                newOrder,
                setValue
              );
              editPage && onConfirmation!(true);
            }}
            className={styles.reorder_group}
            axis="y"
          >
            {uploadedImages.isImagesReady &&
              uploadedImages.images?.map((item, i) => (
                <Reorder.Item
                  key={item.url + i}
                  value={item}
                  className={styles.image_wrapper}
                  onDrag={() => setIsDragged(true)}
                  onDragEnd={() => setIsDragged(false)}
                >
                  <ImagesCard
                    i={i}
                    item={item.url}
                    isImgsProcessing={isLoading.deletingImages}
                    isProccessing={false}
                    makeHeadImage={() => handleSetHeadImage(item.url, i)}
                    setHeadImageDown={() => handleSetHeadImageDown(item.url, i)}
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
                  className={`${styles.hidden_input} hidden_input`}
                  {...(register(editPage ? "edit_images" : "images"),
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

        <motion.p className={`${styles.description} description`}>
          Please ensure that all provided photo has good lighting and are of
          good quality.
        </motion.p>
      </motion.div>
    </>
  );
};

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { toast } from "sonner";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { Button, Modal, ModalBody, ModalContent } from "@nextui-org/react";

import { store } from "@/store";
import { requestDeleteUserListingImages } from "@/store/api/endpoints/listings/requestDeleteUserListingImages";
import { requestDeleteListing } from "@/store/api/endpoints/listings/requestDeleteListing";

import { EditIcon } from "@/svgs/EditIcon";
import { CalendarIcon } from "@/svgs/CalendarIcon";

import { ModalProps } from "../type";

export const ManageModal: React.FC<ModalProps> = ({
  id,
  isOpen,
  onClose,
  images,
  title,
  address,
  isComplete,
  isInProccess,
  onOpenChange,
  listingHasUnsavedChanges,
}) => {
  const { data: session } = useSession();
  const [isDeleteProcess, setIsDeleteProcess] = useState<boolean>(false);

  const handleSetProcessDelete = () => {
    setIsDeleteProcess(!isDeleteProcess);
  };
  const handleDeleteListing = async () => {
    try {
      await store.dispatch(requestDeleteListing.initiate({ id: id! })).unwrap();

      const { error } = await store.dispatch(
        requestDeleteUserListingImages.initiate({
          user_email: session?.user?.email || "",
          location: address?.formattedAddress!,
        })
      );
      if (error) throw new Error();

      toast.info("Listing deleted successfully");
      onClose();
    } catch (error) {
      toast.error(
        (error as Error).message || "Something went wrong, please try again.",
        {
          action: {
            label: "Close",
            onClick: () => {},
          },
        }
      );
    }
  };

  useEffect(() => {
    setIsDeleteProcess(false);
  }, [onOpenChange]);

  return (
    <Modal
      size="sm"
      hideCloseButton={!isComplete && !isInProccess}
      isOpen={isOpen}
      onClose={!isComplete && !isInProccess ? () => {} : onClose}
      backdrop="opaque"
      motionProps={{
        variants: {
          enter: {
            y: 0,
            opacity: 1,
            transition: {
              duration: 0.3,
              ease: "easeOut",
            },
          },
          exit: {
            y: 20,
            opacity: 0,
            transition: {
              duration: 0.2,
              ease: "easeIn",
            },
          },
        },
      }}
    >
      <ModalContent className="modal_manage_content">
        <ModalBody className="modal_manage_body">
          {isDeleteProcess && (
            <div className="modal_manage_message">
              <h4 className="modal_manage_message_title">Delete listing</h4>
              <p className="modal_manage_message_description">
                This is permanent and can’t be undone.
              </p>
            </div>
          )}
          {!isComplete && (
            <div className="modal_manage_message">
              <h4 className="modal_manage_message_title">
                Make your listing available for booking.
              </h4>
              <p className="modal_manage_message_description">
                By completing availability your listing will be available for
                booking.
              </p>
            </div>
          )}
          <div className="modal_manage_preview">
            <Image
              src={images[0].url}
              alt="preview"
              width={250}
              height={150}
              className="modal_manage_image"
            />
            <h3 className="modal_manage_title">{title}</h3>
            <p className="modal_manage_location">{address?.shorterAddress}</p>
          </div>
          <div className="modal_manage_button_container">
            {isDeleteProcess ? (
              <Button
                variant="light"
                className="modal_manage_button confirm_delete"
                onClick={handleDeleteListing}
              >
                Yes , delete
              </Button>
            ) : (
              <>
                {isComplete && (
                  <Link
                    href={`/manage/listings/edit/${
                      session?.user.name ? session?.user.name : "user"
                    }/${id}/overview`}
                    className="modal_manage_button main"
                  >
                    <Button
                      variant="light"
                      data-has-unsave-changes={
                        listingHasUnsavedChanges?.is_edit
                      }
                    >
                      <EditIcon />
                      Edit
                    </Button>
                  </Link>
                )}

                <Link
                  href={`/manage/listings/calendar/${id}`}
                  className={`modal_manage_button main ${
                    !isComplete && !isInProccess ? "is_only_availability" : ""
                  }`}
                >
                  <Button
                    variant="light"
                    data-has-unsave-changes={
                      listingHasUnsavedChanges?.is_availability
                    }
                  >
                    <CalendarIcon />
                    Avalability
                  </Button>
                </Link>
              </>
            )}
          </div>

          {isComplete && (
            <Button
              variant="light"
              className="modal_manage_button delete"
              onClick={handleSetProcessDelete}
            >
              {isDeleteProcess ? "Cancel" : "Delete"}
            </Button>
          )}
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { toast } from "sonner";
import Image from "next/image";
import { useDispatch } from "react-redux";
import { useSession } from "next-auth/react";
import { Button, Modal, ModalBody, ModalContent } from "@nextui-org/react";

import { ModalProps } from "../type";
import { RequestDeleteListing } from "@/store/thunks/listings/delete";
import { deleteUserListingImages } from "@/sharing/firebaseImages/users/listings/uploadImg";

export const ManageModal: React.FC<ModalProps> = ({
  id,
  isOpen,
  onClose,
  images,
  title,
  location,
  onOpenChange,
}) => {
  const dispatch = useDispatch();

  const { data: session } = useSession();
  const [isDeleteProcess, setIsDeleteProcess] = useState<boolean>(false);

  const handleSetProcessDelete = () => {
    setIsDeleteProcess(!isDeleteProcess);
  };
  const handleDeleteListing = async () => {
    try {
      dispatch(RequestDeleteListing(id!) as any);
      await deleteUserListingImages({
        user_email: session?.user?.email!,
        location: location?.formattedAddress!,
      });
      toast.info("Listing deleted successfully");
      onClose();
    } catch (error) {
      toast.error((error as Error).message);
    }
  };

  useEffect(() => {
    setIsDeleteProcess(false);
  }, [onOpenChange]);
  return (
    <Modal
      size="sm"
      isOpen={isOpen}
      onClose={onClose}
      backdrop="transparent"
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
      <ModalContent>
        <ModalBody className="modal_manage_body">
          {isDeleteProcess && (
            <div className="modal_manage_message">
              <h4 className="modal_manage_message_title">Are you sure?</h4>
              <p className="modal_manage_message_description">
                This is permanent and can’t be undone.
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
            <p className="modal_manage_location">{location?.shorterAddress}</p>
          </div>
          {isDeleteProcess ? (
            <Button
              variant="light"
              className="modal_manage_button main"
              onClick={handleDeleteListing}
            >
              Yes , delete
            </Button>
          ) : (
            <Link
              href={`/manage/listings/edit/${
                session?.user.name ? session?.user.name : "user"
              }/${id}/overview`}
            >
              <Button variant="light" className="modal_manage_button main">
                Edit listing
              </Button>
            </Link>
          )}

          <Button
            variant="light"
            className="modal_manage_button delete"
            onClick={handleSetProcessDelete}
          >
            {isDeleteProcess ? "Cancel" : "Delete"}
          </Button>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};
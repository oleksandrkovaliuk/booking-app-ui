import React from "react";
import Image from "next/image";
import { useSession } from "next-auth/react";

import { ModalProps } from "../type";
import { Modal, ModalBody, ModalContent, ModalHeader } from "@nextui-org/react";
import { formattedAddressComponent } from "@/helpers/address/formattedAddressVariants";

export const PreviewModal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  images,
  title,
  type,
  aboutplace,
  address,
  guests,
  pets_allowed,
  accesable,
}) => {
  const { data: session } = useSession();
  return (
    <Modal size="5xl" isOpen={isOpen} onClose={onClose} className="modal">
      <ModalContent>
        <ModalHeader className="modal_header">Full preview</ModalHeader>
        <ModalBody className="modal_body">
          <Image
            src={images ? images[0].url : ""}
            alt="preview"
            width={1000}
            height={600}
            className="modal_listing_image"
          />
          <ul className="modal_info">
            <li className="modal_info_item">
              <div className="modal_info_title">{title}</div>
            </li>
            <li className="modal_info_item host">
              <div className="modal_hosted_by">
                <div className="modal_info_title">
                  {type?.type_name} hosted by{" "}
                  <span>
                    {" "}
                    {session?.user.name
                      ? `, ${session?.user?.name?.split(" ")[0]}`
                      : session?.user.email}
                  </span>
                  !
                </div>
                <div className="modal_hosted_additional_info">
                  <p className="modal_info_description">{guests} guests</p>
                  {pets_allowed && (
                    <p className="modal_info_description">Pets allowed</p>
                  )}
                  {accesable && (
                    <p className="modal_info_description">Accessible</p>
                  )}
                </div>
              </div>
              {session?.user.image ? (
                <Image
                  src={session?.user.image!}
                  alt={session?.user.email!}
                  width={50}
                  height={50}
                  className="modal_hosted_by_image"
                />
              ) : (
                <div className="modal_hosted_by_image no_user_image">
                  {session?.user.email?.split("@")[0]!}
                </div>
              )}
            </li>
            <li className="modal_info_item description">
              <p className="modal_info_description">{aboutplace}</p>
            </li>
            <li className="modal_info_item location">
              <div className="modal_info_title">Location</div>
              <p className="modal_info_description">
                {formattedAddressComponent({
                  detailedAddressComponent: address?.detailedAddressComponent,
                  variant: "neighboorhoodStateCountry",
                })}
              </p>
              <p className="modal_info_description">
                We’ll only share your address with guests who are booked.
              </p>
            </li>
          </ul>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

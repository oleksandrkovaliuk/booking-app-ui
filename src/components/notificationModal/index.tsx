"use client";
import React, { useEffect, useMemo } from "react";
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  Tooltip,
  useDisclosure,
} from "@nextui-org/react";
import { toast } from "sonner";
import { useDispatch } from "react-redux";
import { useSession } from "next-auth/react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

import { store, useSelector } from "@/store";
import { updateNotifications } from "@/store/slices/notificationsSlice";
import { setFetch } from "@/store/slices/listings/isSearchTriggeredSlice";
import { NotificationSelector } from "@/store/selectors/notificationsState";
import { updateAllUserNotifications } from "@/store/api/endpoints/user/updateAllUserNotifications";

import { CheckedIcon } from "@/svgs/CheckedIcon";
import { UnCheckedIcon } from "@/svgs/UnCheckedIcon";

import { socket } from "@/helpers/sockets";
import { CreateNewQueryParams } from "@/helpers/paramsManagment";

import styles from "./notificationModal.module.scss";

export const NotificationModal: React.FC = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const pathname = usePathname();
  const params = useSearchParams();

  const { data: session } = useSession();

  const { onOpen, onClose } = useDisclosure();

  const { notificationIn, notifications } = useSelector(NotificationSelector);

  const isModalOpen = !!params.get("notificationsModal");

  const handleCloseModal = () => {
    const updatedParams = CreateNewQueryParams({
      updatedParams: {
        notificationsModal: null,
      },
      params,
    });
    router.replace(`${pathname}?${updatedParams}`, {
      scroll: false,
    });
    dispatch(setFetch(false));
  };

  const handleReadAllNotifications = async () => {
    try {
      const { error } = await store.dispatch(
        updateAllUserNotifications.initiate()
      );

      if (error) {
        throw new Error(
          "Something went wrong while updating all notifications.Please try again"
        );
      }
      toast.success("All notifications marked as read", {
        action: {
          label: "Close",
          onClick: () => {},
        },
      });
    } catch (error) {
      toast.error((error as Error).message, {
        action: {
          label: "Close",
          onClick: () => {},
        },
      });
    }
  };

  useEffect(() => {
    if (isModalOpen) {
      onOpen();
    } else {
      onClose();
    }

    return () => onClose();
  }, [isModalOpen, onClose, onOpen]);

  if (!isModalOpen) return <></>;

  return (
    <Modal
      size={"xl"}
      isOpen={isModalOpen}
      onClose={handleCloseModal}
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
      <ModalContent className={styles.notification_modal_content}>
        <ModalHeader className={styles.notification_modal_header}>
          <div className={styles.notification_modal_title}>Notifications</div>
          <Tooltip
            placement="top"
            content={
              notificationIn.GENERAL
                ? "Mark all as read"
                : "No unread notifications"
            }
            color="default"
            size="sm"
            delay={100}
            className="custome_tooltip small"
          >
            <button
              inert={notificationIn.GENERAL}
              className={styles.mark_as_readed}
              disabled={!notificationIn.GENERAL}
              onClick={handleReadAllNotifications}
              data-is-checked={!notificationIn.GENERAL}
            >
              {notificationIn.GENERAL ? (
                <UnCheckedIcon className={styles.check_icon} />
              ) : (
                <CheckedIcon className={styles.check_icon} />
              )}
            </button>
          </Tooltip>
        </ModalHeader>
        <ModalBody>
          {notifications?.map((notification) => (
            <div key={notification.id}>{notification.id}</div>
          ))}
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

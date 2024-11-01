"use client";
import React, { useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useDispatch } from "react-redux";
import { useSession } from "next-auth/react";
import { Skeleton, Tooltip } from "@nextui-org/react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

import { updateNotifications } from "@/store/slices/notificationsSlice";
import { useGetUsersChatsQuery } from "@/store/api/endpoints/chats/getUserChats";

import { CurrentChat } from "../components/currentChat";

import { ShareIcon } from "@/svgs/ShareIcon";
import { skeletonData } from "@/information/data";
import { NotFoundIcon } from "@/svgs/NotFoundIcon";

import { socket } from "@/helpers/sockets";
import { CreateNewQueryParams } from "@/helpers/paramsManagment";
import { formattedAddressComponent } from "@/helpers/address/formattedAddressVariants";

import { NotificationTypes } from "@/store/api/lib/enums";

import styles from "./inboxContent.module.scss";

export const InboxContent: React.FC = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const pathname = usePathname();
  const params = useSearchParams();

  const { data: session } = useSession();
  const { chatId } = Object.fromEntries(params.entries());

  const { data: chats, isLoading, isUninitialized } = useGetUsersChatsQuery();

  const handleSelectChat = async (chatId: number) => {
    if (!chatId) return;

    const updatedParams = CreateNewQueryParams({
      updatedParams: {
        chatId: JSON.stringify(chatId),
      },
      params,
    });

    router.replace(`${pathname}?${updatedParams}`, {
      scroll: false,
    });
  };

  useEffect(() => {
    socket.emit("notificationReaded", {
      viewer: session?.user?.email,
      type: NotificationTypes.INBOX_MESSAGE,
    });
    dispatch(updateNotifications(true));
    return () => {
      socket.off("notificationReaded");
    };
  }, [dispatch, session?.user?.email]);

  if (!chats?.length && !isLoading)
    return (
      <div className={styles.not_found_container}>
        <Tooltip
          placement="top"
          content={"No chats found..."}
          color="primary"
          size="sm"
          delay={200}
          className="custome_tooltip black"
        >
          <div className={styles.not_found_wrap}>
            <NotFoundIcon className={styles.not_found_icons} />
          </div>
        </Tooltip>
      </div>
    );

  return (
    <div className={styles.inbox_container}>
      <ul className={styles.chats_columns_container}>
        {isLoading || isUninitialized
          ? skeletonData.map((el, i) => (
              <div className={styles.chat_block} key={i}>
                <Skeleton
                  className={`${styles.reciever_img} ${styles.skeleton_img}`}
                />
                <div className={styles.chat_reciever_personal_info}>
                  <Skeleton
                    className={`${styles.reciever_name} ${styles.skeleton_name}`}
                  />
                  <Skeleton
                    className={`${styles.reciever_email} ${styles.skeleton_email}`}
                  />
                </div>
              </div>
            ))
          : chats?.map((chat) => {
              const formattedAddress = formattedAddressComponent({
                detailedAddressComponent: chat.listing_info.address,
                variant: "neighboorhoodStateCountry",
              });

              const isAddressToLong = formattedAddress!.split("")?.length > 20;
              return (
                <li
                  key={chat.id}
                  className={styles.chat_block}
                  onClick={() => handleSelectChat(chat.id)}
                  data-is-selected={chatId && JSON.parse(chatId) === chat.id}
                >
                  {chat.chatPartner.img_url ? (
                    <Image
                      alt={chat.chatPartner.email}
                      src={chat.chatPartner.img_url!}
                      width={50}
                      height={50}
                      loading="lazy"
                      className={styles.reciever_img}
                    />
                  ) : (
                    <div
                      className={`${styles.reciever_img} ${styles.no_image}`}
                    >
                      {" "}
                      {chat.chatPartner?.user_name
                        ? chat.chatPartner?.user_name?.split("")[0]!
                        : chat.chatPartner.email?.split("")[0]!}
                    </div>
                  )}

                  <div className={styles.chat_block_info}>
                    <div className={styles.chat_reciever_personal_info}>
                      {chat.chatPartner.user_name && (
                        <p className={styles.reciever_name}>
                          {chat.chatPartner.user_name}
                        </p>
                      )}
                      <p className={styles.reciever_email}>
                        {chat.chatPartner.email}
                      </p>
                    </div>
                    <Tooltip
                      placement="top"
                      content={"Redirect to listing"}
                      color="default"
                      size="sm"
                      delay={200}
                      className="custome_tooltip small"
                    >
                      <Link
                        className={styles.address_identification}
                        href={`/listing/${formattedAddress}/${chat.listing_info.id}`}
                      >
                        <span className={styles.address_test}>
                          {isAddressToLong
                            ? formattedAddress?.split(",")[0]
                            : formattedAddress}
                        </span>
                        <ShareIcon className={styles.redirect_icon} />
                      </Link>
                    </Tooltip>
                  </div>
                  <Tooltip
                    offset={-2}
                    placement="bottom-start"
                    content={"Been reserved on"}
                    color="default"
                    size="sm"
                    delay={200}
                    className="custome_tooltip small"
                  >
                    <p className={styles.reservation_dates}>
                      {chat.reservation_dates}
                    </p>
                  </Tooltip>
                </li>
              );
            })}
      </ul>
      <CurrentChat />
    </div>
  );
};

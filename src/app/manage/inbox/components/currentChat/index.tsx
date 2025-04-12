import React from "react";
import Image from "next/image";
import { useSelector } from "react-redux";
import { Skeleton } from "@nextui-org/react";
import { useSearchParams } from "next/navigation";
import { skipToken } from "@reduxjs/toolkit/query";

import { isWidthHandlerSelector } from "@/store/selectors/isWidthHandler";
import { useGetCurrentChatQuery } from "@/store/api/endpoints/chats/getCurrentChat";

import { MessagesContainer } from "../messagesContainer";

import styles from "./currentChat.module.scss";
import { RoundButton } from "@/components/roundButton";

interface IChatReciever {
  onBackToChatsAction: () => void;
}
export const CurrentChat: React.FC<IChatReciever> = ({
  onBackToChatsAction,
}) => {
  const params = useSearchParams();
  const chatId = params.get("chatId");

  const { tablet } = useSelector(isWidthHandlerSelector);
  const {
    data: selectedChat,
    isFetching,
    isLoading,
  } = useGetCurrentChatQuery(
    chatId
      ? {
          chatId: JSON.parse(params.get("chatId")!),
        }
      : skipToken
  );

  if (!selectedChat && !isFetching && !isLoading) return null;

  return (
    <div className={styles.current_chat_container}>
      <nav className={styles.current_chat_nav}>
        {tablet && (
          <RoundButton
            showToolTip
            action={onBackToChatsAction}
            arrow_direction="left"
            toolTipPlacement={"right"}
            toolTipContent="Close"
            toolTipDelay={200}
            className={styles.back_button}
          />
        )}
        {!selectedChat?.reciever ? (
          <div className={styles.current_chat_reciever}>
            <Skeleton className={styles.reciever_img} />
            <div className={styles.chat_reciever_personal_info}>
              <Skeleton
                className={`${styles.reciever_email} ${styles.skeleton_email}`}
              />
              <Skeleton
                className={`${styles.reciever_name} ${styles.skeleton_name}`}
              />
            </div>
          </div>
        ) : (
          <div className={styles.current_chat_reciever}>
            {selectedChat?.reciever?.img_url ? (
              <Image
                alt={selectedChat.reciever.email}
                src={selectedChat.reciever.img_url!}
                width={50}
                height={50}
                loading="lazy"
                className={styles.reciever_img}
              />
            ) : (
              <div className={`${styles.reciever_img} ${styles.no_image}`}>
                {" "}
                {selectedChat?.reciever?.user_name
                  ? selectedChat.reciever?.user_name?.split("")[0]!
                  : selectedChat?.reciever.email?.split("")[0]!}
              </div>
            )}
            <div className={styles.chat_reciever_personal_info}>
              <p className={styles.reciever_email}>
                {selectedChat?.reciever.email}
              </p>
              {selectedChat?.reciever.user_name && (
                <p className={styles.reciever_name}>
                  {selectedChat.reciever.user_name}
                </p>
              )}
            </div>
          </div>
        )}
      </nav>
      <MessagesContainer />
    </div>
  );
};

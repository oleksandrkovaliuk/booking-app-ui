import React, { useEffect, useState } from "react";
import { toast } from "sonner";
import { useSession } from "next-auth/react";
import { useSearchParams } from "next/navigation";
import { skipToken } from "@reduxjs/toolkit/query";
import { Button, Textarea } from "@nextui-org/react";

import { store } from "@/store";
import { newChatMessage } from "@/store/api/endpoints/chats/newChatMessage";
import { useGetCurrentChatQuery } from "@/store/api/endpoints/chats/getCurrentChat";

import { SendIcon } from "@/svgs/SendIcon";

import { socket } from "@/helpers/sockets";

import styles from "./sendMessageArea.module.scss";

export const SendMessageArea = () => {
  const params = useSearchParams();
  const { data: session } = useSession();

  const chatId = params.get("chatId");

  const {
    data: selectedChat,
    isFetching,
    refetch,
  } = useGetCurrentChatQuery(
    chatId
      ? {
          chatId: JSON.parse(params.get("chatId")!),
        }
      : skipToken
  );

  const [messageSent, setMessageSent] = useState<boolean>(false);
  const [messageValue, setMessageValue] = useState<string>("");

  const handleSendMessage = async () => {
    if (
      !messageValue?.length ||
      !chatId ||
      !selectedChat?.reciever?.user_email ||
      !session?.user?.email
    )
      return;
    try {
      const { data: res, error } = await store.dispatch(
        newChatMessage.initiate({
          to: selectedChat?.reciever?.user_email,
          from: session?.user?.email,
          chatId: chatId,
          message: messageValue,
        })
      );

      if (!res?.message || error) {
        throw new Error("Failed to send message. Please try again");
      }

      socket.emit("requestUpdateConversation", {
        viewer: session?.user?.email,
        chatId,
      });

      setMessageSent(true);
      setMessageValue("");
    } catch (error) {
      setMessageSent(false);
      toast.error(
        (error as Error).message || "Something went wrong. Please try again",
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
    let timer: NodeJS.Timeout;
    if (messageSent) {
      timer = setTimeout(() => {
        setMessageSent(false);
      }, 500);
    }

    return () => clearTimeout(timer);
  }, [messageSent]);
  return (
    <div className={styles.send_message_container}>
      <div className={styles.send_message_wrap}>
        <Textarea
          variant="bordered"
          placeholder="Message..."
          className={styles.textarea}
          minRows={1}
          maxRows={10}
          value={messageValue}
          onChange={(e) => setMessageValue(e.target.value)}
        />
        <Button
          isIconOnly
          color="primary"
          onClick={handleSendMessage}
          data-animation-triggered={messageSent}
          className={styles.send_button}
        >
          <SendIcon className={styles.send_icon} />
        </Button>
      </div>
    </div>
  );
};

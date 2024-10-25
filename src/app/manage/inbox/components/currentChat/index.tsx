import React, { useEffect } from "react";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { useSearchParams } from "next/navigation";
import { skipToken } from "@reduxjs/toolkit/query";
import { Button, Textarea } from "@nextui-org/react";

import { useGetCurrentChatQuery } from "@/store/api/endpoints/chats/getCurrentChat";

import { SendIcon } from "@/svgs/SendIcon";
import { CheckedIcon } from "@/svgs/CheckedIcon";
import { UnCheckedIcon } from "@/svgs/UnCheckedIcon";

import { socket } from "@/helpers/sockets";

import styles from "./currentChat.module.scss";

export const CurrentChat: React.FC = () => {
  const session = useSession();
  const params = useSearchParams();

  const { data: selectedChat, refetch } = useGetCurrentChatQuery(
    params.get("chatId")
      ? { chatId: JSON.parse(params.get("chatId")!) }
      : skipToken
  );

  useEffect(() => {
    if (!params.get("chatId") || !selectedChat?.chat_data?.length) return;
    const chatId = JSON.parse(params.get("chatId")!);

    socket.on(`${chatId} message_readed`, () => {
      refetch();
    });

    return () => {
      socket.off(`${chatId} message_readed`);
    };
  }, [params, refetch, selectedChat?.chat_data?.length]);

  if (!selectedChat?.chat_data?.length) return null;

  return (
    <div className={styles.current_chat_container}>
      <nav className={styles.current_chat_nav}>
        <div className={styles.current_chat_reciever}>
          {selectedChat.reciever.img_url ? (
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
              {selectedChat.reciever?.user_name
                ? selectedChat.reciever?.user_name?.split("")[0]!
                : selectedChat.reciever.email?.split("")[0]!}
            </div>
          )}
          <div className={styles.chat_reciever_personal_info}>
            <p className={styles.reciever_email}>
              {selectedChat.reciever.email}
            </p>
            {selectedChat.reciever.user_name && (
              <p className={styles.reciever_name}>
                {selectedChat.reciever.user_name}
              </p>
            )}
          </div>
        </div>
      </nav>
      <div className={styles.current_chat_wrap_scroll}>
        <ul className={styles.current_chat_wrap}>
          {selectedChat?.chat_data.map((el, i) => (
            <li
              key={el.from}
              className={styles.current_chat_block}
              data-sender={el.from === session.data?.user?.email}
            >
              <p className={styles.current_chat_message}>{el.message}</p>

              <div className={styles.bottom_chat_block}>
                <span className={styles.been_sent_at}>
                  {new Date(el.sent_at).toLocaleTimeString("en-US", {
                    hour: "2-digit",
                    minute: "2-digit",
                    hour12: true,
                  })}
                </span>
                {el.seen ? (
                  <CheckedIcon className={styles.checked_icon} />
                ) : (
                  <UnCheckedIcon className={styles.checked_icon} />
                )}
              </div>
            </li>
          ))}
        </ul>
      </div>
      <div className={styles.send_message_container}>
        <div className={styles.send_message_wrap}>
          <Textarea
            variant="bordered"
            placeholder="Message..."
            className={styles.textarea}
            minRows={1}
            maxRows={3}
          />
          <Button isIconOnly className={styles.send_button} color="primary">
            <SendIcon className={styles.send_icon} />
          </Button>
        </div>
      </div>
    </div>
  );
};

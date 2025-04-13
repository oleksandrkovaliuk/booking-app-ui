import React, { useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import { Spinner } from "@nextui-org/react";
import { useSession } from "next-auth/react";
import { useSearchParams } from "next/navigation";
import { skipToken } from "@reduxjs/toolkit/query";

import { store } from "@/store";

import { proccesPayment } from "@/store/api/endpoints/payment/proccesPayment";
import { useGetCurrentChatQuery } from "@/store/api/endpoints/chats/getCurrentChat";

import { CheckedIcon } from "@/svgs/CheckedIcon";
import { UnCheckedIcon } from "@/svgs/UnCheckedIcon";

import { ObservationHandler } from "@/helpers/observable";

import { socket } from "@/helpers/sockets";
import { SendMessageArea } from "../sendMessageArea";

import styles from "./messagesContainer.module.scss";

const UPLOAD_MESSAGES_STEP = 30;

export const MessagesContainer: React.FC = () => {
  const params = useSearchParams();
  const { data: session } = useSession();

  const lastMessageRef = useRef<HTMLLIElement | null>(null);
  const chatScrollContainerRef = useRef<HTMLUListElement | null>(null);

  const chatId = params.get("chatId");

  const [amouthOfMessages, setAmouthOfMessages] =
    useState<number>(UPLOAD_MESSAGES_STEP);
  const [disableScroll, setDisableScroll] = useState<boolean>(false);

  const {
    data: selectedChat,
    isLoading,
    isFetching,
    refetch,
  } = useGetCurrentChatQuery(
    chatId
      ? {
          amouthOfMessages: amouthOfMessages,
          chatId: JSON.parse(params.get("chatId")!),
        }
      : skipToken
  );

  const [isProccesingPayment, setProccesingPayment] = useState<boolean>(false);

  const handleProccesPayment = async () => {
    if (!chatId) throw new Error("Chat not found");
    try {
      setProccesingPayment(true);
      const { data: res, error } = await store.dispatch(
        proccesPayment.initiate({
          chatId: params.get("chatId")!,
        })
      );

      if (!res?.sender || error) {
        throw new Error(
          "Something went wrong while proccesing reservation. Please try again"
        );
      }

      socket.emit("requestUpdateConversation", {
        viewer: session?.user?.email,
        chatId,
      });

      socket.emit("notificationUpdate", {
        viewer: res.sender,
      });

      toast.success("Reservation proccesed successfully.", {
        action: {
          label: "Close",
          onClick: () => {},
        },
      });
    } catch (error) {
      toast.error(
        (error as Error).message || "Something went wrong. Please try again",
        {
          action: {
            label: "Close",
            onClick: () => {},
          },
        }
      );
    } finally {
      setProccesingPayment(false);
    }
  };

  const handleUploadMoreMessages = () => {
    if (!chatScrollContainerRef.current) return;

    setAmouthOfMessages((prev) => {
      if (prev > selectedChat?.chat_data?.length!) return prev;
      return prev + UPLOAD_MESSAGES_STEP;
    });
    setDisableScroll(true);
  };

  useEffect(() => {
    if (!chatId || !session?.user?.email) return;

    const viewer = session?.user?.email;
    socket.emit("requestJoinRoom", {
      viewer,
      chatId,
    });

    socket.on(`${chatId}JoinedSuccessfully`, (data) => {
      socket.emit("requestUpdateConversation", {
        viewer,
        chatId: data.chatId,
      });
    });

    socket.on("readyToBeUpdate", (data) => {
      console.log("Ready to be update", data.reciever);
      refetch();
      if (viewer === data.reciever) {
        socket.emit("markMessagesAsReaded", {
          viewer,
          chatId: data.chatId,
        });
        refetch();
      }
      setDisableScroll(false);
    });

    socket.on("messagesReadedSuccesfully", (data) => {
      console.log("Messages have been marked as readed", data.chatId);
      refetch();
    });

    return () => {
      socket.off("requestJoinRoom");
      socket.off("readyToBeUpdate");
      socket.off("requestUpdateConversation");
    };
  }, [chatId, refetch, session?.user?.email]);

  useEffect(() => {
    if (
      !chatScrollContainerRef.current ||
      !selectedChat?.chat_data?.length ||
      disableScroll
    ) {
      return;
    } else {
      chatScrollContainerRef.current.scrollTop =
        chatScrollContainerRef.current.scrollHeight;
    }
  }, [disableScroll, selectedChat?.chat_data?.length]);

  useEffect(() => {
    if (!chatScrollContainerRef.current) return;
    if (
      amouthOfMessages === selectedChat?.chat_data?.length &&
      amouthOfMessages !== UPLOAD_MESSAGES_STEP &&
      lastMessageRef.current
    ) {
      chatScrollContainerRef.current.scrollTop =
        lastMessageRef.current?.getBoundingClientRect().y -
        lastMessageRef.current?.getBoundingClientRect().height -
        142;
    }
  }, [amouthOfMessages, selectedChat?.chat_data?.length]);

  return (
    <div className={styles.current_chat_wrap_scroll}>
      <ul className={styles.current_chat_wrap} ref={chatScrollContainerRef}>
        {isLoading ? (
          <Spinner size="md" color="default" className={styles.spinner} />
        ) : (
          <>
            <li className={styles.observable_chat_block}>
              {isFetching ? (
                <Spinner size="sm" color="default" />
              ) : (
                <ObservationHandler
                  onObserv={handleUploadMoreMessages}
                  delay={300}
                />
              )}
            </li>

            {selectedChat?.chat_data.map((el, i) => (
              <li
                ref={i === UPLOAD_MESSAGES_STEP ? lastMessageRef : null}
                key={`${i}-${el.sent_at}`}
                className={styles.current_chat_block}
                data-sender={el.from === session?.user?.email}
              >
                <p className={styles.current_chat_message}>{el.message}</p>
                {el.required_reservation && el.to === session?.user?.email && (
                  <button
                    onClick={handleProccesPayment}
                    className={styles.submit_reservation}
                  >
                    {isProccesingPayment ? (
                      <Spinner size="sm" color="white" />
                    ) : (
                      "Submit reservation"
                    )}
                  </button>
                )}
                <div className={styles.bottom_chat_block}>
                  <span className={styles.been_sent_at}>
                    {new Date(el.sent_at).toLocaleTimeString("en-US", {
                      hour: "2-digit",
                      minute: "2-digit",
                      hour12: true,
                    })}
                  </span>
                  {el.seenByReceiver ? (
                    <CheckedIcon className={styles.checked_icon} />
                  ) : (
                    <UnCheckedIcon className={styles.checked_icon} />
                  )}
                </div>
              </li>
            ))}
          </>
        )}
      </ul>
      {/* <div className={styles.send_message_container}>
        <div className={styles.send_message_wrap}>
          <Textarea
            ref={textAreaRef}
            value={textAreaValue}
            variant="bordered"
            placeholder="Message..."
            className={styles.textarea}
            minRows={1}
            maxRows={10}
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
      </div> */}
      <SendMessageArea />
    </div>
  );
};

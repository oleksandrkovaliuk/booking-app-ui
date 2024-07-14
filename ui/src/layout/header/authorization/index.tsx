import React, { useEffect, useState } from "react";
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  useDisclosure,
} from "@nextui-org/react";
import Image from "next/image";
import { motion } from "framer-motion";

import peopleAuthPng from "@/assets/topPeekI.png";
import { UserIcon } from "@/svgs/UserIcon";
import { GoogleIcon } from "@/svgs/GoogleIcon";
import { AppleIcon } from "@/svgs/AppleIcon";
import { checkGet, checkPost } from "@/api/apiCalls";

import styles from "./authorization.module.scss";
import "./modalStyles.scss";

export const Authorization = () => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [codeSent, setCodeSent] = useState<boolean>(false);

  const sendVerificationCode = async (e: React.MouseEvent) => {
    e.preventDefault();
    try {
      checkGet();
      checkPost({ code: "1234" });
    } catch (error) {}
    setCodeSent(true);
  };
  const verifyVerificationCode = (e: React.MouseEvent) => {
    console.log("verifyVerificationCode");
  };
  useEffect(() => {
    if (!isOpen) {
      setCodeSent(false);
    }
  }, [isOpen]);
  return (
    <>
      <Modal
        isOpen={isOpen}
        onClose={onOpenChange}
        backdrop="blur"
        size="sm"
        className={styles.authorization_modal}
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
          <Image
            src={peopleAuthPng}
            alt="peopleAuthPng"
            className={styles.auth_top_img}
            data-modal-increased={codeSent}
          />
          <ModalHeader className={styles.modal_header}>
            <div className={styles.authorization_modal_text}>
              <motion.div className={styles.modal_title}>
                <motion.h2
                  initial={{ y: 20, opacity: 0 }}
                  animate={isOpen && { y: 0, opacity: 1 }}
                  transition={{ delay: 0.1, ease: "easeIn" }}
                >
                  Think it. Make it.
                </motion.h2>
              </motion.div>
              <motion.div className={styles.modal_note}>
                <motion.p
                  initial={{ y: 20, opacity: 0 }}
                  animate={isOpen && { y: 0, opacity: 1 }}
                  transition={{ delay: 0.1, ease: "easeIn" }}
                >
                  Log in to your account
                </motion.p>
              </motion.div>
            </div>
          </ModalHeader>
          <ModalBody className={styles.modal_body}>
            <form className={styles.authorization_form}>
              <div className={styles.oauth_buttons}>
                <button className={styles.oauth_button}>
                  <GoogleIcon />
                  Continue with Google
                </button>
                <button className={styles.oauth_button}>
                  <AppleIcon />
                  Continue with Apple
                </button>
              </div>

              <div className={styles.authorization_input_wrap}>
                <input
                  type="email"
                  id="email"
                  placeholder="Enter your email address..."
                  className={styles.authorization_input}
                />
                <label
                  htmlFor="email"
                  className={styles.authorization_input_label}
                >
                  Email
                </label>
                <p className={styles.input_note}>
                  Use an organization email to enhance communication.
                </p>
              </div>
              {codeSent && (
                <div className={styles.authorization_input_wrap}>
                  <input
                    type="text"
                    id="verificationCode"
                    placeholder="Past your code here..."
                    className={styles.authorization_input}
                  />
                  <label
                    htmlFor="text"
                    className={styles.authorization_input_label}
                  >
                    Verification code
                  </label>
                  <p className={styles.input_note}>
                    We sent a code to your inbox .
                  </p>
                </div>
              )}

              <button
                className={styles.authorization_submit_button}
                onClick={
                  !codeSent ? sendVerificationCode : verifyVerificationCode
                }
              >
                {!codeSent ? "Continue" : "Lets start"}
              </button>
            </form>
          </ModalBody>
        </ModalContent>
      </Modal>
      <button className={styles.authorization_icon_button} onClick={onOpen}>
        <UserIcon />
      </button>
    </>
  );
};

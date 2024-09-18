"use client";

import React, { useEffect, useRef, useState } from "react";
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  useDisclosure,
} from "@nextui-org/react";
import { toast } from "sonner";
import Image from "next/image";
import { motion } from "framer-motion";
import { signIn } from "next-auth/react";
import { useSearchParams, useRouter } from "next/navigation";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";

import { store } from "@/store";
import { checkAuthType } from "@/store/api/endpoints/auth/checkAuthType";

import peopleAuthPng from "@/assets/topPeekI.png";
import { GoogleIcon } from "@/svgs/GoogleIcon";
import { FaceBookIcon } from "@/svgs/FacebookIcon";

import { ReactEvent } from "@/_utilities/type";
import {
  EmailValidation,
  PasswordValidation,
} from "@/validation/emailValidation";

import styles from "./authorization.module.scss";

import "./modalStyles.scss";

export const LoginModal = () => {
  const emailRef = useRef<HTMLInputElement>(null);
  const passRef = useRef<HTMLInputElement>(null);

  const { isOpen, onOpen, onClose } = useDisclosure();
  const [emailValid, setEmailValid] = useState(false);
  const [passValid, setPassValid] = useState(false);

  const router = useRouter();
  const searchParam = useSearchParams();
  const callBackUrl = searchParam.get("callbackUrl") || "/";

  const oAuthSignIn = async (e: ReactEvent, oauth_type: string) => {
    e.preventDefault();
    try {
      await signIn(oauth_type, { callbackUrl: callBackUrl });
    } catch (error) {
      toast.error((error as Error).message);
    }
  };

  const emailValidation = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    const emailValue = (emailRef.current as HTMLInputElement).value;
    try {
      if (!EmailValidation(emailValue)) {
        throw new Error("Email is not valid. Please try again");
      }
      const { data: res, error } = await store.dispatch(
        checkAuthType.initiate({ email: btoa(emailValue) })
      );

      if (!error && res) {
        setEmailValid(true);
        throw new Error("Failed with move on. Please try again.");
      }
    } catch (error) {
      if (emailRef.current) {
        emailRef.current.value = " ";
        setEmailValid(false);
      }
      toast.error((error as Error).message, {
        action: {
          label: "Close",
          onClick: () => {},
        },
      });
    }
  };

  const submitCredentials = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    try {
      if (passRef.current && emailRef.current) {
        const res = await signIn("credentials", {
          email: btoa(emailRef.current?.value),
          password: btoa(passRef.current.value),
          redirect: false,
        });
        if (res?.error) throw Error(res?.error);
        router.push("/");
      }
    } catch (error) {
      toast.error((error as Error).message);
    }
  };
  const closeModalMenu = () => {
    onClose();
    router.push("/");
  };
  useEffect(() => {
    onOpen();
  }, [onOpen]);

  return (
    <Modal
      isOpen={isOpen}
      onClose={closeModalMenu}
      backdrop="blur"
      size="sm"
      className={styles.authorization_modal}
      classNames={{
        backdrop: "bg-[#FFFFFF] backdrop-opacity-1",
      }}
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
          data-modal-increased={emailValid}
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
              <button
                className={styles.oauth_button}
                onClick={(e: ReactEvent) => oAuthSignIn(e, "google")}
              >
                <GoogleIcon />
                Continue with Google
              </button>
              <button
                className={styles.oauth_button}
                onClick={(e: ReactEvent) => oAuthSignIn(e, "facebook")}
              >
                <FaceBookIcon />
                Continue with Facebook
              </button>
            </div>

            <div className={styles.authorization_input_wrap}>
              <input
                ref={emailRef}
                type="email"
                id="email"
                onChange={() => {
                  setEmailValid(false);
                }}
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
            {emailValid && (
              <div className={styles.authorization_input_wrap}>
                <input
                  id="password"
                  ref={passRef}
                  type="password"
                  onChange={(e) => {
                    if (
                      e.target.value.length > 0 &&
                      PasswordValidation(e.target.value)
                    ) {
                      setPassValid(true);
                    } else {
                      setPassValid(false);
                    }
                  }}
                  placeholder="Enter your password here..."
                  className={styles.authorization_input}
                />
                <label
                  htmlFor="password"
                  className={styles.authorization_input_label}
                >
                  Password
                </label>
                <p className={styles.input_note}>
                  Type your password carrefuly to ensure security .
                </p>
              </div>
            )}

            <button
              disabled={!passValid && emailValid}
              className={styles.authorization_submit_button}
              onClick={!emailValid ? emailValidation : submitCredentials}
            >
              {!emailValid ? "Continue" : "Lets start"}
            </button>
          </form>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

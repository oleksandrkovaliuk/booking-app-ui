import React, { useEffect, useState } from "react";
import { RootState } from "@/store";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import { Button, Progress } from "@nextui-org/react";

import { videos } from "@/information/data";
import { CreateListingSteps } from "./type";

import styles from "./createForm.module.scss";
export const CreateForm: React.FC = () => {
  const router = useRouter();
  const { categories } = useSelector((state: RootState) => state.categories);

  const [formStep, setFormStep] = useState<CreateListingSteps>(
    CreateListingSteps.INTRODUCING
  );

  const enumsKeys = Object.keys(CreateListingSteps)
    .map((item) => Number(item) + 1)
    .filter((item) => !isNaN(Number(item)));

  // CONDITIONS
  const isLastStep = formStep === Number(enumsKeys[enumsKeys.length - 1]);

  const appearAnimation = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.3, ease: "easeOut" },
  };

  const handleNextStep = () => {
    if (!isLastStep) {
      setFormStep((prev) => prev + 1);
    }
  };
  const handlePreviousStep = () => {
    if (formStep === CreateListingSteps.INTRODUCING) router.back();
    setFormStep((prev) => prev - 1);
  };

  console.log(categories, "check");
  const submitCreatedListing = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("submiter");
    router.back();
  };

  useEffect(() => {
    const body = document.body;
    body.classList.add("disable-scroll");
    return () => body.classList.remove("disable-scroll");
  }, []);
  return (
    <>
      <form className={styles.create_form}>
        {formStep === CreateListingSteps.INTRODUCING && (
          <motion.div className={styles.introducing}>
            <motion.div
              className={styles.introducing_text}
              initial={appearAnimation.initial}
              animate={appearAnimation.animate}
              transition={appearAnimation.transition}
            >
              <motion.h1
                className={styles.title}
                initial={appearAnimation.initial}
                animate={appearAnimation.animate}
                transition={appearAnimation.transition}
              >
                Tell us about your place
              </motion.h1>
              <motion.p
                className={styles.description}
                initial={appearAnimation.initial}
                animate={appearAnimation.animate}
                transition={appearAnimation.transition}
              >
                In this step , we will ask you which type of place are you
                offering and if guest will book entire place or just a room .
                Then let us now your location.
              </motion.p>
            </motion.div>
            <motion.video
              autoPlay
              muted
              playsInline
              className={styles.video}
              initial={appearAnimation.initial}
              animate={appearAnimation.animate}
              transition={appearAnimation.transition}
            >
              <source src={videos.apartament_building} type="video/mp4" />
            </motion.video>
          </motion.div>
        )}
      </form>
      <motion.div
        className={styles.navigation_bar}
        initial={appearAnimation.initial}
        animate={appearAnimation.animate}
        transition={appearAnimation.transition}
      >
        <Progress
          size="sm"
          value={formStep * 10}
          className={styles.progress_bar}
        />
        <div className={styles.navigation_buttons}>
          <motion.button
            className={styles.button_back}
            onClick={handlePreviousStep}
          >
            Back
          </motion.button>
          <Button
            className={styles.button_next}
            size="md"
            onClick={!isLastStep ? handleNextStep : submitCreatedListing}
            data-last={isLastStep}
          >
            {!isLastStep ? "Next" : "Submit"}
          </Button>
        </div>
      </motion.div>
    </>
  );
};

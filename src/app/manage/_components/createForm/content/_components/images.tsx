import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Spinner } from "@nextui-org/react";

import { ContentProps } from "../type";
import {
  appearAnimation,
  deepAppearAnimation,
  sloverTransition,
  transition,
} from "@/app/manage/_components/consts";
import camera from "@/assets/3d-camera.png";

export const Images: React.FC<ContentProps> = ({
  styles,
  register,
  handleImagesUpload,
  isLoading,
}) => {
  return (
    <motion.div
      className={styles.images_container}
      initial={appearAnimation.initial}
      animate={appearAnimation.animate}
      transition={transition}
    >
      <motion.h1
        className={styles.title}
        initial={appearAnimation.initial}
        animate={appearAnimation.animate}
        transition={sloverTransition}
      >
        Please provide at least 5 creative images of your place.
      </motion.h1>
      <motion.div
        initial={deepAppearAnimation.initial}
        animate={deepAppearAnimation.animate}
        transition={sloverTransition}
        className={styles.images_files_container}
        data-isLoading={isLoading}
      >
        <label htmlFor="images" className={`${styles.uploading_images_button}`}>
          <input
            type="file"
            {...register("images")}
            multiple
            className={styles.hidden_input}
            onChange={(e) => handleImagesUpload(e)}
          />
          {isLoading ? (
            <Spinner
              color="default"
              size="lg"
              style={{ pointerEvents: "none" }}
            />
          ) : (
            <Image
              src={camera}
              alt="3d_camera"
              width={100}
              height={100}
              className={styles.camera_icon}
            />
          )}
        </label>
      </motion.div>
      <motion.p className={styles.description}>
        Please ensure that all provided photo has good lighting and are of good
        quality.
      </motion.p>
    </motion.div>
  );
};

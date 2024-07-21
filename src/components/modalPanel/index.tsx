"use client";
import React, { useRef } from "react";
import { motion } from "framer-motion";
interface ModalPanelProps {
  triggeredElementHeight: number;
  triggeredElementLeft?: number;
  triggeredElementRight?: number;
  children: React.ReactNode;
  className?: string;
  gap: number;
  width?: number;
  centered_items?: boolean;
  centered_modal?: boolean;
}
export const ModalPanel: React.FC<ModalPanelProps> = ({
  triggeredElementHeight,
  triggeredElementLeft,
  triggeredElementRight,
  children,
  className,
  gap,
  width,
  centered_items,
  centered_modal,
}) => {
  const modalRef = useRef<HTMLDivElement>(null);
  let styles = {
    top: `calc(${triggeredElementHeight}px + ${gap}px)`,
    left: centered_modal
      ? `${triggeredElementLeft}%`
      : `${triggeredElementLeft}px`,
    right: `${triggeredElementRight}px`,
    width: `${width}%`,
  };
  const initialStyles = {
    opacity: 0,
  };

  const animateStyles = {
    opacity: 1,
  };
  return (
    <motion.div
      ref={modalRef}
      transition={{ duration: 0.1, ease: "easeInOut" }}
      initial={initialStyles}
      animate={animateStyles}
      className={className}
      style={styles}
      data-centered-items={centered_items}
      data-centered-modal={centered_modal}
    >
      {children}
    </motion.div>
  );
};

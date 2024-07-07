"use client";
import React, { useRef } from "react";
import { motion } from "framer-motion";
interface ModalPanelProps {
  triggeredElementHeight: number;
  triggeredElementLeft?: number;
  children: React.ReactNode;
  className?: string;
  gap: number;
}
export const ModalPanel: React.FC<ModalPanelProps> = ({
  triggeredElementHeight,
  triggeredElementLeft,
  children,
  className,
  gap,
}) => {
  const modalRef = useRef<HTMLDivElement>(null);
  let styles = {
    top: `calc(${triggeredElementHeight}px + ${gap}px)`,
    left: `${triggeredElementLeft}px`,
  };
  return (
    <motion.div
      ref={modalRef}
      transition={{ duration: 0.5 }}
      animate={{ opacity: "1" }}
      className={className}
      style={styles}
    >
      {children}
    </motion.div>
  );
};

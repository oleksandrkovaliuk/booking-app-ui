"use client";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

import { setWidth } from "@/store/slices/utilities/isWidthHandlerSlice";

export const WidthHandler: React.FC<{ children: React.ReactNode }> = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const dispatch = useDispatch();
  const [isRehydrationEnd, setIsRehydrationEnd] = useState(false);

  useEffect(() => {
    setIsRehydrationEnd(true);
  }, []);
  useEffect(() => {
    if (!isRehydrationEnd) return;
    const handleResize = () => {
      const width = window.innerWidth;

      dispatch(
        setWidth({
          isWidthEqualTo: {
            mobile: width <= 768,
            tablet: width <= 1080,
            desktop: width > 1080,
          },
        })
      );
    };
    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [dispatch, isRehydrationEnd]);

  return children;
};

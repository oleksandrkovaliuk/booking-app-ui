import React, { useEffect } from "react";
import { useDispatch } from "react-redux";

import { setWidth } from "@/store/slices/utilities/isMobileHandlerSlice";

export const WidthHandler: React.FC<{ children: React.ReactNode }> = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const dispatch = useDispatch();

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      dispatch(
        setWidth({
          isWidthEqual: {
            768: width <= 768,
            1080: width <= 1080,
            1280: width <= 1280,
          },
        })
      );
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, [dispatch]);

  return <>{children}</>;
};

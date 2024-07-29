"use client";

import { getAllCategories } from "@/store/thunks/listings/categories";
import { getTypeOfPlace } from "@/store/thunks/listings/typeOfPlace";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";

export const GlobalDataOnLoad = () => {
  const dispath = useDispatch();
  useEffect(() => {
    Promise.allSettled([
      dispath(getAllCategories() as any),
      dispath(getTypeOfPlace() as any),
    ]);
  }, [dispath]);
  return <></>;
};

"use client";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";

// import { getTypeOfPlace } from "@/store/thunks/listings/typeOfPlace";

export const GlobalDataOnLoad = () => {
  const dispath = useDispatch();
  useEffect(() => {
    Promise.all([
      // dispath(getAllCategories() as any),
      // dispath(getTypeOfPlace() as any),
      // dispath(getAllListings() as any),
    ]);
  }, [dispath]);
  return <></>;
};

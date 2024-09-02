import { SerializedError } from "@reduxjs/toolkit";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";

export const ErrorHandler = (error: FetchBaseQueryError | SerializedError) => {
  if ("data" in error) {
    const errorMessage = (error.data as { message?: string }).message;
    throw new Error(errorMessage || "Unknown error occurred");
  } else {
    throw new Error("An unknown error occurred");
  }
};

import { configureStore } from "@reduxjs/toolkit";
import {
  TypedUseSelectorHook,
  useSelector as useReduxSelector,
} from "react-redux";

import { api } from "./api/api";

import { reducer as listingsInfoReducer } from "./slices/listingsInfoSlice";
import userDateSelectionReducer from "./slices/userDateSelectionSlice";

export const store = configureStore({
  reducer: {
    [api.reducerPath]: api.reducer,
    listingsInfo: listingsInfoReducer,
    userDateSelection: userDateSelectionReducer,
  },
  middleware: (getDefaultMiddleware) =>
    // adding the api middleware enables caching, invalidation, polling and other features of `rtk-query`
    getDefaultMiddleware().concat(api.middleware),
  devTools: true,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppStore = typeof store;
export type AppDispatch = typeof store.dispatch;

export const useSelector: TypedUseSelectorHook<RootState> = useReduxSelector;

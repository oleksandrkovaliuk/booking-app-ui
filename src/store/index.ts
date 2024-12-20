import { configureStore } from "@reduxjs/toolkit";
import {
  TypedUseSelectorHook,
  useSelector as useReduxSelector,
} from "react-redux";

import { api } from "./api/api";

import searchSelectionReducer from "./slices/search/searchSelectionSlice";

import widthHandlerReducer from "./slices/utilities/isWidthHandlerSlice";

import notificationsReducer from "./slices/notificationsSlice/index";

import isSearchTriggeredReducer from "./slices/listings/isSearchTriggeredSlice";
import listingSearchResponseReducer from "./slices/listings/listingSearchResponseSlice";

export const store = configureStore({
  reducer: {
    [api.reducerPath]: api.reducer,
    widthHandler: widthHandlerReducer,
    notifications: notificationsReducer,
    searchSelection: searchSelectionReducer,
    isSearchTriggered: isSearchTriggeredReducer,
    listingSearchResponse: listingSearchResponseReducer,
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

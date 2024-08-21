import { combineReducers, configureStore } from "@reduxjs/toolkit";
import {
  TypedUseSelectorHook,
  useSelector as useReduxSelector,
} from "react-redux";
import { reducer as listingsInfoReducer } from "./slices/listingsInfoSlice";

const rootReducers = combineReducers({
  listingsInfo: listingsInfoReducer,
});

export const store = configureStore({
  reducer: rootReducers,
  devTools: true,
});

export type RootState = ReturnType<typeof rootReducers>;
export type AppStore = typeof store;
export type AppDispatch = typeof store.dispatch;

export const useSelector: TypedUseSelectorHook<RootState> = useReduxSelector;

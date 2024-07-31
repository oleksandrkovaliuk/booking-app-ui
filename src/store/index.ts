import { combineReducers, configureStore } from "@reduxjs/toolkit";

import { listingsAdditionalsReducer } from "./reducers/listingsReducer";

const rootReducers = combineReducers({
  listingsAdditionals: listingsAdditionalsReducer,
});

export const store = configureStore({
  reducer: rootReducers,
  devTools: true,
});

export type RootState = ReturnType<typeof rootReducers>;
export type AppStore = typeof store;
export type AppDispatch = typeof store.dispatch;

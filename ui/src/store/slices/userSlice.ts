import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../index";

interface UserState {
  name?: string;
  lastName?: string;
  email: string;
  img?: string;
}

const initialState: UserState = {
  name: "",
  lastName: "",
  email: "",
  img: "",
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    unauthorizeUser(state) {
      state.name = "";
      state.lastName = "";
      state.email = "";
      state.img = "";
    },
    authorizeUser(state, action: PayloadAction<UserState>) {
      state.name = action.payload.name;
      state.lastName = action.payload.lastName;
      state.email = action.payload.email;
      state.img = action.payload.img;
    },
  },
});
export const { unauthorizeUser, authorizeUser } = userSlice.actions;
export const getUser = (state: RootState) => state.user;

export default userSlice.reducer;

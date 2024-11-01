import { NotificationTypes } from "@/store/api/lib/enums";
import { IUserNotifications } from "@/store/api/lib/interfaces";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface INotificationState {
  shouldUpdateNotifications: boolean;
  notificationIn: {
    [key in NotificationTypes]: boolean;
  };
  notifications: IUserNotifications[] | null;
}
const initialState: INotificationState = {
  notifications: null,
  shouldUpdateNotifications: false,
  notificationIn: {
    [NotificationTypes.MANAGE]: false,
    [NotificationTypes.GENERAL]: false,
    [NotificationTypes.INBOX_MESSAGE]: false,
  },
};

const notificationsSlice = createSlice({
  name: "notificationsSlice",
  initialState,
  reducers: {
    updateNotifications: (state, action) => {
      state.shouldUpdateNotifications = action.payload;
    },
    setNotificationType: (
      state,
      action: PayloadAction<Partial<{ [key in NotificationTypes]: boolean }>>
    ) => {
      state.notificationIn = {
        ...state.notificationIn,
        ...action.payload,
      };
    },

    setNotification: (state, action: PayloadAction<IUserNotifications[]>) => {
      state.notifications = action.payload;
    },
  },
});

export const { updateNotifications, setNotificationType, setNotification } =
  notificationsSlice.actions;
export default notificationsSlice.reducer;

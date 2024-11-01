import { createSelector } from "@reduxjs/toolkit";

import { RootState } from "..";

const notifications = (state: RootState) => state.notifications;

export const NotificationSelector = createSelector(
  [notifications],
  ({ notificationIn, notifications, shouldUpdateNotifications }) => {
    return {
      notifications,
      notificationIn,
      shouldUpdateNotifications,
    };
  }
);

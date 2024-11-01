import React, { useEffect } from "react";
import { useDispatch } from "react-redux";

import { useSelector } from "@/store";
import {
  setNotification,
  setNotificationType,
  updateNotifications,
} from "@/store/slices/notificationsSlice";
import { NotificationSelector } from "@/store/selectors/notificationsState";
import { useGetUserNotificationsQuery } from "@/store/api/endpoints/user/getUserNotifications";

import { NotificationTypes } from "@/store/api/lib/enums";

export const NotificationsProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const dispatch = useDispatch();
  const { data: notifications, refetch } = useGetUserNotificationsQuery();
  const { shouldUpdateNotifications } = useSelector(NotificationSelector);

  useEffect(() => {
    if (shouldUpdateNotifications) {
      refetch();
      dispatch(updateNotifications());
    }

    if (notifications) {
      const isInboxNotificationSeen = notifications.some(
        (el) => el.type === NotificationTypes.INBOX_MESSAGE && !el.seen
      );
      const isManageNotificationSeen = notifications.some(
        (el) => el.type === NotificationTypes.INBOX_MESSAGE && !el.seen
      );
      const isGeneralNotificationsSeen = notifications.some((el) => !el.seen);

      dispatch(
        setNotificationType({
          [NotificationTypes.MANAGE]: isManageNotificationSeen,
          [NotificationTypes.GENERAL]: isGeneralNotificationsSeen,
          [NotificationTypes.INBOX_MESSAGE]: isInboxNotificationSeen,
        })
      );
      dispatch(setNotification(notifications));
    }
  }, [dispatch, notifications, shouldUpdateNotifications, refetch]);

  return <>{children}</>;
};

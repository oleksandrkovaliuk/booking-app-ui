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
import { socket } from "@/helpers/sockets";
import { useSession } from "next-auth/react";
import { skipToken } from "@reduxjs/toolkit/query";

export const NotificationsProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const dispatch = useDispatch();
  const { data: session } = useSession();
  const { data: notifications, refetch } = useGetUserNotificationsQuery(
    !session?.user.email ? skipToken : undefined
  );

  useEffect(() => {
    const refetchNotificationData = () => {
      refetch();
      dispatch(updateNotifications(false));
    };

    socket.on(
      `${session?.user?.email} notificationUpdate`,
      refetchNotificationData
    );

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
  }, [dispatch, notifications, refetch, session?.user?.email]);

  return <>{children}</>;
};

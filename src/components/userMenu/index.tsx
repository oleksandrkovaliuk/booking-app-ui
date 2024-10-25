"use client";
import React, { useEffect, useState } from "react";
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownSection,
  DropdownTrigger,
  Tooltip,
  User,
} from "@nextui-org/react";
import Link from "next/link";
import Image from "next/image";
import { toast } from "sonner";
import { useDispatch } from "react-redux";
import { signOut, useSession } from "next-auth/react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

import { store, useSelector } from "@/store";
import { setFetch } from "@/store/slices/listings/isSearchTriggeredSlice";
import { NotificationSelector } from "@/store/selectors/notificationsState";
import { updateTokensBlackList } from "@/store/api/endpoints/auth/updateTokensBlackList";

import { UserIcon } from "@/svgs/UserIcon";
import { AdminFlag } from "@/svgs/AdminFlag";
import { LogOutIcon } from "@/svgs/LogOutIcon";

import { CreateNewQueryParams } from "@/helpers/paramsManagment";

import { Roles } from "@/_utilities/enums";
import { IFormState } from "@/app/manage/_components/type";

import styles from "./userMenu.module.scss";
import "./dropdown.scss";

export const UserMenu: React.FC<{ showArrow?: boolean }> = ({ showArrow }) => {
  const router = useRouter();
  const pathname = usePathname();
  const dispatch = useDispatch();
  const params = useSearchParams();
  const { data: session } = useSession();

  const { notifications, notificationIn } = useSelector(NotificationSelector);

  const [mobile, setMobile] = useState<boolean>(false);
  const [listingInProgress] = useState<IFormState | null>(() => {
    if (typeof localStorage !== "undefined") {
      const IFormState = localStorage.getItem("startingDate")!;
      if (IFormState) {
        const state = JSON.parse(IFormState);
        if (state) {
          return state;
        } else {
          return null;
        }
      }
    } else {
      return null;
    }
  });

  // CONSTANTS

  const isManageHasUnredNotifications =
    notificationIn.MANAGE || listingInProgress;

  const handleLogOut = async () => {
    try {
      const { data: res, error } = await store.dispatch(
        updateTokensBlackList.initiate()
      );

      if (error && !res) {
        throw new Error("Something went wrong. Please try again");
      }
      await signOut({ callbackUrl: `/${pathname}?${params.toString()}` });
    } catch (error) {
      toast.error((error as Error).message);
    }
  };

  const handleOpenNotificationsModal = () => {
    const updatedParams = CreateNewQueryParams({
      updatedParams: {
        notificationsModal: JSON.stringify(true),
      },
      params,
    });

    router.replace(`${pathname}?${updatedParams}`, {
      scroll: false,
    });
    dispatch(setFetch(false));
  };

  useEffect(() => {
    if (window.innerWidth <= 1080) {
      setMobile(true);
    } else {
      setMobile(false);
    }
  }, []);

  return (
    <>
      {!session?.user ? (
        <Link href={`/login?callbackUrl=${pathname}`}>
          <button className={styles.right_navigation_button}>
            <UserIcon className={styles.user_icon} />
          </button>
        </Link>
      ) : (
        <Dropdown
          shouldBlockScroll={true}
          radius="sm"
          placement={!mobile ? "bottom-end" : "top"}
          showArrow={showArrow}
        >
          <DropdownTrigger>
            <button className={styles.right_navigation_button}>
              {session?.user?.role === Roles.ADMIN && (
                <Tooltip
                  showArrow
                  placement="left"
                  content={"Admin"}
                  color="default"
                  size="sm"
                  delay={100}
                  className="custome_tooltip info"
                >
                  <div className={styles.role_badge}>
                    <AdminFlag className={styles.role_icon} />
                  </div>
                </Tooltip>
              )}
              {session?.user?.image ? (
                <Image
                  src={session?.user?.image!}
                  alt="user_img"
                  width={20}
                  height={20}
                  className={styles.user_img}
                />
              ) : (
                <div className={`${styles.user_img} ${styles.no_user_image}`}>
                  {" "}
                  {session?.user.name
                    ? session?.user.name?.split("")[0]!
                    : session?.user.email?.split("")[0]!}
                </div>
              )}
              {notificationIn.GENERAL && (
                <Tooltip
                  showArrow
                  placement="left"
                  content={"new notifications"}
                  color="default"
                  size="sm"
                  delay={100}
                  className="custome_tooltip info"
                >
                  <div className={styles.notifications_badge}></div>
                </Tooltip>
              )}
            </button>
          </DropdownTrigger>
          <DropdownMenu aria-label="Navigation">
            <DropdownSection showDivider>
              <DropdownItem isReadOnly key="profile">
                <User
                  name={session?.user?.name || session?.user?.email}
                  description={session?.user?.email}
                  avatarProps={{
                    size: "sm",
                    src: session?.user?.image ? session?.user?.image : "",
                  }}
                />
              </DropdownItem>
            </DropdownSection>
            <DropdownSection showDivider>
              <DropdownItem key="home" className={"drop_down_item"}>
                <Link href="/" className="hidden_link" />
                <span>Home</span>
              </DropdownItem>
              <DropdownItem
                key="accout"
                className={"drop_down_item"}
                endContent={<UserIcon />}
              >
                <Link href="/account">Account</Link>
              </DropdownItem>
              <DropdownItem
                key="notifications"
                className={"drop_down_item"}
                onClick={handleOpenNotificationsModal}
              >
                <span>
                  Notifications
                  {notificationIn.GENERAL && <span className="notification" />}
                </span>
              </DropdownItem>
              <DropdownItem key="manage" className={"drop_down_item"}>
                <Link href="/manage/listings" className="hidden_link" />
                <span>
                  Manage listings{" "}
                  {isManageHasUnredNotifications && (
                    <span className="notification" />
                  )}
                </span>
              </DropdownItem>
            </DropdownSection>
            <DropdownSection>
              <DropdownItem key="help" className={"drop_down_item"}>
                <Link href="/help&feedback" className="hidden_link" />
                <span>Help & Feedback</span>
              </DropdownItem>
              <DropdownItem
                key="log out"
                onClick={handleLogOut}
                className={"drop_down_item"}
                endContent={<LogOutIcon />}
              >
                Log out
              </DropdownItem>
            </DropdownSection>
          </DropdownMenu>
        </Dropdown>
      )}
    </>
  );
};

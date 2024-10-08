"use client";
import React, { useEffect, useState } from "react";
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownSection,
  DropdownTrigger,
  User,
} from "@nextui-org/react";
import Link from "next/link";
import Image from "next/image";
import { toast } from "sonner";
import { signOut, useSession } from "next-auth/react";
import { usePathname, useSearchParams } from "next/navigation";

import { store } from "@/store";
import { updateTokensBlackList } from "@/store/api/endpoints/auth/updateTokensBlackList";

import { AdminFlag } from "@/svgs/AdminFlag";
import { UserIcon } from "@/svgs/UserIcon";
import { LogOutIcon } from "@/svgs/LogOutIcon";
import { Roles } from "@/_utilities/enums";
import { FormState } from "@/app/manage/_components/type";

import styles from "./userMenu.module.scss";
import "./dropdown.scss";

export const UserMenu: React.FC<{ showArrow?: boolean }> = ({ showArrow }) => {
  const pathname = usePathname();
  const params = useSearchParams();
  const { data: session } = useSession();
  const [mobile, setMobile] = useState(false);
  const [listingInProgress] = useState<FormState | null>(() => {
    if (typeof localStorage !== "undefined") {
      const formState = localStorage.getItem("startingDate")!;
      if (formState) {
        const state = JSON.parse(formState);
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
                <AdminFlag className={styles.role_icon} />
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
            </button>
          </DropdownTrigger>
          <DropdownMenu aria-label="Navigation">
            <DropdownSection showDivider>
              <DropdownItem isReadOnly key="profile">
                <User
                  name={session?.user?.name}
                  description={session?.user?.email}
                  avatarProps={{
                    size: "sm",
                    src: session?.user?.image ? session?.user?.image : "N",
                  }}
                />
                {session?.user?.role === Roles.ADMIN && (
                  <AdminFlag className={styles.role_icon} />
                )}
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
              <DropdownItem key="manage" className={"drop_down_item"}>
                <Link href="/manage/listings" className="hidden_link" />
                <span>
                  Manage listings{" "}
                  {listingInProgress && <span className="notification" />}
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

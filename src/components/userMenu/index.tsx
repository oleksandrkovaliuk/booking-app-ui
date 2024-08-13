"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownSection,
  DropdownTrigger,
  User,
} from "@nextui-org/react";
import { signOut, useSession } from "next-auth/react";

import { AdminFlag } from "@/svgs/AdminFlag";
import { UserIcon } from "@/svgs/UserIcon";
import { LogOutIcon } from "@/svgs/LogOutIcon";
import { Roles } from "@/utilities/enums";
import { FormState } from "@/app/manage/_components/type";

import styles from "./userMenu.module.scss";
import "./dropdown.scss";

export const UserMenu: React.FC = () => {
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
        <Link href="/login">
          <button className={styles.right_navigation_button}>
            <UserIcon className={styles.user_icon} />
          </button>
        </Link>
      ) : (
        <Dropdown
          shouldBlockScroll={true}
          radius="sm"
          placement={!mobile ? "bottom-end" : "top"}
          showArrow
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
                  {session?.user.email?.split("")[0]!}
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
                <Link href="/">Home</Link>
              </DropdownItem>
              <DropdownItem
                key="accout"
                className={"drop_down_item"}
                endContent={<UserIcon />}
              >
                <Link href="/account">Account</Link>
              </DropdownItem>
              <DropdownItem key="manage" className={"drop_down_item"}>
                <Link href="/manage/listings">
                  Manage listings{" "}
                  {listingInProgress && <span className="notification" />}
                </Link>
              </DropdownItem>
            </DropdownSection>
            <DropdownSection>
              <DropdownItem key="help" className={"drop_down_item"}>
                <Link href="/help&feedback">Help & Feedback</Link>
              </DropdownItem>
              <DropdownItem
                key="log out"
                onClick={() => signOut({ callbackUrl: "/" })}
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

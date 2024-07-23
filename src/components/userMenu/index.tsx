"user client";
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

import styles from "./userMenu.module.scss";
import "./dropdown.scss";

export const UserMenu: React.FC = () => {
  const { data: session } = useSession();
  const [mobile, setMobile] = useState(false);

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
        <Link href={"/login"}>
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
                <UserIcon className={styles.user_icon} />
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
                    src: session?.user?.image!,
                  }}
                />
                {session?.user?.role === Roles.ADMIN && (
                  <AdminFlag className={styles.role_icon} />
                )}
              </DropdownItem>
            </DropdownSection>
            <DropdownSection showDivider>
              <DropdownItem key="home" href="/" className={"drop_down_item"}>
                Home
              </DropdownItem>
              <DropdownItem
                key="manage"
                href="/manage"
                className={"drop_down_item"}
              >
                Manage listings
              </DropdownItem>
              <DropdownItem
                key="accout"
                href="/account"
                className={"drop_down_item"}
                endContent={<UserIcon />}
              >
                Account
              </DropdownItem>
            </DropdownSection>
            <DropdownSection>
              <DropdownItem
                key="help"
                href="/help&feedback"
                className={"drop_down_item"}
              >
                Help & Feedback
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

"use client";
import React from "react";
import ManageLayout from "./manageLayout";
import { useSession } from "next-auth/react";

import styles from "./manage.module.scss";
export default function ManagePage() {
  const { data: session } = useSession();
  return (
    <ManageLayout>
      <div className={styles.manage_page_home}>
        <section className={styles.top_section}>
          <h1>Welcome , {session?.user?.name}</h1>
        </section>
      </div>
    </ManageLayout>
  );
}

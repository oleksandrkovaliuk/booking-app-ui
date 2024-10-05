import React from "react";

import { CalendarIcon } from "@/svgs/CalendarIcon";

import styles from "./rulesAndPolicy.module.scss";
export const RulesAndPolicy: React.FC = () => {
  return (
    <ul className={styles.rules_and_policy_container}>
      <li className={styles.rules_and_policy_block}>
        <div className={styles.title}>Ground policy</div>
        <p className={styles.description}>
          We ask every guest to remember a few simple things about what makes a
          great guest.
        </p>
        <div className={styles.rules}>
          <p className={styles.rule}>Follow the house rules</p>
          <p className={styles.rule}>Treat your Host’s home like your own</p>
        </div>
      </li>
      <li className={styles.rules_and_policy_block}>
        <div className={styles.reservation_confirmation}>
          <CalendarIcon className={styles.calendar_icon} />
          <p className={styles.rules_description}>
            <b>
              Your reservation won’t be confirmed until the Host accepts your
              request (within 24 hours).
            </b>{" "}
            You won’t be charged until then.
          </p>
        </div>
      </li>
    </ul>
  );
};

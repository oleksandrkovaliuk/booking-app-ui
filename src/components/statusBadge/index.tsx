import React from "react";

import styles from "./statusBadge.module.scss";

export const StatusBadge: React.FC<{ status: string; color: string }> = ({
  status,
  color,
}) => {
  return (
    <div className={styles.status}>
      <span className={styles.circle} style={{ backgroundColor: color }} />
      <span className={styles.status_text}>{status}</span>
    </div>
  );
};

import { Spinner } from "@nextui-org/react";
import styles from "./loading.module.scss";

export default function Loading() {
  return (
    <div className={styles.loadingContainer}>
      <Spinner size="md" color="primary" />
    </div>
  );
}

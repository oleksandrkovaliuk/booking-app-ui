import styles from "./loading.module.css";

export default function Loading() {
  return (
    <div className={styles.loadingContainer}>
      <p className={styles.text}>Loading...</p>
    </div>
  );
}

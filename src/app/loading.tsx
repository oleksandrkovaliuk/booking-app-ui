import { Logo } from "@/svgs/Logo";
import styles from "./loading.module.scss";

export default function Loading() {
  return (
    <div className={styles.loadingContainer}>
      <Logo className={styles.logo} />
    </div>
  );
}

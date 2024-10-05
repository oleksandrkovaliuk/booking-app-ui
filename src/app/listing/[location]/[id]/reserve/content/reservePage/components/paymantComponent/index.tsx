import React from "react";
import Link from "next/link";
import { Button } from "@nextui-org/react";
import { useSession } from "next-auth/react";
import { usePathname, useSearchParams } from "next/navigation";

import styles from "./paymantComponent.module.scss";

export const PaymantComponent: React.FC = () => {
  const pathname = usePathname();
  const params = useSearchParams();
  const { data: session } = useSession();
  return (
    <div className={styles.paymant_section}>
      {session?.user ? (
        <button>buy now</button>
      ) : (
        <div className={styles.login_to_procces}>
          <span className={styles.title}>
            In order to procces the reservation , please authorize your account.
          </span>
          <Link href={`/login?callbackUrl=${pathname}?${params.toString()}`}>
            <Button size="lg" className={styles.login_button}>
              Authorize
            </Button>
          </Link>
        </div>
      )}
    </div>
  );
};

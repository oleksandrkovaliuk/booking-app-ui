import React from "react";
import styles from "./counter.module.scss";
import { Button } from "@nextui-org/react";

interface CounterProps {
  state: number;
  callback: (value: (prev: number) => number) => void;
}
export const Counter: React.FC<CounterProps> = ({ state, callback }) => {
  return (
    <div className={styles.counter_buttons}>
      <Button
        onClick={() => callback((prev) => (prev -= 1))}
        disabled={state <= 1}
        color="primary"
        isIconOnly
      />
      <span className={styles.counter_value}>{state}</span>
      <Button
        onClick={() => callback((prev) => (prev += 1))}
        disabled={state >= 16}
        color="primary"
        isIconOnly
      />
    </div>
  );
};

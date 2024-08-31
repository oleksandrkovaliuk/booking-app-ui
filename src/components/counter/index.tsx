import React from "react";
import styles from "./counter.module.scss";
import { Button } from "@nextui-org/react";

interface CounterProps {
  counter: number;
  setCounter: (value: number) => void;
  maxCount?: number;
}
export const Counter: React.FC<CounterProps> = ({
  counter,
  setCounter,
  maxCount,
}) => {
  return (
    <div className={styles.counter_buttons}>
      <Button
        onClick={() => {
          setCounter((counter -= 1));
        }}
        disabled={counter <= 1}
        color="primary"
        isIconOnly
      />
      <span className={styles.counter_value}>{counter}</span>
      <Button
        onClick={() => setCounter((counter += 1))}
        disabled={maxCount ? counter >= maxCount : counter >= 16}
        color="primary"
        isIconOnly
      />
    </div>
  );
};

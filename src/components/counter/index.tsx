import React from "react";
import styles from "./counter.module.scss";
import { Button } from "@nextui-org/react";

interface CounterProps {
  counter: number;
  setCounter: (value: number) => void;
}
export const Counter: React.FC<CounterProps> = ({ counter, setCounter }) => {
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
        disabled={counter >= 16}
        color="primary"
        isIconOnly
      />
    </div>
  );
};

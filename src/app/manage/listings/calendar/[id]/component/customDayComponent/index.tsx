import React from "react";
import moment from "moment";
import { DateCellWrapperProps } from "react-big-calendar";

interface childrenProps extends React.ReactElement {
  className?: string;
}
interface CustomDayComponentProps extends Omit<DateCellWrapperProps, "range"> {
  value: Date;
  children: childrenProps;
  selectedDate: Date[];
  handleSelectDisableDate: (value: Date) => void;
}

import styles from "./customDayComponent.module.scss";

export const CustomDayComponent: React.FC<CustomDayComponentProps> = ({
  selectedDate,
  handleSelectDisableDate,
  children,
  value,
}) => {
  const customizedChildren = React.isValidElement(children)
    ? React.cloneElement(children, {
        ...children.props!,
        className: `${styles.custom_day_wrap} ${
          children.props.className.includes("rbc-today") ? styles.rbc_today : ""
        } ${
          children.props.className.includes("rbc-off-range-bg")
            ? styles.rbc_off_range_bg
            : ""
        }`,
        disabled: children.props.className.includes("rbc-off-range-bg")
          ? true
          : false,
      })
    : null;
  return (
    <div
      className={styles.custom_day_block}
      data-is-disabled={value <= new Date() ? true : false}
      data-selected={
        selectedDate?.length &&
        selectedDate?.some((date: Date) => date.getTime() === value.getTime())
      }
      onClick={
        children.props.className.includes("rbc-off-range-bg")
          ? () => {}
          : () => handleSelectDisableDate(value)
      }
    >
      {customizedChildren}
      <span className={styles.day}>{moment(value).format("DD")}</span>
      <span className={styles.price}></span>
    </div>
  );
};

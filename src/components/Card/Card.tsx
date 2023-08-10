import React, { HTMLAttributes, ReactNode } from "react";
import styles from "./Card.module.scss";

export type CardProps = {
  children: ReactNode;
} & HTMLAttributes<HTMLDivElement>;

export const Card = ({ children, className, ...rest }: CardProps) => {
  return (
    <div className={`${styles["card"]} ${className}`} {...rest}>
      {children}
    </div>
  );
};

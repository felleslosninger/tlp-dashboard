import React from "react";
import styles from "./Card.module.css";

type CardProps = {
  children: React.ReactNode;
} & React.HTMLAttributes<HTMLDivElement>;

const Card = ({ children, ...rest }: CardProps) => {
  return <div className={styles.card} {...rest}>{children}</div>;
};

export default Card;

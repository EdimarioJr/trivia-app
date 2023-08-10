import Link from "next/link";
import React from "react";
import styles from "./TimeFinished.module.scss";

export const TimeFinishedCard = () => {
  return (
    <div className={styles.container}>
      <h1 className={styles.h1}>Your time is up! So sorry :/</h1>
      <Link className={styles.link} href="/">
        Try again
      </Link>
    </div>
  );
};

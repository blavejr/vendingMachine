import React from "react";
import cx from "classnames";
import styles from "./Landing.module.scss";

export default function Landing() {
  return (
    <div className={cx(styles.landingContainer)}>
      <h1 className={cx(styles.landingTitle)}>
        Welcome to the Vending Machine
      </h1>
      <div className={cx(styles.landingLinks)}>
        <a href="/login" className={cx(styles.landingLink)}>
          Login
        </a>
        <br />
        <a href="/register" className={cx(styles.landingLink)}>
          Register
        </a>
      </div>
    </div>
  );
}

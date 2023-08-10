import { resetQuiz } from "@/store";
import styles from "@/styles/Home.module.scss";

import Link from "next/link";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

export default function Home() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(resetQuiz());
  }, [dispatch]);

  return (
    <section className={styles.section}>
      <div className={styles["glowing-ball-container"]}>
        <div className={styles["glowing-ball"]}></div>
      </div>
      <div className={styles["info-container"]}>
        <h1>Welcome to the random-trivia app!</h1>
        <h2>Are you ready to find out if you possess random knowledge?</h2>
        <Link href="/quiz">
          <button className={`primary-button-with-glow`}>Lets go!</button>
        </Link>
      </div>
    </section>
  );
}

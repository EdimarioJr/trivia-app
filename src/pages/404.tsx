import Link from "next/link";
import styles from "@/styles/404.module.scss";

export default function Custom404() {
  return (
    <div className={styles["page-container"]}>
      <h1>Ooops... this page does not exist!</h1>
      <Link href="/">
        <button className={`primary-button-with-glow`}>Go back</button>
      </Link>
    </div>
  );
}

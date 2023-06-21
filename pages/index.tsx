import EarthPage from "./components/earth";
import Link from 'next/link'
import styles from "../styles/Home.module.css";




export default function Home() {
  return (
    <>
      <EarthPage />
      <div className={styles.container}>
        <h1 className={styles.h1}>analyzeBoxing</h1>
        <Link href="/login">
          <button className={styles.button}>ログイン</button>
        </Link>
        <p className={styles.p}>
          AIの力であなたのボクシングスキルを精密検査
        </p>
        {/* <Link href="/about">
                    <button className={styles.button}>ゲストとして利用</button>
                </Link> */}
      </div>
    </>
  );
}

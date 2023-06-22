import EarthPage from "./components/earth";
import Link from 'next/link'
import styles from "../styles/Home.module.css";

export default function Home() {
  const handleGuest = () => {

  }

  return (
    <>
      <EarthPage />
      <div className={styles.container}>
        <h1 className={styles.h1}>AnalyzeBoxing</h1>
        <Link href="/login">
          <button className={styles.button}>ログイン</button>
        </Link>
        <button onClick={handleGuest} className={styles.button}>ゲスト</button>
        <p className={styles.p}>
          AIの力であなたのボクシングスキルを精密検査
        </p>
      </div>
    </>
  );
}

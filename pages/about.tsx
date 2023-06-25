import styles from "../styles/about.module.css"
import Link from "next/link";
import { MdOutlineLanguage } from "react-icons/md"
import { BiDownArrow } from "react-icons/bi"
import { useState } from "react";

const AboutPage = () => {
    const [menuValue, setMenuValue] = useState(false)
    const handleMenu = () => {
        if (menuValue) {
            setMenuValue(false)
        } else {
            setMenuValue(true)
        }
    }
    const handleJapanese = () => {
        console.log("aaaa")
    }
    return (
        <>
            <div className={styles.container}>
                <div className={styles.img} />
                <h1>Analyze<span>Boxing</span></h1>
                <ul className={styles.ul}>
                    <li className={styles.li}><Link href="/login">概要について</Link></li>
                    <li className={styles.li}><Link href="#">お知らせ</Link></li>
                    <li className={styles.li}><Link href="#">お問い合わせ</Link></li>
                    <li className={styles.language}>
                        <button onClick={handleMenu}>
                            <div className={styles.icon}>
                                <MdOutlineLanguage />Language<BiDownArrow />
                            </div>
                        </button>
                        {/* メニューボタンをクリック後以下を表示 */}
                        {menuValue &&
                            <>
                                <div className={styles.menu}>
                                    <ul className={styles.menuUl}>
                                        <li onClick={handleJapanese}>日本語</li>
                                        <li>English</li>
                                    </ul>
                                </div>
                                <div onClick={handleMenu} className={styles.overley} />
                            </>
                        }
                    </li>
                </ul>
            </div>
        </>
    )
}

export default AboutPage;
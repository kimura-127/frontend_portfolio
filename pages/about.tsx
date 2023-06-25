import styles from "../styles/about.module.css"
import Link from "next/link";
import { MdOutlineLanguage } from "react-icons/md"
import { BiDownArrow } from "react-icons/bi"
import { useState } from "react";
import { useRouter } from "next/router";

const AboutPage = () => {
    const [menuValue, setMenuValue] = useState(false)
    const router = useRouter();
    const handleheader = () => {
        router.push("/login")
    }
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
                <div className={styles.flexContainer}>
                    <h1 onClick={handleheader}>Analyze<span>Boxing</span></h1>
                    <ul className={styles.ul}>
                        <li className={styles.li}><Link href="/login">概要について</Link></li>
                        <li className={styles.li}><Link href="#">お知らせ</Link></li>
                        <li className={styles.li}><Link href="#">お問い合わせ</Link></li>
                        <li className={styles.language}>
                            <button onClick={handleMenu}>
                                <div className={styles.bar}>
                                    <MdOutlineLanguage className={styles.icon} />Language<BiDownArrow />
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
                <div className={styles.h2Container}>
                    <h2>さらなる高みへ</h2>
                    <h4>CHALLENGE</h4>
                </div>
            </div>
        </>
    )
}

export default AboutPage;
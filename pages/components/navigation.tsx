import Link from 'next/link';
import { RiVideoUploadLine } from 'react-icons/ri';
import { MdVideoLibrary } from 'react-icons/md'
import { RiLogoutBoxRFill } from 'react-icons/ri'
import { useState } from 'react';
import styles from "../../styles/navigation.module.css";

export default function Navigation() {
    // ナビゲーションクリック時に色を変更する際に使用
    const [activeClick, setActiveClick] = useState<number>(0);

    // ナビゲーションをクリックした時に発生する処理
    const handleClick = (index: number) => {
        setActiveClick(index);
    };

    // ログアウトに使用する処理
    const handleLogout = () => {
        window.location.href = "/"
    }

    return (
        <>
            <div className={styles.navigation}>
                <ul className={styles.navigation}>

                    <li
                        // このliタグをクリックしたら色を変更する処理
                        className={`${styles.list} ${activeClick === 1 ? styles.active : ''
                            }`}
                        onClick={() => handleClick(1)}
                    >
                        <Link href="/sendVideo">
                            <span className={styles.icons}>
                                {/* アイコン使用 */}
                                <RiVideoUploadLine />
                            </span>
                            <span className={styles.title}>動画を分析</span>
                        </Link>
                    </li>

                    <li
                        // このliタグをクリックしたら色を変更する処理
                        className={`${styles.list} ${activeClick === 2 ? styles.active : ''
                            }`}
                        onClick={() => handleClick(2)}
                    >
                        <Link href="/showResult">
                            <span className={styles.icons}>
                                {/* アイコン使用 */}
                                <MdVideoLibrary />
                            </span>
                            <span className={styles.title}>マイページ</span>
                        </Link>
                    </li>

                    <li
                        // このliタグをクリックしたら色を変更する処理
                        className={`${styles.list} ${activeClick === 3 ? styles.active : ''
                            }`}
                        onClick={() => handleClick(3)}
                    >
                        <Link href="#" onClick={handleLogout}>
                            <span className={styles.icons}>
                                {/* アイコン使用 */}
                                <RiLogoutBoxRFill className={styles.gr} />
                            </span>
                            <span className={styles.title}>ログアウト</span>
                        </Link>
                    </li>

                </ul>
            </div>
        </>
    )
}
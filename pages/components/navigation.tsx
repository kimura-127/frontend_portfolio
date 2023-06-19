import Link from 'next/link';
import { RiVideoUploadLine } from 'react-icons/ri';
import { AiOutlineHome } from 'react-icons/ai';
import { MdVideoLibrary } from 'react-icons/md'
import { RiLogoutBoxRFill } from 'react-icons/ri'
import { useState } from 'react';
import styles from "../../styles/navigation.module.css";

export default function Navigation() {
    const [activeItem, setActiveItem] = useState<number>(0);

    const handleClick = (index: number) => {
        setActiveItem(index);
    };

    const handleLogout = () => {
        window.location.href = "/"
    }

    return (
        <>
            <div className={styles.navigation}>
                <ul className={styles.navigation}>
                    <li
                        className={`${styles.list} ${activeItem === 2 ? styles.active : ''
                            }`}
                        onClick={() => handleClick(2)}
                    >
                        <Link href="/sendVideo">
                            <span className={styles.icons}>
                                <RiVideoUploadLine />
                            </span>
                            <span className={styles.title}>動画を分析</span>
                        </Link>
                    </li>
                    <li
                        className={`${styles.list} ${activeItem === 3 ? styles.active : ''
                            }`}
                        onClick={() => handleClick(3)}
                    >
                        <Link href="/showResult">
                            <span className={styles.icons}>
                                <MdVideoLibrary />
                            </span>
                            <span className={styles.title}>マイページ</span>
                        </Link>
                    </li>
                    <li
                        className={`${styles.list} ${activeItem === 1 ? styles.active : ''
                            }`}
                        onClick={() => handleClick(1)}
                    >
                        <Link href="#" onClick={handleLogout}>
                            <span className={styles.icons}>
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
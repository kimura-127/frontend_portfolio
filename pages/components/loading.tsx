import styles from "../../styles/loading.module.css"

const LoadingPage = () => {

    return (
        <>
            <div className={`${styles.spinnerbox}`}>
                <div className={`${styles.blueorbit} ${styles.leo}`}>
                </div>

                <div className={`${styles.greenorbit} ${styles.leo}`}>
                </div>

                <div className={`${styles.redorbit} ${styles.leo}`}>
                </div>

                <div className={`${styles.whiteorbit} ${styles.w1} ${styles.leo}`}>
                </div><div className={`${styles.whiteorbit} ${styles.w2} ${styles.leo}`}>
                </div><div className={`${styles.whiteorbit} ${styles.w3} ${styles.leo}`}>
                </div>
            </div>
        </>
    )
}

export default LoadingPage;
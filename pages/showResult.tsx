import styles from "../styles/showResult.module.css";
import { useEffect, useState, useRef } from 'react';
import axios from "axios";
import { useRecoilValue } from "recoil";
import { isLogginState } from "./atoms/isLogginState";
import { userEmailState } from "./atoms/userEmailState";
import { userIdState } from "./atoms/userIdState";
import LoadingPage from "./components/loading";

const ShowResultPage = () => {
    const [videoUrl, setVideoUrl] = useState("");
    const [resultData, setResultData] = useState("");
    const videoRef = useRef<HTMLVideoElement | null>(null);
    const isLoggin = useRecoilValue(isLogginState);
    const userEmail = useRecoilValue(userEmailState);
    const userId = useRecoilValue(userIdState);

    useEffect(() => {
        const getUrl = async () => {
            await axios
                .get('http://localhost:3000/getvideo#index', {
                    params: {
                        userid: userId,
                        email: userEmail
                    }
                })
                .then((res) => {
                    const url = res.data.url;
                    // console.log(res);
                    setVideoUrl(url)
                    // if (url && videoRef.current) {
                    //     // videoRef.current.src = url;
                    //     // videoRef.current.load();
                    // }
                })
                .catch((error) => {
                    console.log(error);
                });
        }

        const getResult = async () => {
            await axios.get('http://localhost:3000/getresult#index'
                , {
                    params: {
                        userid: userId,
                        email: userEmail
                    }
                }
            )
                .then((res) => {
                    const response = res.data.result
                    const result = []
                    response.forEach((res: any) => {
                        if (res) {
                            const count = (res.match(/"displayName":"jab"/g) || []).length;
                            result.push(count)
                        }
                    })
                    setResultData(result)
                })
                .catch((error) => {
                    console.log(error);
                });
        }

        isLoggin && getUrl();
        isLoggin && getResult();
    }, []);



    return (
        <>
            <div className={styles.container}>
                <div className={styles.backgroundImage} />
                {isLoggin ? (
                    resultData.length == 0 && videoUrl.length == 0 ? (
                        <div className={styles.loading}>
                            <LoadingPage />
                        </div>
                    ) : (
                        <>
                            {Object.keys(videoUrl).map((url_key: any) => (<>
                                <div key={url_key} className={styles.resultContainer}>
                                    <video src={videoUrl[url_key]} controls className={styles.video} />
                                    <div className={styles.result} >
                                        <header>ジャブの数</header>
                                        <p>{resultData.length == 0 ? ("集計中") : (resultData[url_key])}</p>
                                        <header>勝敗</header>
                                        <p>ドロー</p>
                                    </div>
                                </div>
                            </>))}
                        </>
                    )
                ) : (
                    <p className={styles.loggin}>ログインしてください</p>
                )}
            </div>
        </>
    )

}

export default ShowResultPage;
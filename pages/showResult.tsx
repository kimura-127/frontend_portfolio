import styles from "../styles/showResult.module.css";
import { useEffect, useState, useRef } from 'react';
import axios from "axios";
import { useRecoilValue } from "recoil";
import { isLogginState } from "atoms/isLogginState";
import { userEmailState } from "atoms/userEmailState";
import { userIdState } from "atoms/userIdState";
import LoadingPage from "./components/loading";
import { useRouter } from "next/router";

const ShowResultPage = () => {
    const [videoUrl, setVideoUrl] = useState("");
    const [videoHave, setVideoHave] = useState(true);
    const [resultData, setResultData] = useState<number[]>([]);
    const isLoggin = useRecoilValue(isLogginState);
    const userEmail = useRecoilValue(userEmailState);
    const userId = useRecoilValue(userIdState);
    const router = useRouter();

    const getUrl = async () => {
        await axios
            .get(`${process.env.NEXT_PUBLIC_BASE_URL}/getvideo#index`, {
                params: {
                    userid: userId,
                    email: userEmail
                }
            })
            .then((res) => {
                if (res.data.status == 200) {
                    const url = res.data.url;
                    setVideoUrl(url);
                } else {
                    setVideoHave(false);
                }
            })
            .catch((error) => {
                console.log(error);
            });
    }

    const getResult = async () => {
        await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/getresult#index`
            , {
                params: {
                    userid: userId,
                    email: userEmail
                }
            }
        )
            .then((res) => {
                const response = res.data.result
                const result: number[] = []
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

    useEffect(() => {
        if (!isLoggin) {
            router.push("/")
        } else {
            getUrl();
            getResult();
        }
    }, []);



    return (
        <div className={styles.allContainer}>
            <h1 className={styles.header}>分析結果</h1>
            {isLoggin ? (
                videoUrl.length == 0 ? (
                    (videoHave ? (<div className={styles.loading}>
                        <LoadingPage />
                    </div>) : (
                        <h1 className={styles.nonVideo}>ビデオがありません</h1>
                    ))
                ) : (
                    <>
                        {Object.keys(videoUrl).map((url_key: any) => (<>
                            <div key={url_key} className={styles.resultContainer}>
                                <video controls playsInline >
                                    <source src={videoUrl[url_key]} type="video/mp4" />
                                </video>
                                <div className={styles.result} >
                                    <p>{resultData.length == 0 ? ("集計中") : resultData[url_key] == 0 ? ("あなたのジャブはパワー・スピード・キレのいずれかに問題があります、シャドーボクシングやミット打ちを行い問題点を発見し改善しましょう。") : ("あなたのジャブはパワー・スピード・キレともに優れております、このままの調子で努力を続ければ必ず勝利を掴み取ることができるでしょう。")}</p>
                                </div>
                            </div>
                        </>))}
                    </>
                )
            ) : (
                <div />
            )}
        </div>
    )

}

export default ShowResultPage;
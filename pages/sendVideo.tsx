import styles from "../styles/sendVideo.module.css";
import Image from 'next/image'
import axios from "axios";
import { useForm } from "react-hook-form";
import { useRecoilValue } from 'recoil';
import { isLogginState } from 'atoms/isLogginState';
import { userIdState } from "atoms/userIdState";
import { userEmailState } from "atoms/userEmailState";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";



const SendVideoPage = () => {
    // フォームで使用する関数
    const { register, handleSubmit, watch } = useForm();
    const inputVideoData = watch("video")
    // Recoil宣言
    const isLoggin = useRecoilValue(isLogginState);
    const userId = useRecoilValue(userIdState);
    const userEmail = useRecoilValue(userEmailState);
    // フォームを選択したら動画の名前を表示するため使用
    const [videoName, setVideoName] = useState("")
    // useRouterを宣言
    const router = useRouter();

    // アップロードボタンをクリックした時の処理
    const onSubmit = async (data: any) => {
        if (isLoggin) {
            const formData = new FormData();
            // 動画データをアペンド
            formData.append("video", data.video[0]);
            // バックエンドへ
            await axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}/sendanalyze#create`,
                formData, {
                params: {
                    userid: userId,
                    email: userEmail
                }
            }
            )
        }
    }

    // ログインしていなかったらホーム画面へ
    useEffect(() => {
        if (!isLoggin) {
            router.push("/")
        }
    }, [])

    // フォームのinput要素が変更されたらvideoNameをセット
    useEffect(() => {
        if (inputVideoData && inputVideoData.length > 0) {
            setVideoName(inputVideoData[0].name)
        }
    }, [inputVideoData])




    return (<>
        <div className={styles.container}>
            <Image className={styles.image} src="/images/sendVideo.jpg" alt="Image" width={1000} height={800} />
            <h1 className={styles.header}>動画を分析する</h1>
            <div className={styles.overlay} >
                {isLoggin ? (
                    <>
                        <form className={styles.form} onSubmit={handleSubmit(onSubmit)} encType="multipart/form-data">
                            <p>
                                {videoName ? (videoName + "が選択されています") : ("ファイルが選択されていません")}
                            </p>
                            <label>
                                <input type="file" className={styles.input}  {...register("video")} />ファイルを選択
                            </label>
                            <button type="submit" className={styles.button}>アップロード</button>
                        </form>
                    </>
                ) : (
                    <div />
                )}
            </div>
        </div>
    </>
    )
}

export default SendVideoPage;
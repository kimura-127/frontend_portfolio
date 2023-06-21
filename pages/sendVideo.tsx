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
    const { register, handleSubmit, watch, reset } = useForm();
    const inputVideoData = watch("video")
    // Recoil宣言
    const isLoggin = useRecoilValue(isLogginState);
    const userId = useRecoilValue(userIdState);
    const userEmail = useRecoilValue(userEmailState);
    // フォームを選択したら動画の名前を表示するため使用
    const [videoName, setVideoName] = useState("");
    // inputのデータが動画か否かの状態を保持
    const [inputDataValue, setInputDataValue] = useState(true);
    // useRouterを宣言
    const router = useRouter();
    // フォームの中身をリセットする関数
    const formReset = () => {
        reset();
    }
    // データに異常がある状態でアップロードを押した時に使う
    const [missingAppload, setMissingAppload] = useState(false)
    // 動画データの容量を制限する時に使用
    const [missingDataCapacity, setMissingDataCapacity] = useState(false)




    // アップロードボタンをクリックした時の処理
    const onSubmit = async (data: any) => {
        // ログインしていて尚且つインプットのデータに異常がなければ処理開始
        if (isLoggin && inputDataValue && videoName.length > 0) {
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
        } else {
            setMissingAppload(true)
        }
    }

    // ログインしていなかったらホーム画面へ
    useEffect(() => {
        if (!isLoggin) {
            router.push("/")
        }
    }, [])

    // inputの要素が動画かチェック && trueならデータ名を画面に表示
    useEffect(() => {
        if (inputVideoData && inputVideoData.length > 0) {
            const videoDataName = inputVideoData[0].name
            const videoSize = inputVideoData[0].size
            const capacitySize = 30000000
            // データの拡張子を以下の内容で点検
            const testInputData = /mov$|mp4$|avi$|wmv$|mkv$|flv$|webm$|m4v$|mpeg$|3gp$/;
            // 動画であるかどうかチェック
            const result = testInputData.test(videoDataName)
            if (result) {
                if (videoSize <= capacitySize) {
                    // 動画である && 容量が適正
                    setInputDataValue(true)
                    setMissingAppload(false)
                    setVideoName(videoDataName)
                } else {
                    // 動画であるが容量が大きすぎる時の処理,inputをリセットし表示を少し変更
                    formReset();
                    setInputDataValue(false)
                    setMissingAppload(true)
                    setMissingDataCapacity(true)
                }
            } else {
                // 動画以外が選択された時の処理
                formReset();
                setInputDataValue(false)
                setMissingAppload(true)
                setMissingDataCapacity(false)
            }
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
                                {inputDataValue ? (
                                    videoName ? (videoName + "が選択されています") : ("ファイルが選択されていません")
                                ) : (missingDataCapacity ? ("動画の容量が大きすぎます") : ("動画以外はアップロードできません"))}
                            </p>
                            <label>
                                <input type="file" className={styles.input}  {...register("video")} />ファイルを選択
                            </label>
                            <button type="submit" className={missingAppload ? (styles.missbutton) : (styles.button)}>アップロード</button>
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
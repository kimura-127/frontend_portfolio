import styles from "../styles/sendVideo.module.css";
import Image from 'next/image'
import axios from "axios";
import { useForm } from "react-hook-form";
import { useRecoilValue } from 'recoil';
import { isLogginState } from 'atoms/isLogginState';
import { userIdState } from "atoms/userIdState";
import { userEmailState } from "atoms/userEmailState";
import { useEffect, useState } from "react";



const SendVideoPage = () => {
    const { register, handleSubmit, watch } = useForm();
    const isLoggin = useRecoilValue(isLogginState);
    const userId = useRecoilValue(userIdState);
    const userEmail = useRecoilValue(userEmailState);
    const [videoName, setVideoName] = useState("")
    const inputVideoData = watch("video")

    const onSubmit = async (data: any) => {
        if (isLoggin) {
            const formData = new FormData();
            formData.append("video", data.video[0]);
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

    useEffect(() => {
        console.log(isLoggin)
    }, [])

    useEffect(() => {
        if (inputVideoData) {
            setVideoName(inputVideoData[0].name)
        }
    }, [inputVideoData])




    return (<>
        <div className={styles.container}>
            <Image className={styles.image} src="/images/sendVideo.jpg" alt="Image" width={1000} height={800} />
            <h1 className={styles.header}>Upload</h1>
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
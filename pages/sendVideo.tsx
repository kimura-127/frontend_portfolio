import styles from "../styles/sendVideo.module.css";
import Image from 'next/image'
import axios from "axios";
import { useForm } from "react-hook-form";
import { useRecoilValue } from 'recoil';
import { isLogginState } from 'atoms/isLogginState';
import { userIdState } from "atoms/userIdState";
import { userEmailState } from "atoms/userEmailState";
import { useEffect } from "react";



const SendVideoPage = () => {
    const { register, handleSubmit } = useForm();
    const isLoggin = useRecoilValue(isLogginState);
    const userId = useRecoilValue(userIdState);
    const userEmail = useRecoilValue(userEmailState);

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

    }, [])



    return (<>
        <div className={styles.container}>
            <Image className={styles.image} src="/images/sendVideo.jpg" alt="Image" width={1000} height={800} />
            <div className={styles.overlay} >
                {isLoggin ? (
                    <form className={styles.form} onSubmit={handleSubmit(onSubmit)} encType="multipart/form-data">
                        <h1 className={styles.title}>Upload</h1>
                        <label htmlFor="file-upload" className={styles.label}>
                            Choose a file
                            <input type="file" className={styles.input}  {...register("video")} />
                        </label>
                        <button type="submit" className={styles.button}>Upload</button>
                    </form>
                ) : (
                    <h1 className={styles.loggin}>ログインしてください</h1>
                )}
            </div>
        </div>
    </>
    )
}

export default SendVideoPage;
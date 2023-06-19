import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import styles from "../styles/login.module.css"
import { useForm } from 'react-hook-form';
import { useRecoilState } from 'recoil';
import { isLogginState } from 'atoms/isLogginState';
import { userIdState } from "atoms/userIdState";
import { userEmailState } from "atoms/userEmailState";


const LoginPage = () => {
    const [token, setToken] = useState("");
    const [isLoggin, setIsLoggin] = useRecoilState(isLogginState);
    const [userId, setUserId] = useRecoilState(userIdState);
    const [userEmail, setUserEmail] = useRecoilState(userEmailState);
    const router = useRouter();

    const handleLogin = () => {
        setIsLoggin(true);
    };

    type FormData = {
        email: string;
        password: string;
    };

    const { register, handleSubmit, formState: { errors } } = useForm<FormData>();

    const onSubmit = (data: FormData) => {
        const emailAdress = data.email;
        const pass = data.password;



        const login = async () => {
            // 認証リクエストを送信してアクセストークンを取得
            const authResponse = await axios.post(
                `${process.env.NEXT_PUBLIC_BASE_URL}/auth`,
                { email: emailAdress, password: pass },
                {
                    headers: { 'Content-Type': 'application/json' },
                    withCredentials: true
                }
            );
            setUserEmail(emailAdress);
            setUserId(authResponse.data.id);
            setToken(authResponse.data.accessToken);
        }

        login();
    };

    // useEffect(() => {
    //     if (isLoggin) {
    //         router.push("/");
    //     }
    // }, [])

    useEffect(() => {
        // トークンを送信してトークンの検証
        const jwt = async () => {
            if (token) {
                await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/home`, {
                    headers: { Authorization: `Bearer ${token}` },
                    withCredentials: true
                })
                    // 成功したらルーティング
                    .then((res) => {
                        if (res.data.status == 200) {
                            handleLogin();
                        }
                    })
                    // 失敗したらエラー表示
                    .catch((error) => {
                        console.log(error)
                    })
            }
        }

        jwt();
    }, [token])

    useEffect(() => {
        if (isLoggin) {
            router.push("/sendVideo")
        }
    }, [isLoggin])

    const regi = () => {
        router.push("/registration")
    }

    return (
        <>
            <div className={styles.container}>
                <form className={styles.form} >
                    <label htmlFor="name">メールアドレス</label>
                    <input placeholder="メールアドレスを入力" {...register('email', { required: true, pattern: /^\S+@\S+$/i })} />
                    {errors.email && <span>正しいメールアドレスを入力してください</span>}
                    <label htmlFor="email">パスワード</label>
                    <input className={styles.password} type="password" maxLength={12} placeholder="パスワードを入力" {...register('password', { required: true })} />
                    {errors.password && <span>正しいパスワードを入力してください</span>}
                    <button onClick={handleSubmit(onSubmit)} className={styles.submit} type="submit">送信</button>
                </form>
            </div>
            <div className={styles.regiContainer}>
                <button className={styles.regi} onClick={regi}>新規の方はこちらから!</button>
            </div>
        </>
    )
}


export default LoginPage;
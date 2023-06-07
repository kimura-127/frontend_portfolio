import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import styles from "../styles/login.module.css"
import { useForm } from 'react-hook-form';
import { useRecoilState } from 'recoil';
import { isLogginState } from 'atoms/isLogginState';
import { userIdState } from "atoms/userIdState";
import { userEmailState } from "atoms/userEmailState";
import Link from "next/link";


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

    useEffect(() => {
        if (isLoggin) {
            router.push("/");
        }
    }, [])

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
            router.push("/");
        }
    }, [isLoggin])

    return (
        <>
            <form className={styles.login} onSubmit={handleSubmit(onSubmit)}>
                <div>
                    <label htmlFor="name">メールアドレス:</label>
                    <input {...register('email', { required: true, pattern: /^\S+@\S+$/i })} />
                    {errors.email && <span>名前を入力してください</span>}
                </div>
                <div>
                    <label htmlFor="email">パスワード:</label>
                    <input {...register('password', { required: true })} />
                    {errors.password && <span>正しいメールアドレスを入力してください</span>}
                </div>
                <button type="submit">送信</button>
            </form>
            <Link className={styles.regi} href="/registration">新規会員登録</Link>
        </>
    )
}


export default LoginPage;
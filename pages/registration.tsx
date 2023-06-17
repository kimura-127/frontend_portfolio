import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import styles from "../styles/login.module.css"
import { useForm } from 'react-hook-form';
import { useRecoilState } from 'recoil';
import { isLogginState } from 'atoms/isLogginState';
import { userIdState } from "atoms/userIdState";
import { userEmailState } from "atoms/userEmailState";


const RegistrationPage = () => {
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

    const onSubmit = async (data: FormData) => {
        const emailAdress = data.email;
        const pass = data.password;

        const register = async () => {
            await axios.post(
                `${process.env.NEXT_PUBLIC_BASE_URL}/registration#create`,
                { email: emailAdress, password: pass }
            )
        }

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

        await register();
        login();
    };

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
            <div className={styles.container}>
                <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
                    <label htmlFor="name">メールアドレス</label>
                    <input placeholder="メールアドレスを入力" {...register('email', { required: true, pattern: /^\S+@\S+$/i })} />
                    {errors.email && <span>正しいメールアドレスを入力してください</span>}
                    <label htmlFor="email">パスワード</label>
                    <input placeholder="パスワードを入力" maxLength={12} {...register('password', { required: true })} />
                    {errors.password && <span>正しいパスワードを入力してください</span>}
                    <button className={styles.submit} type="submit">登録</button>
                </form>
            </div>
        </>
    )
}


export default RegistrationPage;
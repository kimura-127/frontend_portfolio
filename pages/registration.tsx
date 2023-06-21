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
    // Recoilを定義、使わない変数があるがsetするため仕方なく定義
    const [isLoggin, setIsLoggin] = useRecoilState(isLogginState);
    const [userId, setUserId] = useRecoilState(userIdState);
    const [userEmail, setUserEmail] = useRecoilState(userEmailState);
    // useRouterを使用するためインスタンス化
    const router = useRouter();

    // 新規登録後にログイン実行するために処理
    const handleLogin = () => {
        // ログイン
        setIsLoggin(true);
    };

    // フォームデータの型を定義
    type FormData = {
        email: string;
        password: string;
    };

    // useFormで使う関数
    const { register, handleSubmit, formState: { errors } } = useForm<FormData>();

    // フォームのボタンが押された時の処理
    const onSubmit = async (data: FormData) => {

        // 登録の際使用する関数
        const register = async (data: any) => {
            const emailAdress = data.email;
            const pass = data.password;
            await axios.post(
                `${process.env.NEXT_PUBLIC_BASE_URL}/registration#create`,
                { email: emailAdress, password: pass }
            )
        }

        // ログイン関数
        const login = async (data: any) => {
            const emailAdress = data.email;
            const pass = data.password;
            // 認証リクエストを送信してアクセストークンを取得
            const authResponse = await axios.post(
                `${process.env.NEXT_PUBLIC_BASE_URL}/auth`,
                { email: emailAdress, password: pass },
                {
                    headers: { 'Content-Type': 'application/json' },
                    withCredentials: true
                }
            );
            // Recoilで管理
            setUserEmail(emailAdress);
            setUserId(authResponse.data.id);
            setToken(authResponse.data.accessToken);
        }

        // 最初にバックエンドにデータを送信しユーザー情報を登録
        await register(data);
        // ログイン
        login(data);
    };

    // トークンを送信しトークンの検証する関数
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

    useEffect(() => {
        if (token && token.length > 0) {
            // トークンを取得したらそれをここで検証
            jwt();
        }
    }, [token])

    // ログインに成功したらアップロード画面へ
    useEffect(() => {
        if (isLoggin) {
            router.push("/sendVideo");
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
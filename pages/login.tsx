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
    // Recoil宣言、使用していない変数があるがsetするために仕方なく定義
    const [isLoggin, setIsLoggin] = useRecoilState(isLogginState);
    const [userId, setUserId] = useRecoilState(userIdState);
    const [userEmail, setUserEmail] = useRecoilState(userEmailState);
    // useRouterをインスタンス化
    const router = useRouter();

    // ログインする時の関数
    const handleLogin = () => {
        setIsLoggin(true);
    };

    // フォームのデータに型付け
    type FormData = {
        email: string;
        password: string;
    };

    // useFormで使用する関数
    const { register, handleSubmit, formState: { errors } } = useForm<FormData>();

    // ログインの際呼び出す関数
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
        // Recoilに格納
        setUserEmail(emailAdress);
        setUserId(authResponse.data.id);
        setToken(authResponse.data.accessToken);
    }

    // フォームのボタンをクリックした時の処理
    const onSubmit = (data: FormData) => {
        // ログイン処理
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

    useEffect(() => {
        // ログインに成功したらアップロード画面にルーティング
        if (isLoggin) {
            router.push("/sendVideo")
        }
    }, [isLoggin])

    // 新規登録画面に転移する関数
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
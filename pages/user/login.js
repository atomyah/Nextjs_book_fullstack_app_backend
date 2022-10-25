import { useState } from "react"
import Head from "next/head"

const Login = () => {
    // 分割代入試したけどできなかった…
    const [email, setEmail] = useState("")      
    const [password, setPassword] = useState("") 

    // ()でなく(e)にしないとe.preventDefault()が書けない.
    // e.preventDefault()がないとButtonを押すとリロードされてしまう.
    const handleSubmit = async(e) => {
        e.preventDefault()
        try{
            const response = await fetch("https://nextjs-book-fullstack-app-backend.vercel.app/api/user/login",
            {
            method:"POST",
            headers:{
                "Accept": "application/json",
                "Content-type": "application/json"
            },
            body: JSON.stringify({
                    email: email,
                    password: password,
                    }),
            })
            const jsonData = await response.json() //responseデータ（messageとtoken）をjson形式に変換.
            // ↓ブラウザのlocalStorageにトークンを保存.
            localStorage.setItem("token",jsonData.token)
            console.log('◆jsonData')
            console.log(jsonData) // バックエンドからのresponse、res.json({message: "ログイン成功",token: token}の内容が表示される
            alert(jsonData.message)
        }catch(err){
            alert("ログイン失敗")
        }
    }

    return (
        <div>
            <Head><title>ログイン</title></Head>
            <h1 className="page-title">ログイン</h1>
            <form onSubmit={handleSubmit}>
                <input value={email} onChange={(e) => setEmail(e.target.value)} type="text" name="email" placeholder="メールアドレス" required/>
                <input value={password} onChange={(e) => setPassword(e.target.value)} type="text" name="password" placeholder="パスワード" required/>
                <button>ログイン</button>
            </form>
        </div>
    )
}
export default Login
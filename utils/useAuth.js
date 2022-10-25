// ログイン状態を調べるカスタムフックuseAuth

import { useState, useEffect } from "react"
import { useRouter } from "next/router"
import jwt from "jsonwebtoken"

const secret_key = "nextmarket"

const useAuth = () => {
    //トークンから引き出したemailアドレス(decoded.email)がloginUserステート変数に入る.
    const [loginUser, setLoginUser] = useState("") 

    const router = useRouter()

    //編集や作成ページにアクセスがあった場合、何よりもまずuseAuth.jsの処理が行われないと
    //いけない. このようにページが表示される前に行いたい処理は、useEffectフックを使う.
    //しかし、なぜミドルウェアのように機能するのか不明。
    useEffect(() => {
        const token = localStorage.getItem("token")

        if(!token){
            router.push("/user/login")
        }

        try{
            const decoded = jwt.verify(token, secret_key)
            setLoginUser(decoded.email)
        }catch(err){
            router.push("/user/login")
        }
    }, [router])
    // [router]ってのは不明？

    // 最後に、ログインユーザのメールアドレスloginUserを他のファイルで
    // 使えるようにするため、このコード↓を追加.
    return loginUser
}

export default useAuth
import type { NextApiResponse } from "next"
import jwt from "jsonwebtoken"
import { ExtendedNextApiRequestAuth, DecodedType, ResMessageType,  } from "./types"


const secret_key = "nextmarket"

// このautoはミドルウェアのためupdate, deleteの内容を一度内部に受け取っている.
// 受け取ったものは"handler"として記入する（名前は任意）
const auth = (handler: Function) => {
    return async(req: ExtendedNextApiRequestAuth, res: NextApiResponse<ResMessageType>) => {
        // updateやdelete,createは皆POSTなので、GETリクエストの場合
        // これ以上auth.jsの処理を進めないよう、以下↓を記述している.
        if(req.method === "GET"){
            return handler(req, res)
        }

        /*
        フロントエンドがリクエストを送る際まずLocal Storageからトー クンを取り出し、 
        HTTP headersというところに格納してバックエンドに送る.
        pages/create.jsのfetch()の中のheaders項目の中に"authorization"という項目を作り、
        "authorization": `Bearer ${localStorage.getItem("token")}`としている.
        つまりクライアント側でlocalStorageからtokenをゲットして渡している。Bearerはあまり意味なし(慣習的).
        ”Bearer eJisGliLsQsla.."という感じで渡されてくるので、Bearer[半角スペース]を
        取り除くために、split(" ")[1]のコードがある。        
        */
        const token = await req.headers.authorization.split(" ")[1]
        //const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImF0b21AeWFoLmJ6IiwiaWF0IjoxNjY2NDI0OTQ0LCJleHAiOjE2NjY1MDc3NDR9.FwdRySezAj1EKf1UcvLsFXn7mtg9UJLdyjEzlZ2Ot0I"
        
        if(!token){
            return res.status(401).json({
                message:"トークンがありません"
            })
        }

        try{
            // トークン判定、jwt.verify()
            const decoded = jwt.verify(token, secret_key)
            console.log(decoded)
            req.body.email = (decoded as DecodedType).email // updateなど実行時にフロントエンドからではなく、auth.js通過時に
                                           // トークンのdecode.emailがreq.body.emailに渡された.(update/[id].js内にconsole.log(req.body)で確認できる)
                                           // decode.emailはトークン作成時(login.js,jwt.sign()）で使った
                                           // ペイロード（ユーザのメールアドレス）でconst payload = { email: req.body.email }
                                           // そのためdecoded.emailの型定義が必要. asを使って型定義することを
                                           // 型アサーションという。
            return handler(req, res)
        }catch(err){
            return res.status(400).json({
                message: "トークンが正しくないので、ログインしてください"
            })

        }
    }
}
export default auth
import jwt from "jsonwebtoken"

const secret_key = "nextmarket"

const auth = (handler) => {
    return async(req, res) => {
        // updateやdelete,createは皆POSTなので、GETリクエストの場合
        // これ以上auth.jsの処理を進めないよう、以下↓を記述している.
        if(req.method === "GET"){
            return handler(req, res)
        }

        /*
        フロントエンドがリクエストを送る際まずLocal Storageからトー クンを取り出し、 
        HTTP headersというところに格納 してバックエンドに送る.
        この部分は現在フロントエンドがないためわかりづらいが、 
        後編のフロントエンド編で確認するので今は↓の1行でトークン取得できると考えとく.
        */
        const token = await req.headers.authorization.split(" ")[1]
        //const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImF0b21AeWFoLmJ6IiwiaWF0IjoxNjYwNjI4MDExLCJleHAiOjE2NjA3MTA4MTF9.ae9mDtu29yh56hw3ynsI_DVXNF-tHSqreDjAX8dR8pI"
        
        if(!token){
            return res.status(400).json({
                message:"トークンがありません"
            })
        }

        try{
            const decoded = jwt.verify(token, secret_key)
            req.body.email = decoded.email // updateなど実行時にフロントエンドからではなく、auth.js通過時に
                                           // トークンのdecode.emailがreq.body.emailに渡された.
                                           // (update/[id].js内にconsole.log(req.body)で確認できる)
            return handler(req, res)
        }catch(err){
            return res.status(400).json({
                message: "トークンが正しくないので、ログインしてください"
            })

        }
    }
}
export default auth
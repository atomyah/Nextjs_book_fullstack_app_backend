import jwt from "jsonwebtoken"
import connectDB from "../../../utils/database"
import { UserModel } from "../../../utils/schemaModels"
import type { NextApiResponse } from "next"
import { ResMessageType, ExtendedNextApiRequestUser, SavedUserDataType } from "../../../utils/types"

// jwtトークンの作成方法。jwt.sign(ペイロード,シークレットキー,有効期限).
// シークレットキーは↓のように任意の文字列. ペイロードは一般的にはメールアドレスやアカウント名.
const secret_key = "nextmarket"

const loginUser = async(req: ExtendedNextApiRequestUser, res:NextApiResponse<ResMessageType>) => {
    try{
        await connectDB()   //'| null'を付けないと ↓ "型'SavedUserDataType | null'を'SavedUserDataType'に割り当てることはできません"エラー。
        const savedUserData:SavedUserDataType | null = await UserModel.findOne({
            email: req.body.email
        })
        if(savedUserData){
            if(req.body.password === savedUserData.password) {
                const payload = { email: req.body.email, }
                const token = jwt.sign(payload, secret_key, {expiresIn: "23h"})
                return res.status(200).json({
                    message: "ログイン成功",
                    token: token,
                })
            }else{
                return res.status(400).json({
                    message: "ログイン失敗:パスワードが違います"
                })
            }
        }else{
            return res.status(400).json({
                message: "ログイン失敗:ユーザー登録をしてください"
            })
        }

    }catch(err){
        return res.status(400).json({
            message: "ログイン失敗"
        })
    }

}
export default loginUser
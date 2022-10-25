import connectDB from "../../../utils/database"
import { ItemModel } from "../../../utils/schemaModels"
import auth from "../../../utils/auth"
import type { NextApiResponse } from "next"
import { ResMessageType, ExtendedNextApiRequestItem } from "../../../utils/types"

const createItem = async(req:ExtendedNextApiRequestItem, res:NextApiResponse<ResMessageType>) => {
    try{
        await connectDB()
        /*
        req.bodyの中には、pages/createのフォームからのデータと、auth.jsの中の
        (req.body.email = decoded.email)によって、トークンからデコードされた
        ログインユーザのemailも追加されている.
        */
        await ItemModel.create(req.body)
        return res.status(200).json( {message: "アイテム作成"} )
    }catch(err){
        return res.status(400).json({message: "アイテム作成失敗"})
    }
}
export default auth(createItem)
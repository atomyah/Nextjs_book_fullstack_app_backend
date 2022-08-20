import connectDB from "../../../utils/database"
import { ItemModel } from "../../../utils/schemaModels"
import auth from "../../../utils/auth"

const createItem = async(req, res) => {
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
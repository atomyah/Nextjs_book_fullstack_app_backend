import connectDB from "../../../../utils/database"
import { ItemModel } from "../../../../utils/schemaModels"
import auth from "../../../../utils/auth"
import type { NextApiResponse } from "next"
import { ResMessageType, ExtendedNextApiRequestItem, SavedItemDataType } from "../../../../utils/types"

const updateItem = async(req:ExtendedNextApiRequestItem, res:NextApiResponse<ResMessageType>) => {

    // authから引き継がれたdecoded.emalがreq.body.emailとしてここに渡される
    console.log('◆req')
    console.log(req)
    try{
        await connectDB()
                    /*
                        URLのapi/item/移行の文字列（スラグ）がreq.query.idに入る.
                    */
        const singleItem:SavedItemDataType | null = await ItemModel.findById(req.query.id)
        console.log('◆singleItem')
        console.log(singleItem)
        if(!singleItem) return res.status(400).json({
            message:"アイテムが存在しないため編集失敗"
        })

        /*
        req.body.emailはauth.jsの中の(req.body.email = decoded.email)で
        トークンから格納されたログインユーザのemailである.
        singleItem.emailは文字通りMongoDBのテーブルから引っ張ってきた
        emailデータ.
        */
        if(singleItem.email === req.body.email){ 
            await ItemModel.updateOne(
                {_id: req.query.id},
                req.body
            )
            return res.status(200).send({
                message: "アイテム編集成功"
            })
        }else{
            throw new Error()
        }

    }catch(err){
        return res.status(400).send({
            message: "アイテム編集失敗"
        })
    }

}
export default auth(updateItem)
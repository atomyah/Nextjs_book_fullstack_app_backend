import connectDB from "../../../utils/database"
import { ItemModel } from "../../../utils/schemaModels"
import type { NextApiResponse, NextApiRequest } from "next"
import { SavedItemDataType, ResReadAllType } from "../../../utils/types"

const getAllItems = async(req:NextApiRequest, res:NextApiResponse<ResReadAllType>) => {
    try{
        await connectDB()
                        // []が必要なのは↓、allItemsの値は[]で囲まれたJSONタイプだから
        const allItems:SavedItemDataType[] = await ItemModel.find()
        return res.status(200).send(
            {
            message:"アイテム読み取り成功（オール）",
            allItems: allItems
            })
    }catch(err){
        return res.status(400).send({message:"アイテム読み取り失敗（オール"})
    }
}
export default getAllItems
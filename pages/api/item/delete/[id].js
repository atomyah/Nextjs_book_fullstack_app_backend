import connectDB from "../../../../utils/database";
import { ItemModel } from "../../../../utils/schemaModels";
import auth from "../../../../utils/auth"

const deleteItem = async(req, res) => {
    console.log('◆req')
    console.log(req)
    try{
        await connectDB()
                    /*
                        URLのapi/item/以降の文字列（スラグ）がreq.query.idに入る.
                    */
        const singleItem = await ItemModel.findById(req.query.id)
        console.log('◆singleItem')
        console.log(singleItem)

        /*
        req.body.emailはauth.jsの中の(req.body.email = decoded.email)で
        トークンから格納されたログインユーザのemailである.
        singleItem.emailは文字通りMongoDBのテーブルから引っ張ってきた
        emailデータ.
        */        
        if(singleItem.email === req.body.email){
            await ItemModel.deleteOne(
                {_id: req.query.id}
            )
            return res.status(200).send(
                {message: "アイテム削除成功"}
            )
        }else{
            throw new Error()
        }

    }catch(err){
        return res.status(400).send(
            {message: "アイテム削除失敗"}
        )
    }
}
export default auth(deleteItem)
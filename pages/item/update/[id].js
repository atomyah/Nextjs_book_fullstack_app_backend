import { useState } from "react"
import useAuth from "../../../utils/useAuth"
import Head from "next/head"

const UpdateItem = (props) => {
    const [title, setTitle] = useState(props.singleItem.title) //初期値はgetServerSideProps()で
    const [price, setPrice] = useState(props.singleItem.price) //バックエンドから取ってきた
    const [image, setImage] = useState(props.singleItem.image) //データベースの内容（値）.
    const [description, setDescription] = useState(props.singleItem.description)

    const handleSubmit = async(e) => {
        e.preventDefault()
        try{
            const response = await fetch(`https://nextjs-book-fullstack-app-backend.vercel.app/api/item/update/${props.singleItem._id}`,
            {
                method: "POST",
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json",
                    "authorization": `Bearer ${localStorage.getItem("token")}`
                },
                body: JSON.stringify({
                    title: title,
                    price: price,
                    image: image,
                    description: description
                })
            })
            const jsonData = await response.json()
            alert(jsonData.message)
        }catch(err){
            alert("アイテム編集失敗")
        }
    }

    // ↓ loginUserは、useAuth.jsから引き継いだステート変数(ユーザのメールアドレス)
    const loginUser = useAuth() 

    if(loginUser === props.singleItem.email){
        return (
            <div>
                <Head><title>アイテム編集</title></Head>
                <h1 className="page-title">アイテム編集</h1>
                <form onSubmit={handleSubmit}>
                        <input value={title} onChange={(e) => setTitle(e.target.value)} type="text" name="title" placeholder="アイテム名" required/>
                        <input value={price} onChange={(e) => setPrice(e.target.value)} type="text" name="price" placeholder="価格" required/>
                        <input value={image} onChange={(e) => setImage(e.target.value)} type="text" name="image" placeholder="画像" required/>
                        <textarea value={description} onChange={(e) => setDescription(e.target.value)} type="text" name="description" rows="15" placeholder="商品説明" required></textarea>
                        <button>編集</button>
                </form>
            </div>
        )
    }else{
        return <h1>編集する権限がありません</h1>
    }
}

export default UpdateItem


export const getServerSideProps = async(context) =>{
    const response = await fetch(`https://nextjs-book-fullstack-app-backend.vercel.app/api/item/${context.query.id}`)
    const singleItem = await response.json()
    // console.log(context) 
                        /* URLのスラグ部分（../api/item/○○○○の○○○○部分）は、
                           contextのqueryのidに入っている.
                        */                     
    return{
      props: singleItem 
    }
}
/* returnするsingleItemの中身は、
    {message: "アイテム読み取り成功（シングル）",
    singleItem: singleItem}
    singleItemはSavedItemDataType型(ItemDataTypeに_idを加えたもの)
*/
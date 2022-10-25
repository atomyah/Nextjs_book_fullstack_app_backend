import Image from "next/image"
import useAuth from "../../../utils/useAuth"
import Head from "next/head"

const DeleteItem = (props) => {

    const handleSubmit = async(e) => {
        e.preventDefault()
        try{
            const response = await fetch(`https://nextjs-book-fullstack-app-backend.vercel.app/api/item/delete/${props.singleItem._id}`,
            {
                method: "POST",
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json",
                    "authorization": `Bearer ${localStorage.getItem("token")}`
                },
            })
            // 削除なので、送るべきbody(title, price...)は何もない。
            const jsonData = await response.json()
            alert(jsonData.message)
        }catch(err){
            alert("アイテム削除失敗")
        }
    }

        // ↓ loginUserは、useAuth.jsから引き継いだステート変数(ユーザのメールアドレス)
        const loginUser = useAuth() 

        if(loginUser === props.singleItem.email){
            return (
                <div className="delete-page">
                    <Head><title>アイテム削除</title></Head>
                    <h1 className="page-title">アイテム削除</h1>
                    <form onSubmit={handleSubmit}>
                        <h2>{props.singleItem.title}</h2>
                        <Image src={props.singleItem.image} width="750px" height="500px" alt="item-image"/>
                        <h3>¥{props.singleItem.price}</h3>
                        <p>{props.singleItem.description}</p>
                        <button>削除</button>
                    </form>
                </div>
            )
        }else{
            return <h1>削除する権限がありません</h1>
        }
}
export default DeleteItem


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
    /* returnするsingleItemの中身は、
    {message: "アイテム読み取り成功（シングル）",
    singleItem: singleItem}
    singleItemはSavedItemDataType型(ItemDataTypeに_idを加えたもの)
    */
}
import { useState } from "react"
import useAuth from "../../utils/useAuth"
import Head from "next/head"
import ImgInput from "../../components/imgInput"

const CreateItem = () => {
    const [title, setTitle] = useState("")
    const [price, setPrice] = useState("")
    const [image, setImage] = useState("")
    const [description, setDescription] = useState("")

    const handleSubmit = async(e) => {
        e.preventDefault()
        try{
            const response = await fetch("https://nextjs-book-fullstack-app-backend.vercel.app/api/item/create",
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
            alert("アイテム作成失敗")
        }
    }

    // ↓ loginUserは、useAuth.jsから引き継いだステート変数(ユーザのメールアドレス)
    const loginUser = useAuth() 
    console.log('◆loginUser')
    console.log(loginUser)

    if(loginUser){
        return (
            <div>
                <title>アイテム作成</title>
                <h1 className="page-title">アイテム作成</h1>
                {/*
                ↓ ImgInputコンポーネントのプロパティに、ステートフックを
                  指定している奇妙なやり方.ImgInput.jsでprops.setImage(jsonData.url)
                  という風に使用している.
                */}
                <ImgInput image={image} setImage={setImage} />
                <form onSubmit={handleSubmit}>
                        <input value={title} onChange={(e) => setTitle(e.target.value)} type="text" name="title" placeholder="アイテム名" required/>
                        <input value={price} onChange={(e) => setPrice(e.target.value)} type="text" name="price" placeholder="価格" required/>
                        <input value={image} onChange={(e) => setImage(e.target.value)} type="text" name="image" placeholder="画像" required/>
                        <textarea value={description} onChange={(e) => setDescription(e.target.value)} type="text" name="description" rows="15" placeholder="商品説明" required></textarea>
                        <button>作成</button>
                </form>
            </div>
        )
    } // else(!loginUser){...を書かなくても/user/loginページに飛ばされる。
      // そのワケはuseAuth.jsのuseEffect内のif(!token){router.push("/user/login")
      // が効いているから？
}
export default CreateItem
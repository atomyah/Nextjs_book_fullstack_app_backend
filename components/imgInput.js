import { useState } from "react";

const ImgInput = (props) => {
    const [imageFile, setImageFile] = useState("")

    const handleClick = async() => {
        try{
            const data = new FormData()
            data.append("file", imageFile)
            data.append("upload_preset", "atomyah")
            data.append("cloud_name", "atomyah")

            const response = await fetch("https://api.cloudinary.com/v1_1/atomyah/image/upload",
            {
                method: "POST",
                body: data
            })

            const jsonData = await response.json()
        /* Cloudinaryにアップした画像のURL部分だけを抜き出して
        　create.jsのステートフックsetImage()でステート変数imageに格納している.
          create.jsには、このimgInputコンポーネントは<ImgInput image={image} setImage={setImage} />
          という形で埋め込んである. 子から親へ値を受け渡す奇妙な例.↓
        */ 
            await props.setImage(jsonData.url)

            alert("画像アップロード成功")
        }catch(err){
            alert("画像アップロード失敗")
        }
    }

    return (
        <div className="img-input">
            <input type="file" onChange={(e) => setImageFile(e.target.files[0])} accept="image/png, image/jpg" />
            <button onClick={handleClick} disabled={!imageFile}>画像アップロード</button>
        </div>
    )
}

export default ImgInput
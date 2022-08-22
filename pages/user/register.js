import { useState } from "react"
import Head from "next/head"

const Register = () => {
  //分割代入
  const [newUser, setNewUser] = useState({
    name: "", 
    email: "",
    password: "",
  })
  /*
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  console.log('◆名前：' + name)
  console.log('◆メール：' + email)
  console.log('◆パスワード：' + password)
  */

  //分割代入用関数
  const handleChange = (e) => {
    setNewUser({
        ...newUser,
        [e.target.name]: e.target.value,
    })
    console.log('◆handleChangeの中でnewUser')
    console.log(newUser)
  }

  const handleSubmit = async(e) => {
    e.preventDefault()  
    try{
      const response = await fetch("http://localhost:3000/api/user/register",
        {
        method:"POST",
        headers:{
          "Accept": "application/json",
          "Content-type": "application/json"
        },
        //分割代入用body
        body: JSON.stringify(newUser)
        /*
        body: JSON.stringify({
               name: name,
               email: email,
               password: password,
              }),
        */

        })
        
      const jsonData = await response.json()
      console.log('◆jsonData：' + jsonData)
      alert(jsonData.message)
    }catch(err){
        alert("ユーザー登録失敗")
    }
  }

    return (
      <div>
        <Head><title>ユーザー登録</title></Head>
        <h1 className="page-title">ユーザー登録</h1>

        <form onSubmit={handleSubmit}>
          <input value={newUser.name} onChange={handleChange} 
              type="text" name="name" placeholder="名前" required />
          <input value={newUser.email} onChange={handleChange}
              type="text" name="email" placeholder="メールアドレス" required />
          <input value={newUser.password} onChange={handleChange}
              type="text" name="password" placeholder="パスワード" required />
          <button>登録</button>
        </form>
      </div>
    )
  }
  export default Register
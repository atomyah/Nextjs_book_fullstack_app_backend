import Link from "next/link"
import Image from "next/image"
import Head from "next/head"

const ReadAllItems = (props) => {
  return (
    <div>
        <Head><title>Next Market</title></Head>
        <div className="grid-container-in">
        {props.allItems.map(item => 
            <Link href={`/item/${item._id}`} key={item._id}>
              <a className="card">
                  <Image src={item.image} width="750px" height="500px" alt="item-image"/>
                  <div className="texts-area">
                      <h2>¥{item.price}</h2>
                      <h3>{item.title}</h3>
                      <p>{item.description.substring(0, 80)}...</p>
                  </div>
              </a>
            </Link>
        )}
        </div>
    </div>
  )
}

export default ReadAllItems


// handleSubmitのような機能をつくりその中でfetch()…でもいいけど、
// Nextにはデータ読み取りの専用機能getServerSideProps()が用意されている.
export const getServerSideProps = async() => {
  const response = await fetch("https://nextjs-book-fullstack-app-backend.vercel.app/api/item/readall") 
                      // fetch()のデフォルトはGETのため{method:"POST",headers:{}}のようなコードは要らない
  const allItems = await response.json() //responseデータをjson形式に変換.

  return{
    props: allItems 
}
}




/*
allItemsの中身
　↓
{
	"message": "アイテム読み取り成功（オール）",
	"allItems": [
		{
			"_id": "62fb2d47ff5ed1ed67b7b161",
			"title": "ユーザー判定テスト",
			"image": "http://res.cloudinary.com/atomyah/image/upload/v1661059691/h4wq14ssfjgjyqicf4ri.jpg",
			"price": "ユーザー判定テスト",
			"description": "ユーザー判定テスト",
			"email": "atom@yah.bz",
			"__v": 0
		},
		{
			"_id": "62fb2d7eff5ed1ed67b7b163",
			"title": "マックブック",
			"image": "http://res.cloudinary.com/atomyah/image/upload/v1661059691/h4wq14ssfjgjyqicf4ri.jpg",
			"price": "50000",
			"description": "使いやすいパソコンです。",
			"email": "atom@yah.bz",
			"__v": 0
		},
		{
			"_id": "62fb2db0ff5ed1ed67b7b165",
			"title": "マグカップ",
			"image": "http://res.cloudinary.com/atomyah/image/upload/v1661059718/yovhb9datzrbik71pq6s.jpg",
			"price": "3000",
			"description": "使いやすいマグカップです。",
			"email": "atom@yah.bz",
			"__v": 0
		},
		{
			"_id": "62fb2dd9ff5ed1ed67b7b167",
			"title": "コスメティック",
			"image": "http://res.cloudinary.com/atomyah/image/upload/v1661059737/kqfc0msenecgviwlm56k.jpg",
			"price": "6000",
			"description": "使いやすいコスメティックです。",
			"email": "atom@yah.bz",
			"__v": 0
		},
		{
			"_id": "62fb2e00ff5ed1ed67b7b169",
			"title": "置き物",
			"image": "http://res.cloudinary.com/atomyah/image/upload/v1661059757/jccqpg9hyovrsj9uqswa.jpg",
			"price": "1000",
			"description": "かわいい置き物です。",
			"email": "atom@yah.bz",
			"__v": 0
		},
		{
			"_id": "62fb2e25ff5ed1ed67b7b16b",
			"title": "アクセサリー",
			"image": "http://res.cloudinary.com/atomyah/image/upload/v1661059779/fj2gsdsklg6zpz5qxtto.jpg",
			"price": "9000",
			"description": "使いやすいアクセサリーです。",
			"email": "atom@yah.bz",
			"__v": 0
		}
	]
}

*/
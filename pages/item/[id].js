import Image from "next/image"
import Link from "next/link"
import Head from "next/head"

const ReadSingleItem = (props) => {
    //console.log('◆props:')
    //console.log(props)
    return(
        <div className="grid-container-si">
            <Head><title>{props.singleItem.title}</title></Head>
            <div>
                <Image src={props.singleItem.image} width="750px" height="500px" alt="item-image" />
            </div>
            <div>
                <h1>{props.singleItem.title}</h1>
                <h2>￥{props.singleItem.price}</h2>
                <hr />
                <p>{props.singleItem.description}</p>
                <div>
                <Link href={`/item/update/${props.singleItem._id}`}>
                    <a>
                        アイテム編集
                    </a>
                </Link>
                <Link href={`/item/delete/${props.singleItem._id}`}>
                    <a>
                        アイテム削除
                    </a>
                </Link>
                </div>
            </div>
        </div>
    )
}

export default ReadSingleItem

                                // contextは任意の名前で結構.
                                // contextの中にはreq, res, query(クエリパラメータ)が入ってる.
                                // 例：コンソール出力すると"query: { id: 'elsietshsllew'}"という感じ。
export const getServerSideProps = async(context) =>{
    const response = await fetch(`https://nextjs-book-fullstack-app-backend.vercel.app/api/item/${context.query.id}`)
    const singleItem = await response.json()
    // URLのスラグ部分（../api/item/○○○○の○○○○部分）は、
    // contextの中のqueryの中のidに入っている.index.jsで
    // <Link href={`/item/${item._id}`}>としたように、各アイテムの_id番号がスラグになっている.
    
    console.log("context =", context) 

    return{
      props: singleItem
    }
}
/* returnするsingleItemの中身は、
    {message: "アイテム読み取り成功（シングル）",
    singleItem: singleItem}
    singleItemはSavedItemDataType型(ItemDataTypeに_idを加えたもの)
*/
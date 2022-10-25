import { create } from "domain"
import { Types } from "mongoose"
import type { NextApiRequest } from "next"

// schemaModels.ts
export interface ItemDataType {
    title: String,
    image: String,
    price: String,
    description: String,
    email: String,
}
// schemaModels.ts
export interface UserDataType {
    name: string,
    email: string,
    password: string,
}

// auth.ts
export interface DecodedType {
    email: string
}
// auth.ts
export interface ExtendedNextApiRequestAuth extends NextApiRequest {
    headers: {
        authorization: string
    }
    body: {
        email: string
    }
}
// Common
export interface ResMessageType {
    message: string,
    token?: string 
            //?を付けないと、他のtsのreturn res.json({message: "ユーザー登録成功"…のコードで
            //'token'が無いよ！とエラーがでる.?を付けることでtokenは使っても使わなくても良い変数になる.

}

// register.ts, login.ts
export interface ExtendedNextApiRequestUser extends NextApiRequest {
    body: UserDataType
}

// login.ts
export interface SavedUserDataType extends UserDataType {
    _id: Types.ObjectId // MongoDBのusersデータの_idを見るとObujectId(…id番号…)となっている。
                        //故にstringではなくこのような書き方をする.
}

// readAll.ts, [id].ts, update/[id].ts, delete.ts 
    /* ItemDataTypeに_idを追加しただけ */
export interface SavedItemDataType extends ItemDataType {
    _id: Types.ObjectId
}

// readAll.ts
export interface ResReadAllType {
    message: string,
                // []が必要なのは↓、allItemsの値は[]で囲まれたJSONタイプだから
    allItems?: SavedItemDataType[]
}

// create.ts, update/[id].ts
export interface ExtendedNextApiRequestItem extends NextApiRequest {
    body: ItemDataType
}

// [id].ts
export interface ResReadSingleType {
    message: string,
    singleItem?: SavedItemDataType
}
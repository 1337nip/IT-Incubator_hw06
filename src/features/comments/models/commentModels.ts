import { ObjectId } from "mongodb"

export type commentDbModel = {
        _id?: ObjectId,
        id: string,
        postId:string,
        content: string,
        commentatorInfo: {
          userId: string,
          userLogin: string
        },
        createdAt: string
}

export type commentCreateModel = {

    id: string,
    postId:string,
    content: string,
    commentatorInfo: {
      userId: string,
      userLogin: string
    },
    createdAt: string
}


export type commentViewModel = {
    id: string,
    content: string,
    commentatorInfo: {
      userId: string,
      userLogin: string
    },
    createdAt: string 
}
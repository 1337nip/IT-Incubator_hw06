import express from "express";
import { Request,Response } from "express";
import { blogsRouter } from "./features/blogs/routes/blogRoutes";
import { postsRouter } from "./features/posts/routes/postRoutes";
import { SETTINGS } from "./settings";
import { eraseDB } from "./db/mongo-db";
import { userRouter } from "./features/users/routes/userRoutes";
import { authRouter } from "./features/auth/routes/authRoutes";

export const app = express()

app.use(express.json())

app.use(SETTINGS.PATH.BLOGS, blogsRouter)
app.use(SETTINGS.PATH.POSTS, postsRouter)
app.use(SETTINGS.PATH.USERS, userRouter)
app.use(SETTINGS.PATH.AUTH, authRouter)
app.delete('/testing/all-data', async (req:Request, res:Response) => {
    await eraseDB()
    res.sendStatus(204)
})

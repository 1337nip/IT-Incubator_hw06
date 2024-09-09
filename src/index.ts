import { app } from "./app";
import { SETTINGS } from "./settings";
import { connectToDb } from "./db/mongo-db";


const startApp = async () =>{
    const url = process.env.MONGO_URL
    if (!url) {
        throw new Error ('Mongo URL is not found')
    }
    await connectToDb(url)
    app.listen(SETTINGS.PORT, () => {
    console.log(`Server is running at localhost:${SETTINGS.PORT}`)
})
}

startApp();

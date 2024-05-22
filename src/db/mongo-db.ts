import {Collection, Db, MongoClient, ServerApiVersion} from 'mongodb'
import {SETTINGS} from "../settings"
import {BlogDBType} from "./db-types/blog-db-types"
import {PostDbType} from "./db-types/post-db-types"
import {UserDbType} from "./db-types/user-db-types";

export let client: MongoClient = {} as MongoClient
export let db: Db = {} as Db

export let blogCollection: Collection<BlogDBType> = {} as Collection<BlogDBType>
export let postCollection: Collection<PostDbType> = {} as Collection<PostDbType>
export let userCollection: Collection<UserDbType> = {} as Collection<UserDbType>

export const connectToDB = async (MONGO_URL: string) => {
    try {
        client = new MongoClient(MONGO_URL, {
            serverApi: {
                version: ServerApiVersion.v1,
                strict: true,
                deprecationErrors: true,
            }
        })

        db = client.db(SETTINGS.DB_NAME)

        blogCollection = db.collection(SETTINGS.BLOG_COLLECTION_NAME as string)
        postCollection = db.collection(SETTINGS.POST_COLLECTION_NAME as string)
        userCollection = db.collection(SETTINGS.USER_COLLECTION_NAME as string)

        await client.connect()
        // Send a ping to confirm a successful connection
        await client.db("admin").command({ping: 1})
        console.log("Pinged your deployment. You successfully connected to MongoDB!")

        return true
    } catch (err) {
        console.log(err)
        await client.close()
        return false
    }
}

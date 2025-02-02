import {db} from "../../../db/mongo-db"
//import {blogCollection, db} from "../../../db/mongo-db"
import {BlogDBType} from "../../../db/db-types/blog-db-types"
import {OutputBlogsPaginationType, OutputBlogType} from "../input-output-types/blog-types"
import {ObjectId} from "mongodb"
import {SanitizedBlogsQueryParamsType} from "../helpers/sanitizeBlogsQueryParams";

export const blogMongoQueryRepository = {
    async findAllForOutput(query: SanitizedBlogsQueryParamsType): Promise<OutputBlogsPaginationType> {
        const searchFilter = query.searchNameTerm
            ? { name : { $regex: query.searchNameTerm, $options: 'i' }}
            : {}

        const filter = {
            ...searchFilter
        }

        const blogs: BlogDBType[] = await db.getCollections().blogCollection
            .find(filter)
            .sort(query.sortBy, query.sortDirection)
            .skip((query.pageNumber - 1) * query.pageSize)
            .limit(query.pageSize)
            .toArray()

        const totalCount: number = await db.getCollections().blogCollection.countDocuments(filter)

        return {
            pagesCount: Math.ceil(totalCount / query.pageSize),
            page: query.pageNumber,
            pageSize: query.pageSize,
            totalCount,
            items: blogs.map((blog: BlogDBType) => this.mapToOutput(blog))
        }
    },
    async findForOutputById(id: string): Promise<{error?: string, blog?: OutputBlogType}> {
        const blog: BlogDBType | null = await db.getCollections().blogCollection.findOne({_id: new ObjectId(id)})
        if (!blog) {
            return {error: 'Post not found'}
        }
        return {blog: this.mapToOutput(blog)}
    },
    mapToOutput({_id, ...rest}: BlogDBType): OutputBlogType {
        return {
            ...rest,
            id: _id.toString()
        }
    }
}

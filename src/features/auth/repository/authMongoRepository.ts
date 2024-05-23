import {userCollection} from "../../../db/mongo-db";
import {UserDbType} from "../../../db/db-types/user-db-types";

export const authMongoRepository = {
    findUserByLoginOrEmail (loginOrEmail: string): Promise<UserDbType | null> {
        console.log(loginOrEmail)
        return userCollection.findOne({$or: [{login: loginOrEmail}, {email: loginOrEmail}]})
    }
}
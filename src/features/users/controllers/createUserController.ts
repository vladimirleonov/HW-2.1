import { Request, Response } from "express"
import {InputUserType, OutputUserType} from "../input-output-types/user-types";
import {userService} from "../services/userService";
import {userMongoQueryRepository} from "../repository/userMongoQueryRepository";
import {HTTP_CODES} from "../../../settings";
import {ErrorsMessagesType} from "../../../common/helpers/generateErrorMessages";

export const createUserController = async (req: Request<{}, OutputUserType| ErrorsMessagesType, InputUserType>, res: Response<OutputUserType | ErrorsMessagesType>) => {
    try {
        const createdInfo = await userService.createUser(req.body)
        if (createdInfo.error) {
            res.status(HTTP_CODES.BAD_REQUEST).send(createdInfo.error)
            return
        }

        //? !
        const foundInfo = await userMongoQueryRepository.findForOutputById(createdInfo.id!)

        res.status(HTTP_CODES.CREATED).send(foundInfo.user)
    } catch (err) {
        console.error(err)
        res.status(HTTP_CODES.INTERNAL_SERVER_ERROR).send()
    }
}
import {Router} from "express"
import {getPostsController} from "./controllers/getPostsController"
import {createPostController} from "./controllers/createPostController"
import {findPostController} from "./controllers/findPostController"
import {deletePostController} from "./controllers/deletePostController"
import {updatePostController} from "./controllers/updatePostController"
import {postInputValidator} from "./validators/postBodyValidators"
import {inputCheckErrorsMiddleware} from "../../common/middlewares/inputCheckErrorsMiddleware"
import {authMiddleware} from "../../common/middlewares/authMiddleware"
import {idParamValidator} from "../../common/validators/idParamValidator";
import {queryPostsParamsValidator} from "./validators/queryPostsParamsValidator";

export const postsRouter = Router()

postsRouter.get('/', queryPostsParamsValidator, inputCheckErrorsMiddleware, getPostsController)
postsRouter.post('/', postInputValidator, authMiddleware, inputCheckErrorsMiddleware, createPostController)
postsRouter.get('/:id', idParamValidator, inputCheckErrorsMiddleware, findPostController)
postsRouter.put('/:id', idParamValidator, postInputValidator, authMiddleware, inputCheckErrorsMiddleware, updatePostController)
postsRouter.delete('/:id', idParamValidator, authMiddleware, inputCheckErrorsMiddleware, deletePostController)
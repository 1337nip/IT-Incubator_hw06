import { Router } from "express";
import { userControllers } from "../controllers/userControllers";
import { requestAuthorization } from "../../../middlewares/authorizationMdw";
import { userInputValidator } from "../middlewares/userInputValidator";
import { returnValidationErrors } from "../../../middlewares/returnValidationMessages";

export const userRouter = Router()

userRouter.post('/', requestAuthorization, userInputValidator, returnValidationErrors ,userControllers.createUser)
userRouter.get('/', userControllers.getUsers)
userRouter.delete('/:id', requestAuthorization, userControllers.deleteUser)
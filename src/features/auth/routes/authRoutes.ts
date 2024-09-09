import { Router } from "express"
import { authControllers } from "../controllers/authControllers"
import { loginInputValidator } from "../middlewares/loginInputValidator"
import { returnValidationErrors } from "../../../middlewares/returnValidationMessages"

export const authRouter = Router()

authRouter.post('/login', loginInputValidator, returnValidationErrors, authControllers.authLogin)
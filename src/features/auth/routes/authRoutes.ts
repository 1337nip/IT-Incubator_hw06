import { Router } from "express"
import { authControllers } from "../controllers/authControllers"
import { loginInputValidator } from "../middlewares/loginInputValidator"
import { returnValidationErrors } from "../../../middlewares/returnValidationMessages"
import { authJWTmiddleware } from "../../../middlewares/authJWTmiddleware"

export const authRouter = Router()

authRouter.post('/login', loginInputValidator, returnValidationErrors, authControllers.authLogin),
authRouter.get('/me', authJWTmiddleware ,authControllers.authMe)
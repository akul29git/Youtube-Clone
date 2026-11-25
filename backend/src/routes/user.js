import { Router } from 'express'
import { reqisterUser,loginUser,logoutUser,renewAccessToken } from '../controllers/user.js'
import {  upload } from '../middleware/multer.js'
import { verifyUser } from '../middleware/auth.js'
import { loginLimiter } from '../middleware/security.js'

const userRouter = Router()

userRouter.route("/register").post(
    upload.fields([
        { name: 'avatar', maxCount: 1 },
        { name: 'coverimage'}
    ])
    ,reqisterUser
)

userRouter.route("/login").post(loginLimiter,loginUser)

userRouter.route("/logout").post(verifyUser,logoutUser)

userRouter.route("/renew-access-token").post(renewAccessToken)

export default userRouter
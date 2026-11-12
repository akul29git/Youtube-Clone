import { Router } from 'express'
import { reqisterUser,loginUser,logoutUser } from '../controllers/user.js'
import {  upload } from '../middleware/multer.js'
import { verifyUser } from '../middleware/auth.js'

const userRouter = Router()

userRouter.route("/register").post(
    upload.fields([
        { name: 'avatar', maxCount: 1 },
        { name: 'coverimage'}
    ])
    ,reqisterUser
)

userRouter.route("/login").post(loginUser)

userRouter.route("/logout").post(verifyUser,logoutUser)


export default userRouter
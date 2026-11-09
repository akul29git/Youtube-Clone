import { Router } from 'express'
import { reqisterUser } from '../controllers/user.js'
import {  upload } from '../middleware/multer.js'

const userRouter = Router()

userRouter.route("/register").post(
    upload.fields([
        { name: 'avatar', maxCount: 1 },
        { name: 'coverimage', maxCount: 1 }
    ])
    ,reqisterUser)

export default userRouter
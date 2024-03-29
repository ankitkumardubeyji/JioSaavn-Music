import {Router} from "express"
import { registerUser } from "../controllers/user.controller.js"
const router = Router()
import {upload} from "../middleware/multer.middleware.js"

// console.log(registerUser) // was throwing error as the registeredUser was not being properly returned by asynchandler


// this router acts as the middleware
router.route("/register").post(
    upload.fields([ // cant use here upload.array as the array will take in the same field multiple files.fields here expects the array
        {
            name:"avatar", // frontend field name should also be avatar.
            maxCount:1
        },
        {
            name:"coverImage",
            maxCount:1
        },
    ]),
    registerUser)

    export default router;
import {Router} from "express"
import { getListenHistory, getUserArtistProfile, logOut, loginUser, registerUser } from "../controllers/user.controller.js"
const router = Router()
import {upload} from "../middleware/multer.middleware.js"
import { verifyJWT } from "../middleware/auth.middleware.js"

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

 
router.route("/login").post(
    loginUser
)

router.route("/logout").post(verifyJWT,logOut)

router.route("/a/:username").get(verifyJWT,getUserArtistProfile);

router.route("/history").get(verifyJWT,getListenHistory)

export default router;

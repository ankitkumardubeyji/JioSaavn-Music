import { Router } from "express";
import { artistFollowing, toggleFollowing } from "../controllers/following.controller.js";
import { verifyJWT } from "../middleware/auth.middleware.js";

const router = Router()

router.use(verifyJWT)
router.route("/toggle/:username").post(toggleFollowing)
router.route("/fa").post(artistFollowing)

export default router;

import { Router } from 'express';
import { upload } from "../middleware/multer.middleware.js";
import {
    addSongToPlaylist,
    createPlaylist,
    deletePlaylist,
    getPlaylistById,
    getSongsInPlaylist,
    getUserPlaylists,
    removeSongFromPlaylist,
} from "../controllers/playlist.controller.js"
import { verifyJWT } from '../middleware/auth.middleware.js';

const router = Router();

router.use(verifyJWT); // Apply verifyJWT middleware to all routes in this file

router.route("/").post( upload.fields([
    {
        name: "thumbnail",
        maxCount: 1,
    },
    
]),createPlaylist)

router
    .route("/:playlistId")
    .get(getPlaylistById)
    .delete(deletePlaylist);

router.route("/add/:songId/:playlistId").patch(addSongToPlaylist);
router.route("/remove/:songId/:playlistId").patch(removeSongFromPlaylist);
router.route("/get/:playlistId").get(getSongsInPlaylist)

router.route("/user/p/get").get(getUserPlaylists);
export default router


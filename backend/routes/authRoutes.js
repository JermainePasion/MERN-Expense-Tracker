const express = require("express");
const {protect} = require("../middleware/authMiddleware")
const upload = require("../middleware/uploadMiddleware");
const { uploadImage } = require("../controllers/imageController");

const {
    registerUser,
    loginUser,
    getUserInfo,
} = require("../controllers/authController");

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/getUser", protect, getUserInfo);

router.post("/upload-image", upload.single("image"), uploadImage);

module.exports = router;
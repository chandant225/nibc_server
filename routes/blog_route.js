const express = require("express");
const {
  Upload_Blog,
  Edit_Blog,
  Blog_Index,
  Single_Blog,
  Update_blog,
  Delete_blog,
  Get_cat_blogs,
} = require("../controllers/blog_controller");
const { authenticate } = require("../middlewares/verifytoken");
const router = express.Router();
const { upload } = require("../middlewares/file_helper");
router.post("/add-blog", authenticate, upload.single("image"), Upload_Blog);
router.get("/edit-blog/:id", authenticate, Edit_Blog);
router.post(
  "/edit-blog/:id",
  authenticate,
  upload.single("image"),
  Update_blog
);
router.get("/", Blog_Index);
router.get("/:id", Single_Blog);
router.post("/delete/:id", Delete_blog);
router.get("/get_category/:id", Get_cat_blogs);

module.exports = router;

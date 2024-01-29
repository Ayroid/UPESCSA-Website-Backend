import express from "express";
import { UPLOAD } from "../middlewares/multer.js";

import {
  CREATEBLOG,
  UPDATEBLOG,
  READBLOG,
  DELETEBLOG,
} from "../controllers/blogController.js";

const BlogRouter = express.Router();

BlogRouter.route("/")
  .get(READBLOG)
  .post(UPLOAD.fields([{ name: "blogImg", maxCount: 1 }]), CREATEBLOG)
  .put(UPDATEBLOG)
  .delete(DELETEBLOG);

export { BlogRouter as BLOGROUTER };

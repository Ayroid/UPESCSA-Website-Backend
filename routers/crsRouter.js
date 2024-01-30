import express from "express";
import { UPLOAD } from "../middlewares/multer.js";

import {
  CREATECRS,
  UPDATECRS,
  GETCRS,
  DELETECRS,
} from "../controllers/CRSController.js";

const CRSRouter = express.Router();

CRSRouter.route("/")
  .get(GETCRS)
  .post(UPLOAD.fields([{ name: "crsImg", maxCount: 1 }]), CREATECRS)
  .put(UPDATECRS)
  .delete(DELETECRS);

export { CRSRouter as CRSROUTER };

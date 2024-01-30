import express from "express";
import { UPLOAD } from "../middlewares/multer.js";

import {
  CREATECSR,
  UPDATECSR,
  GETCSR,
  DELETECSR,
} from "../controllers/CSRController.js";

const CSRRouter = express.Router();

CSRRouter.route("/")
  .get(GETCSR)
  .post(UPLOAD.fields([{ name: "csrImg", maxCount: 1 }]), CREATECSR)
  .put(UPDATECSR)
  .delete(DELETECSR);

export { CSRRouter as CSRROUTER };

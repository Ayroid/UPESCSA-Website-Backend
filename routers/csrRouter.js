import express from "express";
import { UPLOAD } from "../middlewares/multer.js";

import {
  CREATECSR,
  UPDATECSR,
  READCSR,
  DELETECSR,
} from "../controllers/csrController.js";

const CSRRouter = express.Router();

CSRRouter.route("/")
  .get(READCSR)
  .post(UPLOAD.fields([{ name: "csrImg", maxCount: 1 }]), CREATECSR)
  .put(UPDATECSR)
  .delete(DELETECSR);

export { CSRRouter as CSRROUTER };

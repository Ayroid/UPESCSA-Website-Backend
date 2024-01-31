import express from "express";
import { UPLOAD } from "../middlewares/multer.js";

import {
  CREATECOMMITTEE,
  UPDATECOMMITTEE,
  READCOMMITTEE,
  DELETECOMMITTEE,
} from "../controllers/committeeController.js";

const CommitteeRouter = express.Router();

CommitteeRouter.route("/")
  .get(READCOMMITTEE)
  .post(UPLOAD.fields([{ name: "committeeImg", maxCount: 1 }]), CREATECOMMITTEE)
  .put(UPDATECOMMITTEE)
  .delete(DELETECOMMITTEE);

export { CommitteeRouter as COMMITTEEROUTER };

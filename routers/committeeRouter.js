import express from "express";
import { UPLOAD } from "../middlewares/multer.js";

import {
  CREATECOMMITTEE,
  UPDATECOMMITTEE,
  READCOMMITTEE,
  DELETECOMMITTEE,
  READALLCOMMITTEES,
} from "../controllers/committeeController.js";

const CommitteeRouter = express.Router();

CommitteeRouter.route("/")
  .get(READALLCOMMITTEES)
  .post(UPLOAD.fields([{ name: "committeeImg", maxCount: 1 }]), CREATECOMMITTEE)
  .put(UPDATECOMMITTEE)
  .delete(DELETECOMMITTEE);

CommitteeRouter.route("/name").get(READCOMMITTEE);

export { CommitteeRouter as COMMITTEEROUTER };

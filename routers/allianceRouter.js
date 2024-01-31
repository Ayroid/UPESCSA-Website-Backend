import express from "express";
import { UPLOAD } from "../middlewares/multer.js";

import {
  CREATEALLIANCE,
  UPDATEALLIANCE,
  READALLIANCE,
  DELETEALLIANCE,
} from "../controllers/allianceController.js";

const AllianceRouter = express.Router();

AllianceRouter.route("/")
  .get(READALLIANCE)
  .post(UPLOAD.fields([{ name: "allianceImg", maxCount: 1 }]), CREATEALLIANCE)
  .put(UPDATEALLIANCE)
  .delete(DELETEALLIANCE);

export { AllianceRouter as ALLIANCEROUTER };

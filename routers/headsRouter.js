import express from "express";
import { UPLOAD } from "../middlewares/multer.js";

import {
  CREATEHEADS,
  UPDATEHEADS,
  READHEADS,
  DELETEHEADS,
} from "../controllers/headsController.js";

const headsRouter = express.Router();

headsRouter
  .route("/")
  .get(READHEADS)
  .post(UPLOAD.fields([{ name: "headImg", maxCount: 1 }]), CREATEHEADS)
  .put(UPDATEHEADS)
  .delete(DELETEHEADS);

export { headsRouter as HEADSROUTER };

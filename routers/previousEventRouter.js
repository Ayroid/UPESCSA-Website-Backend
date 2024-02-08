import express from "express";
import { UPLOAD } from "../middlewares/multer.js";

import {
  CREATEPREVIOUSEVENT,
  UPDATEPREVIOUSEVENT,
  READPREVIOUSEVENT,
  DELETEPREVIOUSEVENT,
} from "../controllers/previousEventController.js";

const previousEventRouter = express.Router();

previousEventRouter
  .route("/")
  .get(READPREVIOUSEVENT)
  .post(
    UPLOAD.fields([{ name: "previousEventImg", maxCount: 1 }]),
    CREATEPREVIOUSEVENT
  )
  .put(UPDATEPREVIOUSEVENT)
  .delete(DELETEPREVIOUSEVENT);

export { previousEventRouter as PREVIOUSEVENTROUTER };

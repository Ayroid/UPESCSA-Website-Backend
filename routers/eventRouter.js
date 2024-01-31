import express from "express";
import { UPLOAD } from "../middlewares/multer.js";

import {
  CREATEEVENT,
  UPDATEEVENT,
  READEVENT,
  DELETEEVENT,
} from "../controllers/eventsController.js";

const EventRouter = express.Router();

EventRouter.route("/")
  .get(READEVENT)
  .post(UPLOAD.fields([{ name: "eventImg", maxCount: 1 }]), CREATEEVENT)
  .put(UPDATEEVENT)
  .delete(DELETEEVENT);

export { EventRouter as EVENTROUTER };

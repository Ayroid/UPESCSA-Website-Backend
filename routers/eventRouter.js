import express from "express";
import { UPLOAD } from "../middlewares/multer.js";

import {
  CREATEEVENT,
  UPDATEEVENT,
  GETEVENT,
  DELETEEVENT,
} from "../controllers/EventsController.js";

const EventRouter = express.Router();

EventRouter.route("/")
  .get(GETEVENT)
  .post(UPLOAD.fields([{ name: "eventImg", maxCount: 5 }]), CREATEEVENT)
  .put(UPDATEEVENT)
  .delete(DELETEEVENT);

export { EventRouter as EVENTROUTER };

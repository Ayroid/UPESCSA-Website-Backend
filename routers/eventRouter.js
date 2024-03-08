import express from "express";
import { UPLOAD } from "../middlewares/multer.js";

import {
  CREATEEVENT,
  UPDATEEVENT,
  READEVENT,
  DELETEEVENT,
} from "../controllers/eventsController.js";

import {
  CREATEHACKERSUMMIT,
  READHACKERSUMMIT,
} from "../controllers/eventRegistrationControllers/hackerSummitController.js";

import {
  CREATEFRENZYPITCH,
  READFRENZYPITCH,
} from "../controllers/eventRegistrationControllers/frenzyPitchController.js";

const EventRouter = express.Router();

EventRouter.route("/")
  .get(READEVENT)
  .post(UPLOAD.fields([{ name: "eventImg", maxCount: 1 }]), CREATEEVENT)
  .put(UPDATEEVENT)
  .delete(DELETEEVENT);

EventRouter.route("/register/frenzypitch")
  .get(READFRENZYPITCH)
  .post(
    UPLOAD.fields([{ name: "frenzyPitchTransactionSS", maxCount: 1 }]),
    CREATEFRENZYPITCH
  );

EventRouter.route("/register/hackersummit")
  .get(READHACKERSUMMIT)
  .post(CREATEHACKERSUMMIT);

export { EventRouter as EVENTROUTER };

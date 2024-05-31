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

import {
  CREATEULTIMATESHOWDOWN,
  READULTIMATESHOWDOWN,
} from "../controllers/eventRegistrationControllers/ultimateShowdownController.js";

import {
  CREATEVIRTUALESCAPEROOM,
  READVIRTUALESCAPEROOM,
} from "../controllers/eventRegistrationControllers/virtualEscapeController.js";

// import {
//   CREATEHACKATHON,
//   READHACKATHON,
// } from "../controllers/eventRegistrationControllers/hackathonController.js";

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

EventRouter.route("/register/virtualescaperoom")
  .get(READVIRTUALESCAPEROOM)
  .post(
    UPLOAD.fields([{ name: "virtualEscapeTransactionSS", maxCount: 1 }]),
    CREATEVIRTUALESCAPEROOM
  );

EventRouter.route("/register/ultimateshowdown")
  .get(READULTIMATESHOWDOWN)
  .post(
    UPLOAD.fields([{ name: "ultimateShowdownTransactionSS", maxCount: 1 }]),
    CREATEULTIMATESHOWDOWN
  );

EventRouter.route("/register/hackersummit")
  .get(READHACKERSUMMIT)
  .post(CREATEHACKERSUMMIT);

// EventRouter.route("/hackathon/register")
//   .get(READHACKATHON)
//   .post(
//     UPLOAD.fields([{ name: "hackathonTransactionSS", maxCount: 1 }]),
//     CREATEHACKATHON
//   );

export { EventRouter as EVENTROUTER };

import express from "express";

import { UPDATEPS, READPS } from "../controllers/hackathonController.js";

const HackathonRouter = express.Router();

HackathonRouter.route("/").get(READPS).put(UPDATEPS);

HackathonRouter.route("/:id").get(READPS).put(UPDATEPS);

export { HackathonRouter as HACKATHONPSROUTER };

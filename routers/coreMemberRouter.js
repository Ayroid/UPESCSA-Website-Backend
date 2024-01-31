import express from "express";

import {
  CREATECOREMEMBER,
  UPDATECOREMEMBER,
  READCOREMEMBER,
  DELETECOREMEMBER,
} from "../controllers/coreMemberController.js";

const CoreMemberRouter = express.Router();

CoreMemberRouter.route("/")
  .get(READCOREMEMBER)
  .post(CREATECOREMEMBER)
  .put(UPDATECOREMEMBER)
  .delete(DELETECOREMEMBER);

export { CoreMemberRouter as COREMEMBERROUTER };

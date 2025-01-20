import express from "express";
import userRouter from "./user/controller.js";
import missionRouter from "./mission/controller.js";

const router = express.Router();

router.use("/user", userRouter);
router.use("/mission", missionRouter);

export default router;

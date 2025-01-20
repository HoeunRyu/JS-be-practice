import express from "express";
import service from "./service.js";

const router = express.Router();

router.get("/list", service.getMission);
router.get("/list/:id", service.getMissionById);
router.post("/", service.createMission);
router.patch("/complete/:id", service.updateMissionComplete);
router.patch("/update-content/:id", service.updateMissionContent);
router.delete("/delete/:id", service.deleteMission);

export default router;

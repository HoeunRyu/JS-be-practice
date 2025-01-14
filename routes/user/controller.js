import express from "express";
import service from "./service.js";

const router = express.Router();

//TODO: 만든 서비스들 다 추가해주기
router.get("/", service.getUser);

export default router;

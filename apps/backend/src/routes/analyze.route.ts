import { Router } from "express";
import AnalyzeController from "../controllers/analyze.controller";

const router = Router();

router.post("/analyze", AnalyzeController.analyze);

export default router;
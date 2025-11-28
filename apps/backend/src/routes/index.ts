import { Router } from "express";
import analyzeRoute from "./analyze.route";

const router = Router();

router.use("/", analyzeRoute);

export default router;
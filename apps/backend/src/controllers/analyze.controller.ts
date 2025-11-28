import { Request, Response } from "express";
import { analyzeUrl } from "../services/analyze.service";

export class AnalyzeController {
    async analyze(req: Request, res: Response) {
        try {
            const { url } = req.body;
    
            if (!url) {
                return res.status(400).json({ error: "URL is required" });
            }
            const analysisResult = await analyzeUrl(url);
            res.status(200).json(analysisResult);
        } catch (error) {
            res.status(500).json({ error: "Internal server error" });
        }
    }
}

export default new AnalyzeController();
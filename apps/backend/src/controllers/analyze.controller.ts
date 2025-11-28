import { Request, Response } from "express";
import { analyzeUrl, createAnalysisResult } from "../services/analyze.service";

export class AnalyzeController {
    async analyze(req: Request, res: Response) {
        try {
            const { url } = req.body;
    
            if (!url) {
                return res.status(400).json({ error: "URL is required" });
            }

            const analysisResult = await analyzeUrl(url);

            if (!analysisResult) {
                return res.status(400).json({ error: "Failed to analyze URL" });
            }

            const createdAnalysisResult = await createAnalysisResult(url,analysisResult);
            res.status(200).json(createdAnalysisResult);
        } catch (error) {
            res.status(500).json({ error: "Internal server error" });
        }
    }
}

export default new AnalyzeController();
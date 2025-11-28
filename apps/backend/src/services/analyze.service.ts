import axios from "axios";
import { AnalysisResult, IAnalysisResult } from "../models/AnalysisResult";

export async function analyzeUrl(url: string) {
    const response = await axios.get(url);
    return response.data;
}

export async function createAnalysisResult(analysisResult: IAnalysisResult) {
    const newAnalysisResult = new AnalysisResult(analysisResult);
    await newAnalysisResult.save();
    return newAnalysisResult;
}
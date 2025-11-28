import axios from "axios";
import * as cheerio from "cheerio";
import { AnalysisResult, IAnalysisResult } from "../models/AnalysisResult";

export interface AnalysisResultData {
    hasTitle: boolean;
    imgTotal: number;
    imgMissingAlt: number;
    inputsWithoutLabel: number;
}

export async function analyzeUrl(url: string): Promise<AnalysisResultData> {
    const response = await axios.get(url);
    const $ = cheerio.load(response.data);

    const hasTitle = analyzeTitle($("title").text().trim()) ?? false;
    const { imgTotal, imgMissingAlt } = analyzeImg($, $("img")) ?? { imgTotal: 0, imgMissingAlt: 0 };
    const { inputsWithoutLabel } = analyzeInputs($, $("input")) ?? { inputsWithoutLabel: 0 };

    return {
        hasTitle,
        imgTotal,
        imgMissingAlt,
        inputsWithoutLabel,
    };
}

function analyzeTitle(title: string): boolean {
    const hasTitle = title.length > 0;
    return hasTitle;
}

function analyzeImg($: cheerio.CheerioAPI, imgTags: cheerio.Cheerio<any>): { imgTotal: number, imgMissingAlt: number } {
    const imgTotal = imgTags.length;
    const imgMissingAlt = imgTags.filter((_, el) => {
        const alt = $(el).attr("alt");
        return !alt || alt.trim() === "";
    }).length;
    return { imgTotal, imgMissingAlt };
}

function analyzeInputs($: cheerio.CheerioAPI, inputs: cheerio.Cheerio<any>): { inputsWithoutLabel: number } {
    const labels = $("label");
    const inputsWithoutLabel = inputs.filter((_, input) => {
        const id = $(input).attr("id");
        if (!id) return true;
        const hasLabel = labels.filter((_, label) => $(label).attr("for") === id).length > 0;
        return !hasLabel;
    }).length;
    return { inputsWithoutLabel };
}

export async function createAnalysisResult(url: string, analysisResult: AnalysisResultData): Promise<IAnalysisResult> {
    const newAnalysisResult = new AnalysisResult({ url, ...analysisResult });
    await newAnalysisResult.save();
    return newAnalysisResult;
}
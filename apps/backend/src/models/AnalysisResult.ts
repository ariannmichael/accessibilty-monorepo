import { Schema, model } from "mongoose";

export interface IAnalysisResult extends Document {
    url: string;
    hasTitle: boolean;
    imgTotal: number;
    imgMissingAlt: number;
    inputsWithoutLabel: number;
    createdAt: Date;
}

const analysisResultSchema = new Schema<IAnalysisResult>({
    url: { type: String, required: true },
    hasTitle: { type: Boolean, required: true },
    imgTotal: { type: Number, required: true },
    imgMissingAlt: { type: Number, required: true },
    inputsWithoutLabel: { type: Number, required: true },
    createdAt: { type: Date, default: Date.now },
});

export const AnalysisResult = model<IAnalysisResult>("AnalysisResult", analysisResultSchema);
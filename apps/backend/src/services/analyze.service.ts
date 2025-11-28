import axios from "axios";

export async function analyzeUrl(url: string) {
    const response = await axios.get(url);
    return response.data;
}
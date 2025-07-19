
import { GoogleGenAI, GenerateContentResponse } from "@google/genai";

const API_KEY = process.env.API_KEY;

if (!API_KEY) {
    console.warn("Gemini API key not found. Please set the API_KEY environment variable.");
}

const ai = new GoogleGenAI({ apiKey: API_KEY! });

export const callGemini = async (prompt: string): Promise<string> => {
    if (!API_KEY) {
        return "Lỗi: API Key không được cấu hình. Vui lòng liên hệ quản trị viên.";
    }

    try {
        const response: GenerateContentResponse = await ai.models.generateContent({
            model: 'gemini-2.5-flash-preview-04-17',
            contents: prompt,
        });
        
        return response.text;

    } catch (error: unknown) {
        console.error('Error calling Gemini API:', error);
        if (error instanceof Error) {
            return `Đã xảy ra lỗi khi gọi AI: ${error.message}. Vui lòng thử lại.`;
        }
        return `Đã xảy ra lỗi không xác định.`;
    }
};
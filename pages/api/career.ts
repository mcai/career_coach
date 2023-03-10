import { NextApiRequest, NextApiResponse } from "next";
import { openAiRequest } from "../../utils/openai"

// Generate a prompt for OpenAI's GPT-3
function generatePrompt(input: {
    language: string,
}) {
    let prompt = `Generate a random career name.`;
    prompt += `The output should be written using the ${input.language} language.`;

    return prompt;
}

// Parse the result from OpenAI's GPT-3
function parseResult(result: string | undefined) {
    let career: string = result || "";

    // trim the result
    career = career.trim();

    return {
        career: career,
    };
}

// POST /api/career
export default async (req: NextApiRequest, res: NextApiResponse) => {
    return openAiRequest(req, res, generatePrompt, parseResult);
}
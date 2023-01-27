import { NextApiRequest, NextApiResponse } from "next";
import { CoachResume } from "../../models/resume";
import { openAiRequest } from "../../utils/openai"

// Generate a prompt for OpenAI's GPT-3
function generatePrompt(input: {
    resume: CoachResume,
}) {
    let prompt = `You are required to generate a JSON string of resume matching a random career (name:string, phoneNumber:string, email:string, address:string, experience:string[], skills:string[]). Surround keys with a pair of commas.`;
    prompt += `input:${JSON.stringify(input)}, output:`;

    return prompt;
}

// Parse the result from OpenAI's GPT-3
function parseResult(result: string | undefined) {
    const resume: CoachResume = JSON.parse(result || "{}");
    return {
        resume: resume,
    };
}

// POST /api/resume
export default async (req: NextApiRequest, res: NextApiResponse) => {
    return openAiRequest(req, res, generatePrompt, parseResult);
};
import { NextApiRequest, NextApiResponse } from "next";
import { CoachResume } from "../../models/resume";
import { openAiRequest } from "../../utils/openai"

// Generate a prompt for OpenAI's GPT-3
function generatePrompt(input: {
    language: string,
    career: string,
}) {
    let prompt = `You are required to generate a JSON string of resume matching a ${input.career} following the format: {"name":string, "phoneNumber":string, "email":string, "address":string, "linkedIn":string, "education":string[], "workExperience":string[], "skills":string[]}. Surround keys with a pair of commas.`
    prompt += `The output fields should be filled using the ${input.language} language.`;

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
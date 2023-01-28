import { NextApiRequest, NextApiResponse } from "next";
import { CoachResume } from "../../models/resume";
import { CoachJob } from "../../models/job";
import { openAiRequest } from "../../utils/openai"

// Generate a prompt for OpenAI's GPT-3
function generatePrompt(input: {
    resume: CoachResume,
}) {
    let prompt = `I'll give you a JSON string describing my resume.`;
    prompt += `You are required to generate a JSON string of next job position that both follows my potential career path and aligns with my resume following the format: {"title":string, "company":string, "location":string, "hiringManager":string, "description":string, "responsibility":string[], "qualifications":string[], "salary":number, "type":string}. Surround keys with a pair of commas.`;
    prompt += `input:${JSON.stringify(input)}, output:`;

    return prompt;
}

// Parse the result from OpenAI's GPT-3
function parseResult(result: string | undefined) {
    const job: CoachJob = JSON.parse(result || "{}");
    return {
        job: job,
    };
}

// POST /api/job
export default async (req: NextApiRequest, res: NextApiResponse) => {
    return openAiRequest(req, res, generatePrompt, parseResult);
};
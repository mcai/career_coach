import { NextApiRequest, NextApiResponse } from "next";
import { CoachProfile } from "../../models/profile";
import { CoachJob } from "../../models/job";
import { CoachCoverLetter } from "../../models/cover_letter";
import { openAiRequest } from "../../utils/openai"

// Generate a prompt for OpenAI's GPT-3
function generatePrompt(input: {
    profile: CoachProfile,
    job: CoachJob,
}) {
    let prompt = `I'll give you a JSON string describing my personal profile and a JSON string describing a job position.`;
    prompt += `You are required to generate a JSON string of a cover letter that both follows my potential career path and aligns with my profile and the job position (name:string, content:string). Surround keys with a pair of commas.`;
    prompt += `input:${JSON.stringify(input)}, output:`;

    return prompt;
}

// Parse the result from OpenAI's GPT-3
function parseResult(result: string | undefined) {
    const resume: CoachCoverLetter = JSON.parse(result || "{}");
    return resume;
}

// POST /api/resume
export default async (req: NextApiRequest, res: NextApiResponse) => {
    return openAiRequest(req, res, generatePrompt, parseResult);
}
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
    let prompt = `I'll give you JSON strings describing my personal profile, a job position and detailed resume.`;
    prompt += `You are required to generate a JSON string of a cover letter that both follows my potential career path and aligns with my profile, the job position and the detailed resume (name:string, content:string). Surround keys with a pair of commas.`;
    prompt += `input:${JSON.stringify(input)}, output:`;

    return prompt;
}

// Parse the result from OpenAI's GPT-3
function parseResult(result: string | undefined) {
    const coverLetter: CoachCoverLetter = JSON.parse(result || "{}");
    return {
        coverLetter: coverLetter,
    };
}

// POST /api/cover_letter
export default async (req: NextApiRequest, res: NextApiResponse) => {
    return openAiRequest(req, res, generatePrompt, parseResult);
}
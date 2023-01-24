import { NextApiRequest, NextApiResponse } from "next";
import { CoachProfile } from "../../models/profile";
import { CoachJob } from "../../models/job";
import { CoachResume } from "../../models/resume";
import { openAiRequest } from "../../utils/openai"

// Generate a prompt for OpenAI's GPT-3
function generatePrompt(input: {
    profile: CoachProfile,
    job: CoachJob,
}) {
    let prompt = `I'll give you a JSON string describing my personal profile and a JSON string describing a job position.`;
    prompt += `You are required to generate a JSON string of a resume that both follows my potential career path and aligns with my profile and the job position (name:string, email:string, phone:string, address:string, education:string[], experience:string[], skills:string[], projects:string[], awards:string[], certifications:string[], languages:string[], interests:string[], references:string[]). Surround keys with a pair of commas.`;
    prompt += `input:${JSON.stringify(input)}, output:`;

    return prompt;
}

// Parse the result from OpenAI's GPT-3
function parseResult(result: string | undefined) {
    const resume: CoachResume = JSON.parse(result || "{}");
    return resume;
}

// POST /api/resume
export default async (req: NextApiRequest, res: NextApiResponse) => {
    return openAiRequest(req, res, generatePrompt, parseResult);
}
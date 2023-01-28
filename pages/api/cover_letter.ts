import { NextApiRequest, NextApiResponse } from "next";
import { CoachResume } from "../../models/resume";
import { CoachJob } from "../../models/job";
import { openAiRequest } from "../../utils/openai"

// Generate a prompt for OpenAI's GPT-3
function generatePrompt(input: {
    resume: CoachResume,
    job: CoachJob,
    language: string,
}) {
    let prompt = `I'll give you JSON strings describing my personal resume and a job position.`;
    prompt += `You are required to generate a string of a cover letter that both follows my potential career path and aligns with my resume and the job position.`;
    prompt += `The output should be written using the ${input.language} language.`;
    prompt += `input:${JSON.stringify(input)}, output:`;

    return prompt;
}

// Parse the result from OpenAI's GPT-3
function parseResult(result: string | undefined) {
    let coverLetter: string = result || "";

    // trim the result
    coverLetter = coverLetter.trim();

    return {
        coverLetter: coverLetter,
    };
}

// POST /api/cover_letter
export default async (req: NextApiRequest, res: NextApiResponse) => {
    return openAiRequest(req, res, generatePrompt, parseResult);
}
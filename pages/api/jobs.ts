import { NextApiRequest, NextApiResponse } from "next";
import { CoachResume } from "../../models/resume";
import { CoachJob } from "../../models/job";
import { openAiRequest } from "../../utils/openai"

// Generate a prompt for OpenAI's GPT-3
function generatePrompt(input: {
    resume: CoachResume,
}) {
    let prompt = `I'll give you a JSON string describing my personal resume.`;
    prompt += `You are required to generate a JSON array of next job positions that both follows my potential career path and aligns with my resume (name:string, monthlySalaryLowInDollar:number, monthlySalaryHighInDollar:number, degree:string, responsibility:string[], skills:string[], experience:string[], relatedCompanies:string[], relatedProducts:string[], interviewQuestions:string[]). Surround keys with a pair of commas.`;
    prompt += `input:${JSON.stringify(input)}, output:`;

    return prompt;
}

// Parse the result from OpenAI's GPT-3
function parseResult(result: string | undefined) {
    const jobs: CoachJob[] = JSON.parse(result || "[]");
    return {
        jobs: jobs,
    };
}

// POST /api/jobs
export default async (req: NextApiRequest, res: NextApiResponse) => {
    return openAiRequest(req, res, generatePrompt, parseResult);
};
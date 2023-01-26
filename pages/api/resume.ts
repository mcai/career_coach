import { NextApiRequest, NextApiResponse } from "next";
import { CoachResume } from "../../models/resume";
import { openAiRequest } from "../../utils/openai"

const randomCareers = [
    "Surgeon",
    "Software Developer",
    "Environmental Engineer",
    "Financial Analyst",
    "Speech Therapist",
    "Human Resources Manager",
    "Graphic Designer",
    "Mechanical Engineer",
    "Event Planner",
    "Public Relations Specialist",
];

// Generate a prompt for OpenAI's GPT-3
function generatePrompt(input: {
    resume: CoachResume,
}) {
    const career = randomCareers[Math.floor(Math.random() * randomCareers.length)];

    let prompt = `You are required to generate a JSON string of random resume matching a ${career} (name:string, gender:string, age: number, skills: string[], experience: string[], interests: []). Surround keys with a pair of commas.`;
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
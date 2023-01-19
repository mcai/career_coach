// Use OpenAI's GPT-3 to generate a coaching response
// based on the user's input

import { NextApiRequest, NextApiResponse } from "next";
import { Configuration, OpenAIApi } from "openai";
import { CoachDetails, CoachJob } from "../../models/details";

const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
  });
const openai = new OpenAIApi(configuration);

export default async (req: NextApiRequest, res: NextApiResponse) => {
    if (!configuration.apiKey) {
        res.status(500).json({ error: "Missing OpenAI API key" });
        return;
    }

    const { details } = req.body;
    
    if (!details) {
        res.status(400).json({ error: "Missing details" });
        return;
    }

    try {
        const prompt = generatePrompt(details);
    
        console.log(`prompt: ${prompt}`);

        const response = await openai.createCompletion({
            model: "text-davinci-003",
            prompt,
            temperature: 0.6,
            max_tokens: 1024,
        });

        const resultStr = response.data.choices[0].text;

        console.log(`result: ${resultStr}`);

        const jobs: CoachJob[] = JSON.parse(resultStr || "[]");

        res.status(200).json({ 
            jobs: jobs
        });
    } catch (error: any) {
        if (error.response) {
            console.error(error.response.status, error.response.data);
            res.status(error.response.status).json({
                error: error.response.data
            });
        } else {
            console.error(`Error with OpenAI API request: ${error.message}`);
            res.status(500).json({ 
                error: `An error occurred during the request to OpenAI: ${error.message}`
            });
        }
    }
};


function generatePrompt(details: CoachDetails) {
    const input = `I'll give you a JSON string describing my personal profile.`;
    const expected_output = `You are required to generate a JSON array of next job positions that both follows my potential career path and aligns with my qualifications (name:string, monthlySalaryLowInDollar:number, monthlySalaryHighInDollar:number, degree:string, responsibility:string[], skills:string[], experience:string[], relatedCompanies:string[], relatedProducts:string[], interviewQuestions:string[]).`;
    const first_question = `Input:${JSON.stringify(details)}, output:`;

    return input + expected_output + first_question;
}

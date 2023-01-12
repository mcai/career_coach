// Use OpenAI's GPT-3 to generate a coaching response
// based on the user's input

import { NextApiRequest, NextApiResponse } from "next";
import { Configuration, OpenAIApi } from "openai";

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
    
    console.log(`details: ${details}`);

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

        const result = response.data.choices[0].text;

        console.log(`result: ${result}`);

        res.status(200).json({ result: result });
    } catch (error: any) {
        if (error.response) {
            console.error(error.response.status, error.response.data);
            res.status(error.response.status).json(error.response.data);
        } else {
            console.error(`Error with OpenAI API request: ${error.message}`);
            res.status(500).json({ 
                error: {
                    message: `An error occurred during the request to OpenAI: ${error.message}`,
                }
            });
        }
    }
};

function generatePrompt(details: any) {
    return `please coach me on my future career. my details are ${details}.`;
}

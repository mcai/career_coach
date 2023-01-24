import { NextApiRequest, NextApiResponse } from "next";
import { Configuration, OpenAIApi } from "openai";

// Create an OpenAI API client
export const openAiConfiguration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
  });
export const openAi = new OpenAIApi(openAiConfiguration);

// A helper function to make OpenAI API requests
export async function openAiRequest(req: NextApiRequest, res: NextApiResponse, promptGenerator: (input: any) => string, parseResult: (result: string | undefined) => any) {
    if (!openAiConfiguration.apiKey) {
        res.status(500).json({ error: "Missing OpenAI API key" });
        return;
    }

    const input = req.body;
    
    if (!input) {
        res.status(400).json({ error: "Missing input" });
        return;
    }

    try {
        const prompt = promptGenerator(input);
    
        console.log(`prompt: ${prompt}`);

        const response = await openAi.createCompletion({
            model: "text-davinci-003",
            prompt,
            temperature: 0.6,
            max_tokens: 1024,
        });

        const resultStr = response.data.choices[0].text;

        console.log(`result: ${resultStr}`);

        const result = parseResult(resultStr);

        res.status(200).json({ 
            result
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

import { LLMChain } from "langchain/chains";
import { OpenAI } from "langchain/llms/openai";
import { PromptTemplate } from "langchain/prompts";
import { audioFeaturePrompt } from "./constants.ts";
import { getEnv } from "./utils.ts";

const openAIApiKey = getEnv("OPENAI_API_KEY");

const model = new OpenAI({ temperature: 0.9, openAIApiKey });

const template = `
  This is the description of audio features: ${JSON.stringify(audioFeaturePrompt, null, 2)}

  These are the audio feature values of the user's playlist tracks: {values}

  What type of music does this user like?
  Based on the audio features, recommend me 3 songs.
`;

export const run = async (data: string) => {
  const prompt = new PromptTemplate({
    template,
    inputVariables: ["values"],
  });

  const chain = new LLMChain({ llm: model, prompt: prompt });

  const response = await chain.call({ values: data });

  return response;
};

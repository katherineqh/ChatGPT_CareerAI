require("dotenv").config();
const { Configuration, OpenAIApi } = require("openai");

const axios = require("axios");

const operandClient = require("@operandinc/sdk").operandClient;
const indexIDHeaderKey = require("@operandinc/sdk").indexIDHeaderKey;
const ObjectService = require("@operandinc/sdk").ObjectService;

// Open AI Configuration
const configuration = new Configuration({
  organization: process.env.OPENAI_ORG_KEY,
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

const getCoverLetter1 = async (req, res) => {
  const { message } = req.body;

  const runIndex = async () => {
    const operand = operandClient(
      ObjectService,
      process.env.OPERAND_KEY,
      "https://api.operand.ai",
      {
        [indexIDHeaderKey]: process.env.OPERAND_INDEX_KEY,
      }
    );

    try {
      const results = await operand.searchWithin({
        query: `${message}`,
        limit: 5,
      });

      if (results) {
        return results.matches.map((m) => `- ${m.content}`).join("\n");
      } else {
        return "";
      }
    } catch (error) {
      console.log(error);
    }
  };

  let operandSearch = await runIndex(message);

  const basePromptPrefix = `I want you to act as an interviewer. I will be the candidate and you will ask me the interview questions for the position position. I want you to only reply as the interviewer. Do not write all the conservation at once. I want you to only do the interview with me. Ask me the questions and wait for my answers. Do not write explanations. Ask me the questions one by one like an interviewer does and wait for my answers .what is your first question?.\nRelevant information that Siraj knows:\n${operandSearch}`;

  const response = await openai.createCompletion({
    model: "text-davinci-003",
    prompt: `${basePromptPrefix}\n\nStranger:${message}\n\n:`,
    max_tokens: 256,
    temperature: 0.6,
  });
  res.json({
    message: response.data.choices[0].text,
  });
};

module.exports = { getCoverLetter1 };

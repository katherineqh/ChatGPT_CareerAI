require('dotenv').config()
const { Configuration, OpenAIApi } = require("openai");


// Open AI Configuration
const configuration = new Configuration({
 
  organization: process.env.OPENAI_ORG_KEY,
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

const mockInterview=async (req, res) => {
  const {message}=req.body || ''

   

  const basePromptPrefix = `I want you to act as an interviewer. I am  will be the candidate and you will ask me the interview questions for the position position. I want you to only reply as the interviewer. Do not write all the conservation at once. I want you to only do the interview with me. Ask me the questions and wait for my answers. Do not write explanations. Ask me the questions one by one like an interviewer does and wait for my answers .what is your first question?`;
 try {
  
 
  const response = await openai.createCompletion(
    
    {  
    model: "text-davinci-003",
    prompt: `${basePromptPrefix}`,
    max_tokens: 256,
    temperature: 0.6,
  });
 
  res.status(200).json({
    message: response.data.choices[0].text,
  });
} catch (error) {
  if (error.response) {
    console.error(error.response.status, error.response.data);
    res.status(error.response.status).json(error.response.data);
  } else {
    console.error(`Error with OpenAI API request: ${error.message}`);
    res.status(500).json({
      error: {
        message: 'An error occurred during your request.',
      }
    });
  }
}
};

 


module.exports = { mockInterview};

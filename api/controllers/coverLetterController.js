require('dotenv').config()
const { Configuration, OpenAIApi } = require("openai");

// Open AI Configuration
const configuration = new Configuration({
   organization: process.env.OPENAI_ORG_KEY,
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

const getCoverLetter=async(req, res)=>{
  if (!configuration.apiKey) {
    res.status(500).json({
      error: {
        message: "OpenAI API key not configured, please follow instructions in README.md",
      }
    });
    return;
  }

  const {jobTitle,
    industry,
    keyWords,
    tone,
    numWords,}=req.body || ''
  
  try {
    const completion = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: generatePrompt(jobTitle,
        industry,
        keyWords,
        tone,
        numWords),
      temperature: 0.5,
      max_tokens: 180,
    });
    res.status(200).json({ firstResult: completion.data.choices[0].text });
      
  } catch(error) {
    // Consider adjusting the error handling logic for your use case
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
}

function generatePrompt(jobTitle,
  industry,
  keyWords,
  tone,
  numWords,) {            
  return  `Write a cover letter for a  ${jobTitle} role 
  ${industry ? `in the ${industry} industry` : ""} that is around ${    numWords || 180
  } words in a ${tone || "neutral"} tone. ${
    keyWords ? `Incorporate the following keywords: ${keyWords}.` : ""
  }. The cover letter should be described in a way that is SEO friendly, highlighting its unique features and benefits.`;
}

// function generatePrompt(jobTitle,
//   industry,
//   keyWords,
//   tone,
//   numWords) {
   
//   return `I want you to act as an interviewer. I will be the candidate and you will ask me the interview questions for the position position. I want you to only reply as the interviewer. Do not write all the conservation at once. I want you to only do the interview with me. Ask me the questions and wait for my answers. Do not write explanations. Ask me the questions one by one like an interviewer does and wait for my answers. My position is ${jobTitle} and I work in ${industry} and my job skills are mainly ${keyWords} .what is your first question?

// `;
// }

module.exports = { getCoverLetter }
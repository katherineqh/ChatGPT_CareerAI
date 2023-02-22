require('dotenv').config()
const { Configuration, OpenAIApi } = require("openai");


// Open AI Configuration
const configuration = new Configuration({
 
  organization: process.env.OPENAI_ORG_KEY,
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

const getCoverLetter1=async (req, res) => {
  const {message}=req.body || ''

   

  const basePromptPrefix = `Write a cover letter for a  ${message} role 
 about 180   words  The cover letter should be described in a way that is SEO friendly, highlighting its unique features and benefits.`;
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

 


module.exports = { getCoverLetter1 };

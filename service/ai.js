const { GoogleGenerativeAI } = require("@google/generative-ai");
const dotenv = require('dotenv');
dotenv.config();


const genAI = new GoogleGenerativeAI(process.env.GLA_API_KEY);

const analyzeWithAI = async (resumeText, jobDescription) => {
  console.log(2);
  const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash' });

  const prompt = jobDescription
    ? `
Act as a **Resume Analyzer AI**. Compare the provided RESUME with the given JOB DESCRIPTION and output a JSON that evaluates how well the resume matches.

RESUME:
${resumeText}

JOB DESCRIPTION:
${jobDescription}

Return **only valid JSON** strictly matching this format:
{
  "Feedback": {
    "overallScore": number, 
    "ATS": {
      "score": number,
      "tips": [
        { "type": "good" | "improve", "tip": string }
      ]
    },
    "toneAndStyle": {
      "score": number,
      "tips": [
        { "type": "good" | "improve", "tip": string, "explanation": string }
      ]
    },
    "content": {
      "score": number,
      "tips": [
        { "type": "good" | "improve", "tip": string, "explanation": string }
      ]
    },
    "structure": {
      "score": number,
      "tips": [
        { "type": "good" | "improve", "tip": string, "explanation": string }
      ]
    },
    "skills": {
      "score": number,
      "tips": [
        { "type": "good" | "improve", "tip": string, "explanation": string }
      ]
    }
  }
}
Ensure the response is **pure JSON** without explanations or markdown.
`
    : `
Act as a **Resume Quality Evaluator**. Analyze the given RESUME alone based on formatting, clarity, structure, and content relevance to software/developer roles.

RESUME:
${resumeText}

Return only valid JSON in this format:
{
  "Feedback": {
    "overallScore": number, 
    "ATS": {
      "score": number,
      "tips": [
        { "type": "good" | "improve", "tip": string }
      ]
    },
    "toneAndStyle": {
      "score": number,
      "tips": [
        { "type": "good" | "improve", "tip": string, "explanation": string }
      ]
    },
    "content": {
      "score": number,
      "tips": [
        { "type": "good" | "improve", "tip": string, "explanation": string }
      ]
    },
    "structure": {
      "score": number,
      "tips": [
        { "type": "good" | "improve", "tip": string, "explanation": string }
      ]
    },
    "skills": {
      "score": number,
      "tips": [
        { "type": "good" | "improve", "tip": string, "explanation": string }
      ]
    }
  }
}
Ensure the response is **pure JSON** without any explanation or extra text.
`;

  try {
    const result = await model.generateContent(prompt);
    const responseText = result.response.text();
    
    // Extract JSON from response (in case there's extra text)
    const jsonMatch = responseText.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      throw new Error('No valid JSON found in AI response');
    }
    
    const parsed = JSON.parse(jsonMatch[0]);
    return parsed.Feedback || parsed;
  } catch (error) {
    console.error('AI parsing error:', error);
    throw new Error('Failed to parse AI response');
  }
};

module.exports = { analyzeWithAI };



const fs = require('fs');
const { PDFParse} = require('pdf-parse');
const dotenv = require('dotenv');
const { analyzeWithAI } = require('../service/ai');
dotenv.config();


const analyzeResume = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No resume file uploaded' });
    }
    // Parse PDF
    const dataBuffer = new Uint8Array(fs.readFileSync(req.file.path));
    const pdfData = new PDFParse(dataBuffer)
    const resumeText = await pdfData.getText();
    const text =  resumeText.pages[0].text;


    const jobDescription = req.body.jobDescription || '';

    // Analyze with Google AI
    const analysisResult = await analyzeWithAI(text, jobDescription);

    // Clean up uploaded file
    fs.unlinkSync(req.file.path);

    res.json(analysisResult);
  } catch (error) {
    console.error('Analysis error:', error);
    res.status(500).json({
      error: 'Analysis failed',
      details: error.message,
    });
  }
};



module.exports = { analyzeResume };

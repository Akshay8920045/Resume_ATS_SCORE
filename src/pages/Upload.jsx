import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import FileUploader from '../components/FileUploader';
import useResumeAnalysis from '../hooks/useResumeAnalysis';
import { useResume } from '../contexts/ResumeContext';

const Upload = () => {
  const [file, setFile] = useState(null);
  const { state } = useResume(); 
  const { analyzeResume, isAnalyzing } = useResumeAnalysis();
  const navigate = useNavigate();

  const handleFileSelect = (selectedFile) => {
    setFile(selectedFile);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) return;

    const formData = new FormData(e.target);
    const jobDescription = formData.get('job-description');

    const uploadData = new FormData();
    uploadData.append('resume', file);
    uploadData.append('jobDescription', jobDescription);

    try {
      const result = await analyzeResume(uploadData);
      if (result) {
        // Navigate to resume route and pass server response as router state
        navigate('/resume', { state: result });
      }
    } catch (error) {
      console.error('Analysis failed:', error);
    }
  };

  return (
    <main className="bg-[url('/images/bg-main.svg')] bg-cover">
      <Navbar />

      <section className="main-section">
        <div className="page-heading py-16">
          <h1>Smart feedback for your dream job</h1>
          {isAnalyzing ? (
            <>
              <h2>Uploading and analyzing...</h2>
              <img src="/images/resume-scan.gif" alt="Processing" className="w-full" />
            </>
          ) : (
            <h2>Drop your resume for an ATS score and improvement tips</h2>
          )}
          {!isAnalyzing && (
            <form onSubmit={handleSubmit} className="flex flex-col gap-4 mt-8">
              <div className="form-div">
                <label htmlFor="job-description">Job Description</label>
                <textarea rows={5} name="job-description" placeholder="Job Description" id="job-description" />
              </div>

              <div className="form-div">
                <label htmlFor="uploader">Upload Resume</label>
                <FileUploader onFileSelect={handleFileSelect} />
              </div>

              <button className="primary-button" type="submit" disabled={!file}>
                Analyze Resume
              </button>
            </form>
          )}
        </div>
      </section>
    </main>
  );
};

export default Upload;
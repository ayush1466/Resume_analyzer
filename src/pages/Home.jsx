import { useState, useEffect } from "react";
import { Shield, Brain, Zap } from "lucide-react";
import Navbar from "../components/Navbar";
import UploadResume from "../components/UploadResume";
import JobDescription from "../components/JobDescription";
import AnalyzeButton from "../components/AnalyzeButton";
import AnalysisResult from "../components/AnalysisResult";
import Auth from "./Auth";

export default function Home() {
  const [uploadedFile, setUploadedFile] = useState(null);
  const [jobDescription, setJobDescription] = useState("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState(null);
  const [error, setError] = useState(null);

  console.log("API:", import.meta.env.VITE_API_BASE_URL);

  const handleAuthSuccess = (userData) => {
    setUser(userData);
    setShowAuth(false);
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
    setAnalysisResult(null);
    setUploadedFile(null);
    setJobDescription("");
  };

  const handleUpload = (file) => {
    setUploadedFile(file);
    setAnalysisResult(null);
    setError(null);
  };

  const handleAnalyze = async () => {
    if (!uploadedFile) return;

    setIsAnalyzing(true);
    setError(null);

    try {
      const formData = new FormData();
      formData.append("resume", uploadedFile);
      formData.append("jobDescription", jobDescription);

      const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

      const response = await fetch(`${API_BASE_URL}/api/analyze`, {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        let errorMessage = "Analysis failed";

        if (errorData.detail) {
          if (typeof errorData.detail === "object") {
            errorMessage =
              errorData.detail.error ||
              errorData.detail.details ||
              JSON.stringify(errorData.detail);
          } else {
            errorMessage = errorData.detail;
          }
        } else if (errorData.error) {
          errorMessage = errorData.error;
        }

        throw new Error(errorMessage);
      }

      const data = await response.json();
      setAnalysisResult(data);
    } catch (error) {
      let errorMessage = "Failed to analyze resume. Please try again.";

      if (error.message) errorMessage = error.message;

      if (error.name === "TypeError" && error.message.includes("fetch")) {
        errorMessage =
          "Cannot connect to backend. Make sure the server is running on http://localhost:5000";
      }

      setError(errorMessage);
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-gray-100">
      {/* Animated background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 sm:w-80 sm:h-80 lg:w-96 lg:h-96 bg-cyan-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 sm:w-80 sm:h-80 lg:w-96 lg:h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-700"></div>
      </div>

      {/* ✅ Navbar (replaces old header completely) */}
      <Navbar />

      {/* Main Content */}
      <main className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {!analysisResult ? (
          <div className="space-y-8 sm:space-y-10">
            {/* Hero Section */}
            <div className="text-center mb-12 sm:mb-16">
              <div className="inline-block mb-4">
                <span className="px-3 py-1.5 sm:px-4 sm:py-2 bg-cyan-500/10 border border-cyan-500/20 rounded-full text-xs sm:text-sm font-medium text-cyan-400">
                  ✨ AI-Powered Analysis
                </span>
              </div>
              <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-100 mb-4 sm:mb-6 px-4">
                Optimize Your Resume
                <br />
                <span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 bg-clip-text text-transparent">
                  Land Your Dream Job
                </span>
              </h2>
              <p className="text-base sm:text-lg md:text-xl text-gray-400 max-w-2xl mx-auto px-4">
                Get instant AI-powered feedback, improve your ATS score, and
                stand out from the competition
              </p>
            </div>

            {error && (
              <div className="max-w-2xl mx-auto mb-6">
                <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-4">
                  <p className="text-red-400 text-center text-sm sm:text-base break-words">
                    {error}
                  </p>
                </div>
              </div>
            )}

            <UploadResume onUpload={handleUpload} uploadedFile={uploadedFile} />
            <JobDescription
              value={jobDescription}
              onChange={setJobDescription}
            />

            <div className="flex justify-center px-4">
              <AnalyzeButton
                onClick={handleAnalyze}
                isAnalyzing={isAnalyzing}
                disabled={!uploadedFile}
              />
            </div>

            {/* <div className="max-w-2xl mx-auto">
              <div className="bg-gray-800/30 border border-gray-700/50 rounded-lg p-3">
                <div className="flex items-center justify-center gap-2 text-xs">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  <span className="text-gray-400">Connected to Backend API</span>
                </div>
              </div>
            </div> */}

            <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 mt-12 sm:mt-20">
              <div className="bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700 rounded-xl shadow-xl p-5 sm:p-6">
                <div className="w-12 h-12 bg-cyan-500/10 border border-cyan-500/20 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <Shield className="w-6 h-6 text-cyan-400" />
                </div>
                <h3 className="font-semibold text-center">ATS Optimization</h3>
              </div>

              <div className="bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700 rounded-xl shadow-xl p-5 sm:p-6">
                <div className="w-12 h-12 bg-purple-500/10 border border-purple-500/20 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <Brain className="w-6 h-6 text-purple-400" />
                </div>
                <h3 className="font-semibold text-center">
                  AI-Powered Insights
                </h3>
              </div>

              <div className="bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700 rounded-xl shadow-xl p-5 sm:p-6">
                <div className="w-12 h-12 bg-emerald-500/10 border border-emerald-500/20 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <Zap className="w-6 h-6 text-emerald-400" />
                </div>
                <h3 className="font-semibold text-center">Instant Results</h3>
              </div>
            </div>
          </div>
        ) : (
          <AnalysisResult result={analysisResult} />
        )}
      </main>
    </div>
  );
}

import { useState, useEffect } from 'react';
import { Sparkles, Shield, Brain, Zap, LogOut } from 'lucide-react';
import UploadResume from '../components/UploadResume';
import JobDescription from '../components/JobDescription';
import AnalyzeButton from '../components/AnalyzeButton';
import AnalysisResult from '../components/AnalysisResult';
import Auth from './Auth';

export default function Home() {
  const [uploadedFile, setUploadedFile] = useState(null);
  const [jobDescription, setJobDescription] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState(null);
  const [showAuth, setShowAuth] = useState(false);
  const [user, setUser] = useState(null);

  // Check if user is logged in on mount
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const handleAuthSuccess = (userData) => {
    setUser(userData);
    setShowAuth(false);
  };

  const handleLogout = () => {
    localStorage.removeItem('user');
    setUser(null);
    setAnalysisResult(null);
    setUploadedFile(null);
    setJobDescription('');
  };

  // Show Auth page if Sign In is clicked
  if (showAuth) {
    return <Auth onBack={() => setShowAuth(false)} onAuthSuccess={handleAuthSuccess} />;
  }

  const handleUpload = (file) => {
    setUploadedFile(file);
    setAnalysisResult(null);
  };

  const handleAnalyze = async () => {
    if (!uploadedFile) return;

    setIsAnalyzing(true);
    
    // TODO: Replace with actual API call
    // const formData = new FormData();
    // formData.append('resume', uploadedFile);
    // formData.append('jobDescription', jobDescription);
    // const response = await fetch('/api/analyze', {
    //   method: 'POST',
    //   body: formData
    // });
    // const data = await response.json();
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Mock result
    setAnalysisResult({
      atsScore: 75,
      strengths: [
        'Clear and concise professional summary with measurable achievements',
        'Well-structured work experience section with bullet points',
        'Quantified achievements with specific metrics and percentages',
        'Strong use of action verbs and industry-specific terminology'
      ],
      improvements: [
        'Add more relevant technical skills specific to the target role',
        'Include industry certifications and professional training courses',
        'Optimize section headers for better ATS parsing compatibility',
        'Expand on leadership roles and team collaboration experiences'
      ],
      missingKeywords: [
        'Project Management',
        'Agile Methodology',
        'Stakeholder Communication',
        'Data Analysis',
        'Cross-functional Teams'
      ],
      suggestions: [
        'Use consistent action verbs at the beginning of each bullet point',
        'Add a dedicated technical skills section with relevant technologies',
        'Include links to your professional portfolio, GitHub, or LinkedIn',
        'Ensure contact information is complete and up-to-date',
        'Consider adding a brief section on certifications or awards'
      ]
    });
    
    setIsAnalyzing(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-gray-100">
      {/* Animated background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-700"></div>
      </div>

      {/* Header */}
      <header className="relative bg-gray-900/50 backdrop-blur-xl border-b border-gray-800 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-blue-600 blur-lg opacity-50"></div>
                <div className="relative w-12 h-12 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-xl flex items-center justify-center shadow-lg">
                  {/* <Sparkles className="w-7 h-7 text-white" /> */}
                </div>
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                 CareerCortex
                </h1>
                <p className="text-xs text-gray-400">Powered by BeAsT</p>
              </div>
            </div>
            
            {user ? (
              <div className="flex items-center gap-4">
                <div className="text-right">
                  <p className="text-sm font-medium text-gray-300">{user.name}</p>
                  <p className="text-xs text-gray-500">{user.email}</p>
                </div>
                <button 
                  onClick={handleLogout}
                  className="px-4 py-2 bg-gray-800 hover:bg-gray-700 border border-gray-700 rounded-lg text-sm font-medium transition-all flex items-center gap-2"
                >
                  <LogOut className="w-4 h-4" />
                  Logout
                </button>
              </div>
            ) : (
              <button 
                onClick={() => setShowAuth(true)}
                className="px-4 py-2 bg-gray-800 hover:bg-gray-700 border border-gray-700 rounded-lg text-sm font-medium transition-all"
              >
                Sign In
              </button>
            )}
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {!analysisResult ? (
          <div className="space-y-10">
            {/* Hero Section */}
            <div className="text-center mb-16">
              <div className="inline-block mb-4">
                <span className="px-4 py-2 bg-cyan-500/10 border border-cyan-500/20 rounded-full text-sm font-medium text-cyan-400">
                  ✨ AI-Powered Analysis
                </span>
              </div>
              <h2 className="text-5xl md:text-6xl font-bold text-gray-100 mb-6">
                Optimize Your Resume
                <br />
                <span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 bg-clip-text text-transparent">
                  Land Your Dream Job
                </span>
              </h2>
              <p className="text-xl text-gray-400 max-w-2xl mx-auto">
                Get instant AI-powered feedback, improve your ATS score, and stand out from the competition
              </p>
            </div>

            {/* Upload Section */}
            <UploadResume onUpload={handleUpload} uploadedFile={uploadedFile} />

            {/* Job Description Section */}
            <JobDescription value={jobDescription} onChange={setJobDescription} />

            {/* Analyze Button */}
            <div className="flex justify-center">
              <AnalyzeButton
                onClick={handleAnalyze}
                isAnalyzing={isAnalyzing}
                disabled={!uploadedFile}
              />
            </div>

            {/* Features */}
            <div className="grid md:grid-cols-3 gap-6 mt-20">
              <div className="bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700 rounded-xl shadow-xl p-6 hover:shadow-2xl transition-all hover:scale-105">
                <div className="w-14 h-14 bg-cyan-500/10 border border-cyan-500/20 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <Shield className="w-7 h-7 text-cyan-400" />
                </div>
                <h3 className="font-semibold text-gray-100 mb-2 text-center">ATS Optimization</h3>
                <p className="text-sm text-gray-400 text-center">Beat the robots and ensure your resume passes Applicant Tracking Systems</p>
              </div>
              <div className="bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700 rounded-xl shadow-xl p-6 hover:shadow-2xl transition-all hover:scale-105">
                <div className="w-14 h-14 bg-purple-500/10 border border-purple-500/20 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <Brain className="w-7 h-7 text-purple-400" />
                </div>
                <h3 className="font-semibold text-gray-100 mb-2 text-center">AI-Powered Insights</h3>
                <p className="text-sm text-gray-400 text-center">Leverage cutting-edge AI to get intelligent, personalized feedback</p>
              </div>
              <div className="bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700 rounded-xl shadow-xl p-6 hover:shadow-2xl transition-all hover:scale-105">
                <div className="w-14 h-14 bg-emerald-500/10 border border-emerald-500/20 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <Zap className="w-7 h-7 text-emerald-400" />
                </div>
                <h3 className="font-semibold text-gray-100 mb-2 text-center">Instant Results</h3>
                <p className="text-sm text-gray-400 text-center">Get actionable improvements in seconds, not days</p>
              </div>
            </div>
          </div>
        ) : (
          <div className="space-y-8">
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-3xl font-bold text-gray-100">Analysis Complete</h2>
                <p className="text-gray-400 mt-1">Here's what we found in your resume</p>
              </div>
              <button
                onClick={() => {
                  setAnalysisResult(null);
                  setUploadedFile(null);
                  setJobDescription('');
                }}
                className="px-6 py-3 bg-gray-800 hover:bg-gray-700 border border-gray-700 text-gray-300 rounded-xl font-medium transition-all"
              >
                Analyze Another Resume
              </button>
            </div>
            <AnalysisResult result={analysisResult} />
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="relative bg-gray-900/50 backdrop-blur-xl border-t border-gray-800 mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <p className="text-center text-gray-500 text-sm">
            © 2026 AI Resume Analyzer • Powered by Advanced AI • Built with React & Tailwind CSS
          </p>
        </div>
      </footer>
    </div>
  );
}
import { useState } from 'react';
import { Upload, FileText, CheckCircle } from 'lucide-react';

const UploadResume = ({ onUpload, uploadedFile }) => {
  const [isDragging, setIsDragging] = useState(false);

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file && file.type === 'application/pdf') {
      onUpload(file);
    }
  };

  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    if (file) {
      onUpload(file);
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={`border-2 border-dashed rounded-2xl p-12 text-center transition-all duration-300 ${
          isDragging
            ? 'border-cyan-400 bg-cyan-500/10 scale-105'
            : uploadedFile
            ? 'border-emerald-400 bg-emerald-500/10'
            : 'border-gray-700 bg-gray-800/50 hover:border-cyan-500/50 hover:bg-gray-800'
        }`}
      >
        {uploadedFile ? (
          <div className="flex flex-col items-center gap-4">
            <div className="relative">
              <div className="absolute inset-0 bg-emerald-400 blur-xl opacity-50 animate-pulse"></div>
              <CheckCircle className="relative w-16 h-16 text-emerald-400" />
            </div>
            <div>
              <p className="text-lg font-semibold text-gray-100">{uploadedFile.name}</p>
              <p className="text-sm text-gray-400">{(uploadedFile.size / 1024).toFixed(2)} KB</p>
            </div>
            <button
              onClick={() => onUpload(null)}
              className="text-sm text-cyan-400 hover:text-cyan-300 font-medium transition-colors"
            >
              Upload a different file
            </button>
          </div>
        ) : (
          <>
            <div className="relative mb-6">
              <div className="absolute inset-0 bg-cyan-400 blur-3xl opacity-20"></div>
              <Upload className="relative w-16 h-16 text-gray-400 mx-auto" />
            </div>
            <h3 className="text-xl font-semibold text-gray-100 mb-2">
              Drop your resume here
            </h3>
            <p className="text-gray-400 mb-6">or click to browse from your device</p>
            <label className="inline-block">
              <input
                type="file"
                accept=".pdf"
                onChange={handleFileSelect}
                className="hidden"
              />
              <span className="px-8 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-xl font-medium cursor-pointer hover:from-cyan-400 hover:to-blue-500 transition-all inline-block shadow-lg shadow-cyan-500/30 hover:shadow-cyan-500/50 hover:scale-105 transform duration-200">
                Select PDF File
              </span>
            </label>
            <p className="text-xs text-gray-500 mt-4">Supports PDF format only • Max 10MB</p>
          </>
        )}
      </div>
    </div>
  );
};

export default UploadResume;
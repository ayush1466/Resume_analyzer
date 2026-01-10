import { Briefcase } from 'lucide-react';

const JobDescription = ({ value, onChange }) => {
  return (
    <div className="w-full max-w-2xl mx-auto">
      <label className="flex items-center gap-2 text-sm font-medium text-gray-300 mb-3">
        <Briefcase className="w-4 h-4 text-cyan-400" />
        Job Description <span className="text-gray-500">(Optional)</span>
      </label>
      <div className="relative">
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Paste the job description here to get tailored feedback and keyword matching..."
          className="w-full h-48 px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-xl text-gray-100 placeholder-gray-500 focus:ring-2 focus:ring-cyan-500 focus:border-transparent resize-none transition-all backdrop-blur-sm"
        />
        <div className="absolute bottom-3 right-3 text-xs text-gray-500">
          {value.length} characters
        </div>
      </div>
    </div>
  );
};

export default JobDescription;
import { Sparkles, Zap } from 'lucide-react';

const AnalyzeButton = ({ onClick, isAnalyzing, disabled }) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled || isAnalyzing}
      className={`group relative px-10 py-4 rounded-xl font-semibold text-lg flex items-center gap-3 transition-all duration-300 overflow-hidden ${
        disabled || isAnalyzing
          ? 'bg-gray-800 text-gray-500 cursor-not-allowed'
          : 'bg-gradient-to-r from-cyan-500 via-blue-600 to-purple-600 text-white hover:scale-105 shadow-lg shadow-cyan-500/50 hover:shadow-cyan-500/70'
      }`}
    >
      {/* Animated background effect */}
      {!disabled && !isAnalyzing && (
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      )}
      
      <div className="relative flex items-center gap-3">
        {isAnalyzing ? (
          <>
            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            <span>Analyzing with AI...</span>
          </>
        ) : (
          <>
            <div className="relative">
              <Sparkles className="w-5 h-5" />
              {!disabled && (
                <Zap className="absolute -top-1 -right-1 w-3 h-3 text-yellow-300 animate-pulse" />
              )}
            </div>
            <span>Analyze Resume</span>
          </>
        )}
      </div>
    </button>
  );
};

export default AnalyzeButton;
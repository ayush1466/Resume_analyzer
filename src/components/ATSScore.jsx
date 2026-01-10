import { BarChart3, TrendingUp, TrendingDown } from 'lucide-react';

const ATSScore = ({ score }) => {
  const getScoreColor = (score) => {
    if (score >= 80) return 'text-emerald-400';
    if (score >= 60) return 'text-yellow-400';
    return 'text-red-400';
  };

  const getScoreBg = (score) => {
    if (score >= 80) return 'bg-emerald-500/20 border-emerald-500/30';
    if (score >= 60) return 'bg-yellow-500/20 border-yellow-500/30';
    return 'bg-red-500/20 border-red-500/30';
  };

  const getScoreGradient = (score) => {
    if (score >= 80) return 'from-emerald-500 to-green-600';
    if (score >= 60) return 'from-yellow-500 to-orange-500';
    return 'from-red-500 to-pink-600';
  };

  const getScoreMessage = (score) => {
    if (score >= 80) return 'Excellent! Your resume is ATS-optimized';
    if (score >= 60) return 'Good score, but room for improvement';
    return 'Needs significant improvement';
  };

  const getIcon = (score) => {
    if (score >= 60) return <TrendingUp className="w-5 h-5" />;
    return <TrendingDown className="w-5 h-5" />;
  };

  // Calculate circle progress
  const circumference = 2 * Math.PI * 70;
  const strokeDashoffset = circumference - (score / 100) * circumference;

  return (
    <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl border border-gray-700 shadow-2xl p-8">
      <div className="flex items-center justify-center gap-2 mb-6">
        <BarChart3 className="w-6 h-6 text-cyan-400" />
        <h3 className="text-xl font-semibold text-gray-100">ATS Compatibility Score</h3>
      </div>
      
      <div className="flex flex-col items-center">
        {/* Circular Progress */}
        <div className="relative w-48 h-48 mb-6">
          {/* Background circle */}
          <svg className="transform -rotate-90 w-48 h-48">
            <circle
              cx="96"
              cy="96"
              r="70"
              stroke="currentColor"
              strokeWidth="12"
              fill="none"
              className="text-gray-700"
            />
            {/* Progress circle */}
            <circle
              cx="96"
              cy="96"
              r="70"
              stroke="url(#gradient)"
              strokeWidth="12"
              fill="none"
              strokeLinecap="round"
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
              className="transition-all duration-1000 ease-out"
            />
            <defs>
              <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" className={score >= 80 ? 'text-emerald-400' : score >= 60 ? 'text-yellow-400' : 'text-red-400'} stopColor="currentColor" />
                <stop offset="100%" className={score >= 80 ? 'text-green-500' : score >= 60 ? 'text-orange-500' : 'text-pink-500'} stopColor="currentColor" />
              </linearGradient>
            </defs>
          </svg>
          
          {/* Score display */}
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className={`text-5xl font-bold ${getScoreColor(score)}`}>{score}</span>
            <span className="text-gray-400 text-sm mt-1">out of 100</span>
          </div>
        </div>

        {/* Score message */}
        <div className={`flex items-center gap-2 px-6 py-3 rounded-full border ${getScoreBg(score)} ${getScoreColor(score)}`}>
          {getIcon(score)}
          <span className="font-medium">{getScoreMessage(score)}</span>
        </div>

        {/* Score breakdown */}
        <div className="mt-6 w-full grid grid-cols-3 gap-4 text-center">
          <div className="bg-gray-800/50 rounded-lg p-3 border border-gray-700">
            <div className="text-2xl font-bold text-emerald-400">
              {score >= 80 ? '✓' : score >= 60 ? '~' : '✗'}
            </div>
            <div className="text-xs text-gray-400 mt-1">Format</div>
          </div>
          <div className="bg-gray-800/50 rounded-lg p-3 border border-gray-700">
            <div className="text-2xl font-bold text-cyan-400">
              {score >= 70 ? '✓' : score >= 50 ? '~' : '✗'}
            </div>
            <div className="text-xs text-gray-400 mt-1">Keywords</div>
          </div>
          <div className="bg-gray-800/50 rounded-lg p-3 border border-gray-700">
            <div className="text-2xl font-bold text-purple-400">
              {score >= 75 ? '✓' : score >= 55 ? '~' : '✗'}
            </div>
            <div className="text-xs text-gray-400 mt-1">Content</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ATSScore;
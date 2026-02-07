import {
  CheckCircle,
  XCircle,
  AlertCircle,
  TrendingUp,
  Target,
  Award,
} from "lucide-react";
import ATSScore from "./ATSScore";

const AnalysisResult = ({ result }) => {
  const handleDownloadReport = async () => {
    try {
      const response = await fetch(
        "http://localhost:5000/api/download-report",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(result), // send analysis result
        },
      );

      if (!response.ok) {
        throw new Error("Failed to download report");
      }

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);

      const a = document.createElement("a");
      a.href = url;
      a.download = `Resume_Report_${Date.now()}.pdf`;
      document.body.appendChild(a);
      a.click();

      a.remove();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error(error);
      alert("Error downloading report");
    }
  };
  const renderSection = (
    title,
    items,
    icon,
    colorClass,
    bgClass,
    borderClass,
  ) => (
    <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl border border-gray-700 shadow-xl p-6 hover:shadow-2xl transition-all duration-300 hover:scale-[1.02]">
      <div className="flex items-center gap-3 mb-5 pb-4 border-b border-gray-700">
        <div className={`${bgClass} p-2 rounded-lg`}>{icon}</div>
        <h4 className="text-lg font-semibold text-gray-100">{title}</h4>
        <span
          className={`ml-auto text-xs font-semibold px-3 py-1 rounded-full ${bgClass} ${colorClass}`}
        >
          {items.length}
        </span>
      </div>
      <ul className="space-y-3">
        {items.map((item, idx) => (
          <li key={idx} className="flex items-start gap-3 text-gray-300 group">
            <span
              className={`${colorClass} mt-1 opacity-70 group-hover:opacity-100 transition-opacity`}
            >
              •
            </span>
            <span className="flex-1 leading-relaxed">{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );

  return (
    <div className="w-full max-w-6xl mx-auto space-y-6">
      {/* Header Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-gradient-to-br from-emerald-500/10 to-green-600/10 border border-emerald-500/30 rounded-xl p-4">
          <div className="flex items-center gap-2 mb-2">
            <CheckCircle className="w-5 h-5 text-emerald-400" />
            <span className="text-sm text-gray-400">Strengths</span>
          </div>
          <div className="text-3xl font-bold text-emerald-400">
            {result.strengths.length}
          </div>
        </div>

        <div className="bg-gradient-to-br from-yellow-500/10 to-orange-600/10 border border-yellow-500/30 rounded-xl p-4">
          <div className="flex items-center gap-2 mb-2">
            <AlertCircle className="w-5 h-5 text-yellow-400" />
            <span className="text-sm text-gray-400">To Improve</span>
          </div>
          <div className="text-3xl font-bold text-yellow-400">
            {result.improvements.length}
          </div>
        </div>

        <div className="bg-gradient-to-br from-red-500/10 to-pink-600/10 border border-red-500/30 rounded-xl p-4">
          <div className="flex items-center gap-2 mb-2">
            <Target className="w-5 h-5 text-red-400" />
            <span className="text-sm text-gray-400">Missing</span>
          </div>
          <div className="text-3xl font-bold text-red-400">
            {result.missingKeywords.length}
          </div>
        </div>

        <div className="bg-gradient-to-br from-cyan-500/10 to-blue-600/10 border border-cyan-500/30 rounded-xl p-4">
          <div className="flex items-center gap-2 mb-2">
            <Award className="w-5 h-5 text-cyan-400" />
            <span className="text-sm text-gray-400">Suggestions</span>
          </div>
          <div className="text-3xl font-bold text-cyan-400">
            {result.suggestions.length}
          </div>
        </div>
      </div>

      {/* ATS Score */}
      <ATSScore score={result.atsScore} />

      {/* Analysis Sections */}
      <div className="grid md:grid-cols-2 gap-6 mt-8">
        {result.strengths.length > 0 &&
          renderSection(
            "Strengths",
            result.strengths,
            <CheckCircle className="w-5 h-5 text-emerald-400" />,
            "text-emerald-400",
            "bg-emerald-500/10",
            "border-emerald-500/30",
          )}

        {result.improvements.length > 0 &&
          renderSection(
            "Areas for Improvement",
            result.improvements,
            <AlertCircle className="w-5 h-5 text-yellow-400" />,
            "text-yellow-400",
            "bg-yellow-500/10",
            "border-yellow-500/30",
          )}

        {result.missingKeywords.length > 0 &&
          renderSection(
            "Missing Keywords",
            result.missingKeywords,
            <XCircle className="w-5 h-5 text-red-400" />,
            "text-red-400",
            "bg-red-500/10",
            "border-red-500/30",
          )}

        {result.suggestions.length > 0 &&
          renderSection(
            "Actionable Suggestions",
            result.suggestions,
            <TrendingUp className="w-5 h-5 text-cyan-400" />,
            "text-cyan-400",
            "bg-cyan-500/10",
            "border-cyan-500/30",
          )}
      </div>

      {/* Action Buttons */}
      <div className="flex gap-4 justify-center mt-8 pt-8 border-t border-gray-800">
        <button
          onClick={handleDownloadReport}
          className="px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-xl font-medium hover:from-cyan-400 hover:to-blue-500 transition-all shadow-lg shadow-cyan-500/30 hover:shadow-cyan-500/50"
        >
          Download Report
        </button>

        <button className="px-6 py-3 bg-gray-800 border border-gray-700 text-gray-300 rounded-xl font-medium hover:bg-gray-700 transition-all">
          Share Results
        </button>
      </div>
    </div>
  );
};

export default AnalysisResult;

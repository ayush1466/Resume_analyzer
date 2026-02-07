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
  // ✅ Safe debug log
  const API_URL = import.meta.env.VITE_API_BASE_URL;
  console.log("API URL:", API_URL);

  const handleDownloadReport = async () => {
    try {
      if (!API_URL) {
        throw new Error("VITE_API_BASE_URL is not defined");
      }

      // ✅ Send only what backend expects
      const payload = {
        atsScore: result.atsScore,
        strengths: result.strengths || [],
        improvements: result.improvements || [],
        missingKeywords: result.missingKeywords || [],
        suggestions: result.suggestions || [],
      };

      const response = await fetch(`${API_URL}/api/download-report`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const text = await response.text();
        console.error("Backend error:", text);
        throw new Error("Failed to generate PDF");
      }

      const blob = await response.blob();

      if (blob.size === 0) {
        throw new Error("Generated PDF is empty");
      }

      const url = window.URL.createObjectURL(blob);

      const a = document.createElement("a");
      a.href = url;
      a.download = `Resume_Report_${Date.now()}.pdf`;
      document.body.appendChild(a);
      a.click();

      a.remove();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Download error:", error);
      alert("Error downloading PDF report");
    }
  };

  const renderSection = (title, items, icon, colorClass, bgClass) => (
    <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl border border-gray-700 shadow-xl p-6">
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
          <li key={idx} className="flex items-start gap-3 text-gray-300">
            <span className={`${colorClass} mt-1`}>•</span>
            <span className="flex-1">{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );

  return (
    <div className="w-full max-w-6xl mx-auto space-y-6">
      {/* Header Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <StatCard
          icon={<CheckCircle className="w-5 h-5 text-emerald-400" />}
          label="Strengths"
          value={result.strengths.length}
          color="emerald"
        />
        <StatCard
          icon={<AlertCircle className="w-5 h-5 text-yellow-400" />}
          label="To Improve"
          value={result.improvements.length}
          color="yellow"
        />
        <StatCard
          icon={<Target className="w-5 h-5 text-red-400" />}
          label="Missing"
          value={result.missingKeywords.length}
          color="red"
        />
        <StatCard
          icon={<Award className="w-5 h-5 text-cyan-400" />}
          label="Suggestions"
          value={result.suggestions.length}
          color="cyan"
        />
      </div>

      <ATSScore score={result.atsScore} />

      <div className="grid md:grid-cols-2 gap-6 mt-8">
        {result.strengths.length > 0 &&
          renderSection(
            "Strengths",
            result.strengths,
            <CheckCircle className="w-5 h-5 text-emerald-400" />,
            "text-emerald-400",
            "bg-emerald-500/10"
          )}

        {result.improvements.length > 0 &&
          renderSection(
            "Areas for Improvement",
            result.improvements,
            <AlertCircle className="w-5 h-5 text-yellow-400" />,
            "text-yellow-400",
            "bg-yellow-500/10"
          )}

        {result.missingKeywords.length > 0 &&
          renderSection(
            "Missing Keywords",
            result.missingKeywords,
            <XCircle className="w-5 h-5 text-red-400" />,
            "text-red-400",
            "bg-red-500/10"
          )}

        {result.suggestions.length > 0 &&
          renderSection(
            "Actionable Suggestions",
            result.suggestions,
            <TrendingUp className="w-5 h-5 text-cyan-400" />,
            "text-cyan-400",
            "bg-cyan-500/10"
          )}
      </div>

      <div className="flex justify-center mt-8 pt-8 border-t border-gray-800">
        <button
          onClick={handleDownloadReport}
          className="px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-xl font-medium hover:from-cyan-400 hover:to-blue-500 shadow-lg"
        >
          Download Report
        </button>
      </div>
    </div>
  );
};

/* Small helper component */
const StatCard = ({ icon, label, value, color }) => (
  <div
    className={`bg-gradient-to-br from-${color}-500/10 to-${color}-600/10 border border-${color}-500/30 rounded-xl p-4`}
  >
    <div className="flex items-center gap-2 mb-2">
      {icon}
      <span className="text-sm text-gray-400">{label}</span>
    </div>
    <div className={`text-3xl font-bold text-${color}-400`}>{value}</div>
  </div>
);

export default AnalysisResult;

import { Upload, Cpu, BarChart3, CheckCircle } from "lucide-react";

const steps = [
  {
    icon: Upload,
    title: "Upload Your Resume",
    description:
      "Upload your resume in PDF format. Our system supports ATS-friendly parsing for accurate analysis."
  },
  {
    icon: Cpu,
    title: "AI Analyzes Content",
    description:
      "Our AI scans keywords, formatting, structure, and relevance against modern ATS systems."
  },
  {
    icon: BarChart3,
    title: "Get ATS Score",
    description:
      "Receive a detailed ATS score along with strengths, gaps, and keyword optimization insights."
  },
  {
    icon: CheckCircle,
    title: "Improve & Apply",
    description:
      "Apply the suggestions, optimize your resume, and confidently apply for your dream jobs."
  }
];

const HowItWorks = () => {
  return (
    <section className="py-24 bg-gradient-to-b from-[#0B1220] via-[#0F1F30] to-[#0B1220]">
      <div className="max-w-6xl mx-auto px-6">

        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="inline-block mb-4 px-4 py-2 text-sm font-medium rounded-full 
            bg-[#1E3A5F]/40 border border-[#2B5278] text-[#3B9EFF]">
            How It Works
          </span>

          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Simple Steps to
            <span className="bg-gradient-to-r from-[#3B9EFF] to-[#8B5CF6] bg-clip-text text-transparent">
              {" "}Optimize Your Resume
            </span>
          </h2>

          <p className="text-gray-400 max-w-2xl mx-auto">
            CareerCortex helps you understand how ATS systems read your resume and
            guides you to improve it step by step.
          </p>
        </div>

        {/* Steps */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <div
                key={index}
                className="relative bg-[#12263A]/60 backdrop-blur-xl border border-[#1F3A52]
                rounded-2xl p-6 hover:border-[#3B9EFF]/50 transition-all duration-300 group"
              >
                {/* Icon */}
                <div className="w-12 h-12 mb-5 rounded-xl flex items-center justify-center
                  bg-gradient-to-br from-[#3B9EFF] to-[#2563EB] group-hover:scale-110 transition-transform">
                  <Icon className="w-6 h-6 text-white" />
                </div>

                {/* Content */}
                <h3 className="text-lg font-semibold text-white mb-2">
                  {step.title}
                </h3>
                <p className="text-sm text-gray-400 leading-relaxed">
                  {step.description}
                </p>

                {/* Step Number */}
                <span className="absolute top-4 right-4 text-5xl font-bold text-white/5">
                  {index + 1}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;

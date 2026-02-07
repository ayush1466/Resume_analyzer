import { Sparkles, Github, Twitter, Linkedin, Mail, Heart } from 'lucide-react';

const FooterSection = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#0B1929] border-t border-[#1E2F42]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* Brand Column */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-[#3B9EFF] to-[#2563EB] rounded-xl flex items-center justify-center">
                <Sparkles className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white drop-shadow-md">
                  CareerCortex
                </h3>
                <p className="text-xs text-gray-500">Powered by BeAsT</p>
              </div>
            </div>
            <p className="text-gray-400 text-sm mb-4">
              AI-powered resume analysis to help you land your dream job.
            </p>
          </div>


        </div>


        {/* Bottom Bar */}
        <div className="pt-8 border-t border-[#1E2F42] flex flex-col md:flex-row items-center justify-center gap-4">
          <p className="text-gray-400 text-sm">
            © {currentYear} CareerCortex. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default FooterSection;
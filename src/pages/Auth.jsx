import { ArrowLeft } from 'lucide-react';
import { SignIn, SignUp } from '@clerk/clerk-react';

const Auth = ({ onBack }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black flex items-center justify-center p-4">
      
      {/* Animated background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-700"></div>
      </div>

      <div className="relative w-full max-w-md">
        
        {/* Back Button */}
        <button
          onClick={onBack}
          className="mb-4 flex items-center gap-2 text-gray-400 hover:text-cyan-400 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>Back to Home</span>
        </button>

        {/* Clerk Auth */}
        <div className="bg-gray-900/80 backdrop-blur-xl border border-gray-700 rounded-2xl shadow-2xl p-6">
          
          <SignIn
            routing="hash"
            appearance={{
              elements: {
                card: 'bg-transparent shadow-none',
                headerTitle: 'text-gray-100',
                headerSubtitle: 'text-gray-400',
                formFieldLabel: 'text-gray-300',
                formFieldInput:
                  'bg-gray-800 border-gray-700 text-gray-100 focus:ring-cyan-500',
                footerActionText: 'text-gray-400',
                footerActionLink: 'text-cyan-400 hover:text-cyan-300',
                formButtonPrimary:
                  'bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500',
              },
            }}
          />

          {/* Optional: enable signup inside same page */}
          <div className="hidden">
            <SignUp />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;

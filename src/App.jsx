import Home from './pages/Home';
import './App.css';
import { SignedIn, SignedOut, SignInButton, SignUpButton, UserButton } from '@clerk/clerk-react'
import FooterSection from './components/Footer';   
import FAQSection from './components/faq';    
import HowItWorks from './components/HowItWorks';
function App() {
  return (
    <>
      <Home />
      <HowItWorks />
      <FAQSection />
      <FooterSection />
    </>
  );
}

export default App;

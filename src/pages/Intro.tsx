import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "@/assets/kalaveeryam-logo.png";

const Intro = () => {
  const navigate = useNavigate();
  const [showText, setShowText] = useState(false);

  useEffect(() => {
    // Show text after a brief delay
    const textTimer = setTimeout(() => setShowText(true), 500);
    
    // Navigate to home after animation completes
    const navTimer = setTimeout(() => navigate("/home"), 5000);

    return () => {
      clearTimeout(textTimer);
      clearTimeout(navTimer);
    };
  }, [navigate]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-background via-background to-muted relative overflow-hidden">
      {/* Watercolor effect overlay */}
      <div 
        className="absolute inset-0 opacity-30"
        style={{
          background: "var(--gradient-watercolor)",
        }}
      />
      
      {/* Content */}
      <div className="relative z-10 text-center space-y-8 px-4 animate-fade-in">
        {/* Logo */}
        <div className="animate-scale-in">
          <img 
            src={logo} 
            alt="Kalaveeryam Arts Fest" 
            className="w-64 h-64 md:w-80 md:h-80 object-contain mx-auto drop-shadow-2xl"
          />
        </div>

        {/* Typewriter text */}
        {showText && (
          <div className="space-y-4">
            <h1 className="text-3xl md:text-5xl font-bold text-primary overflow-hidden whitespace-nowrap border-r-4 border-secondary inline-block animate-typewriter">
              Welcome to Kalaveeryam
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground animate-fade-in animation-delay-2000">
              MIAC Arts Fest
            </p>
          </div>
        )}

        {/* Skip button */}
        <button
          onClick={() => navigate("/home")}
          className="absolute bottom-8 right-8 text-muted-foreground hover:text-primary transition-colors text-sm underline"
        >
          Skip
        </button>
      </div>
    </div>
  );
};

export default Intro;

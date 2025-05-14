
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "py-3 bg-background/80 backdrop-blur-lg shadow-md" : "py-5 bg-transparent"
      }`}
    >
      <div className="container flex items-center justify-between">
        <div className="flex items-center">
          <a href="#" className="text-2xl font-bold text-gradient">repaly.ai</a>
        </div>
        
        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          <a href="#features" className="text-sm text-foreground/80 hover:text-foreground transition-colors">Features</a>
          <a href="#how-it-works" className="text-sm text-foreground/80 hover:text-foreground transition-colors">How It Works</a>
          <a href="#roadmap" className="text-sm text-foreground/80 hover:text-foreground transition-colors">Roadmap</a>
          <a href="#testimonials" className="text-sm text-foreground/80 hover:text-foreground transition-colors">Testimonials</a>
          <div className="flex items-center space-x-4">
            <a href="#" className="text-sm text-foreground/80 hover:text-foreground transition-colors">Login</a>
            <Button className="bg-violet-600 hover:bg-violet-700 text-white">Get Started Free</Button>
          </div>
        </nav>
        
        {/* Mobile Menu Button */}
        <button 
          className="md:hidden text-foreground"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>
      
      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-background/95 backdrop-blur-lg shadow-lg py-4 border-t border-border/50 animate-fade-in">
          <nav className="container flex flex-col space-y-4">
            <a 
              href="#features" 
              className="text-foreground/80 hover:text-foreground py-2 transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Features
            </a>
            <a 
              href="#how-it-works" 
              className="text-foreground/80 hover:text-foreground py-2 transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              How It Works
            </a>
            <a 
              href="#roadmap" 
              className="text-foreground/80 hover:text-foreground py-2 transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Roadmap
            </a>
            <a 
              href="#testimonials" 
              className="text-foreground/80 hover:text-foreground py-2 transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Testimonials
            </a>
            <div className="flex flex-col space-y-3 pt-3 border-t border-border/50">
              <a 
                href="#" 
                className="text-foreground/80 hover:text-foreground py-2 transition-colors"
              >
                Login
              </a>
              <Button className="bg-violet-600 hover:bg-violet-700 text-white w-full">
                Get Started Free
              </Button>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;

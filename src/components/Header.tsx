import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { Link } from "react-scroll";
import { useAuthDrawerStore } from "@/stores/authDrawerStore";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { openDrawer } = useAuthDrawerStore();

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
        isScrolled
          ? "py-3 bg-background/80 backdrop-blur-lg shadow-md"
          : "py-5 bg-transparent"
      }`}
    >
      <div className="container flex items-center justify-between">
        <div className="flex items-center">
          <a href="#" className="text-2xl font-bold text-gradient">
            repaly.ai
          </a>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          <Link
            to="features"
            spy={true}
            smooth={true}
            offset={-70}
            duration={500}
            className="text-sm text-foreground/80 hover:text-foreground transition-colors cursor-pointer"
          >
            Features
          </Link>
          <Link
            to="how-it-works"
            spy={true}
            smooth={true}
            offset={-70}
            duration={500}
            className="text-sm text-foreground/80 hover:text-foreground transition-colors cursor-pointer"
          >
            How It Works
          </Link>
          <Link
            to="roadmap"
            spy={true}
            smooth={true}
            offset={-70}
            duration={500}
            className="text-sm text-foreground/80 hover:text-foreground transition-colors cursor-pointer"
          >
            Roadmap
          </Link>
          <Link
            to="testimonials"
            spy={true}
            smooth={true}
            offset={-70}
            duration={500}
            className="text-sm text-foreground/80 hover:text-foreground transition-colors cursor-pointer"
          >
            Testimonials
          </Link>
          <div className="flex items-center space-x-4">
            <Button
              className="bg-violet-600 hover:bg-violet-700 text-white"
              onClick={openDrawer}
            >
              Get Started Free
            </Button>
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
            <Link
              to="features"
              spy={true}
              smooth={true}
              offset={-70}
              duration={500}
              className="text-foreground/80 hover:text-foreground py-2 transition-colors cursor-pointer"
              onClick={() => setIsMenuOpen(false)}
            >
              Features
            </Link>
            <Link
              to="how-it-works"
              spy={true}
              smooth={true}
              offset={-70}
              duration={500}
              className="text-foreground/80 hover:text-foreground py-2 transition-colors cursor-pointer"
              onClick={() => setIsMenuOpen(false)}
            >
              How It Works
            </Link>
            <Link
              to="roadmap"
              spy={true}
              smooth={true}
              offset={-70}
              duration={500}
              className="text-foreground/80 hover:text-foreground py-2 transition-colors cursor-pointer"
              onClick={() => setIsMenuOpen(false)}
            >
              Roadmap
            </Link>
            <Link
              to="testimonials"
              spy={true}
              smooth={true}
              offset={-70}
              duration={500}
              className="text-foreground/80 hover:text-foreground py-2 transition-colors cursor-pointer"
              onClick={() => setIsMenuOpen(false)}
            >
              Testimonials
            </Link>
            <div className="flex flex-col space-y-3 pt-3 border-t border-border/50">
              <Button
                className="bg-violet-600 hover:bg-violet-700 text-white w-full"
                onClick={() => {
                  setIsMenuOpen(false);
                  openDrawer();
                }}
              >
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

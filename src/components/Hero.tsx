import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { Link } from "react-scroll";
import { useAuthDrawerStore } from "@/stores/authDrawerStore";

const Hero = () => {
  const { openDrawer } = useAuthDrawerStore();

  return (
    <section className="relative pt-32 pb-24 min-h-[90vh] flex items-center overflow-hidden">
      {/* Background Effects */}
      <div className="absolute top-24 left-10 w-64 h-64 bg-violet-600/20 rounded-full filter blur-[80px] animate-pulse-glow"></div>
      <div className="absolute bottom-24 right-10 w-72 h-72 bg-teal-500/20 rounded-full filter blur-[100px] animate-pulse-glow"></div>

      <div className="container relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold leading-tight mb-6 animate-fade-up">
            <span className="text-gradient">AI-Powered</span> Social Media
            Automation for Creators
          </h1>

          <p
            className="text-xl text-foreground/80 mb-10 animate-fade-up"
            style={{ animationDelay: "0.1s" }}
          >
            Stop wasting time on Instagram replies. Let AI handle your
            engagement while you focus on creating amazing content.
          </p>

          <div
            className="flex flex-col sm:flex-row justify-center gap-4 animate-fade-up"
            style={{ animationDelay: "0.2s" }}
          >
            <Button
              size="lg"
              className="bg-violet-600 hover:bg-violet-700 text-white px-8 py-6"
              onClick={openDrawer}
            >
              Get Started Free
            </Button>
            <Link
              to="how-it-works"
              spy={true}
              smooth={true}
              offset={-70}
              duration={500}
            >
              <Button
                variant="outline"
                size="lg"
                className="flex items-center gap-2"
              >
                See How It Works <ArrowRight size={16} />
              </Button>
            </Link>
          </div>

          <div
            className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-6 text-sm text-foreground/60 animate-fade-up"
            style={{ animationDelay: "0.3s" }}
          >
            <div className="flex items-center gap-2">
              <div className="w-1 h-1 rounded-full bg-teal-500"></div>
              <span>Secure Instagram Login</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-1 h-1 rounded-full bg-teal-500"></div>
              <span>Used by 500+ creators</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-1 h-1 rounded-full bg-teal-500"></div>
              <span>GDPR Compliant</span>
            </div>
          </div>
        </div>

        {/* Hero Image */}
        <div
          className="mt-16 max-w-4xl mx-auto relative animate-fade-up"
          style={{ animationDelay: "0.4s" }}
        >
          <div className="glass p-2 sm:p-4 rounded-xl shadow-lg overflow-hidden">
            <div className="aspect-[16/10] bg-secondary rounded-lg overflow-hidden">
              <div className="w-full h-full bg-gradient-to-br from-violet-800/50 to-teal-600/50 flex items-center justify-center text-lg font-medium">
                Dashboard Preview
              </div>
            </div>
          </div>

          {/* Floating Elements */}
          <div className="absolute -top-8 -right-4 glass p-4 rounded-lg shadow-lg hidden sm:block animate-float">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-teal-500/20 flex items-center justify-center">
                <span className="text-teal-500 text-sm">+</span>
              </div>
              <div>
                <p className="text-xs font-medium">Response Time</p>
                <p className="text-sm font-bold text-teal-400">-72% faster</p>
              </div>
            </div>
          </div>

          <div
            className="absolute -bottom-6 -left-4 glass p-4 rounded-lg shadow-lg hidden sm:block animate-float"
            style={{ animationDelay: "0.5s" }}
          >
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-violet-500/20 flex items-center justify-center">
                <span className="text-violet-500 text-sm">↑</span>
              </div>
              <div>
                <p className="text-xs font-medium">Engagement</p>
                <p className="text-sm font-bold text-violet-400">
                  +43% increase
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;

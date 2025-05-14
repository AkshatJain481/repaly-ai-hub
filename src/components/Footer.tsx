
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const Footer = () => {
  return (
    <footer className="relative pt-20 pb-10 border-t border-border/30">
      <div className="container">
        {/* CTA Section */}
        <div className="glass p-8 md:p-12 rounded-xl max-w-5xl mx-auto mb-16 relative overflow-hidden">
          {/* Background glow */}
          <div className="absolute -top-10 -right-10 w-40 h-40 bg-violet-600/30 rounded-full filter blur-[60px]"></div>
          <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-teal-500/30 rounded-full filter blur-[60px]"></div>
          
          <div className="relative z-10 text-center">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              Ready to <span className="text-gradient">Automate</span> Your Social Media Engagement?
            </h2>
            <p className="text-lg text-foreground/80 mb-8 max-w-2xl mx-auto">
              Join 500+ creators who are saving time and boosting engagement. Get started with a 14-day free trial.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Button size="lg" className="bg-violet-600 hover:bg-violet-700 text-white px-8">
                Get Started Free
              </Button>
              <Button variant="outline" size="lg" className="flex items-center gap-2">
                Schedule Demo <ArrowRight size={16} />
              </Button>
            </div>
          </div>
        </div>
        
        {/* Main Footer */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          <div className="md:col-span-2">
            <h3 className="text-2xl font-bold text-gradient mb-4">repaly.ai</h3>
            <p className="text-foreground/70 mb-6 max-w-md">
              AI-powered social media automation to help creators save time and boost engagement.
            </p>
            <div className="flex space-x-4">
              {["Twitter", "Instagram", "LinkedIn", "YouTube"].map((social) => (
                <a 
                  key={social} 
                  href="#" 
                  className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center hover:bg-violet-600/20 transition-colors"
                >
                  <span className="sr-only">{social}</span>
                  <div className="w-5 h-5"></div>
                </a>
              ))}
            </div>
          </div>
          
          <div>
            <h4 className="font-bold mb-4">Product</h4>
            <ul className="space-y-2">
              {["Features", "Pricing", "Roadmap", "Integrations", "FAQ"].map((item) => (
                <li key={item}>
                  <a href="#" className="text-foreground/70 hover:text-foreground transition-colors">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h4 className="font-bold mb-4">Company</h4>
            <ul className="space-y-2">
              {["About Us", "Blog", "Careers", "Contact", "Privacy", "Terms"].map((item) => (
                <li key={item}>
                  <a href="#" className="text-foreground/70 hover:text-foreground transition-colors">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
        
        <div className="mt-12 pt-6 border-t border-border/30 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-foreground/60">
            © 2025 Repaly.ai. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <a href="#" className="text-sm text-foreground/60 hover:text-foreground transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="text-sm text-foreground/60 hover:text-foreground transition-colors">
              Terms of Service
            </a>
            <a href="#" className="text-sm text-foreground/60 hover:text-foreground transition-colors">
              Cookies
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

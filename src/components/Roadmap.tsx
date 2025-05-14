
import { Check, Clock } from "lucide-react";

const platforms = [
  {
    name: "Instagram",
    description: "Complete automation for comments, DMs, and mentions",
    status: "available",
    icon: "Instagram"
  },
  {
    name: "TikTok",
    description: "Comment management and response automation",
    status: "coming-soon",
    icon: "TikTok"
  },
  {
    name: "YouTube",
    description: "Comment moderation and automated responses",
    status: "coming-soon",
    icon: "YouTube"
  },
  {
    name: "Twitter/X",
    description: "Tweet replies and DM automation",
    status: "planned",
    icon: "Twitter"
  },
  {
    name: "LinkedIn",
    description: "Comment and message automation for professionals",
    status: "planned",
    icon: "LinkedIn"
  },
  {
    name: "Facebook",
    description: "Comment, group, and page message automation",
    status: "planned",
    icon: "Facebook"
  }
];

const Roadmap = () => {
  return (
    <section id="roadmap" className="py-20 relative">
      {/* Background Effects */}
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-coral-500/10 rounded-full filter blur-[120px]"></div>
      
      <div className="container relative z-10">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Platform <span className="text-gradient">Expansion Roadmap</span>
          </h2>
          <p className="text-lg text-foreground/80">
            We're starting with Instagram, but our vision extends to all major social platforms.
          </p>
        </div>
        
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {platforms.map((platform) => {
            const isAvailable = platform.status === "available";
            const isComingSoon = platform.status === "coming-soon";
            
            return (
              <div 
                key={platform.name}
                className={`glass p-6 rounded-xl border transition-all duration-300 ${
                  isAvailable 
                    ? "border-teal-500/30" 
                    : isComingSoon 
                    ? "border-violet-500/30" 
                    : "border-transparent"
                }`}
              >
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-xl font-bold">{platform.name}</h3>
                    <p className="text-sm text-foreground/70 mt-1">{platform.description}</p>
                  </div>
                  
                  <div className={`rounded-full p-1 ${
                    isAvailable 
                      ? "bg-teal-500/20" 
                      : isComingSoon 
                      ? "bg-violet-500/20" 
                      : "bg-foreground/10"
                  }`}>
                    {isAvailable ? (
                      <Check size={16} className="text-teal-500" />
                    ) : (
                      <Clock size={16} className={isComingSoon ? "text-violet-500" : "text-foreground/50"} />
                    )}
                  </div>
                </div>
                
                <div className={`text-xs font-medium rounded-full px-3 py-1 inline-flex items-center gap-1 ${
                  isAvailable 
                    ? "bg-teal-500/20 text-teal-400" 
                    : isComingSoon 
                    ? "bg-violet-500/20 text-violet-400" 
                    : "bg-foreground/10 text-foreground/60"
                }`}>
                  {isAvailable 
                    ? "Available Now" 
                    : isComingSoon 
                    ? "Coming Q3 2025" 
                    : "Planned for 2026"}
                </div>
              </div>
            );
          })}
        </div>
        
        <div className="mt-16 max-w-3xl mx-auto text-center">
          <p className="text-foreground/70">
            Don't see your platform? <button className="text-violet-400 underline">Let us know</button> which integrations you'd like to see next.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Roadmap;

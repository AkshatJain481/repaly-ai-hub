
import { Check, Lock, MessageCircle } from "lucide-react";

const steps = [
  {
    icon: <Lock className="h-6 w-6" />,
    title: "Connect Your Instagram",
    description: "Securely connect your Instagram business account through our OAuth integration. No passwords stored.",
    color: "from-violet-500 to-violet-700"
  },
  {
    icon: <Check className="h-6 w-6" />,
    title: "Set Up Automation Rules",
    description: "Define when and how you want the AI to respond. Create templates for different comment types.",
    color: "from-teal-500 to-teal-700"
  },
  {
    icon: <MessageCircle className="h-6 w-6" />,
    title: "Customize AI Responses",
    description: "Train the AI with your brand voice and style. Review and approve responses for continuous improvement.",
    color: "from-coral-500 to-coral-700"
  }
];

const HowItWorks = () => {
  return (
    <section id="how-it-works" className="py-20 relative">
      <div className="absolute top-1/2 right-0 w-96 h-96 bg-violet-600/10 rounded-full filter blur-[120px]"></div>
      
      <div className="container relative z-10">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            <span className="text-gradient">How Repaly.ai</span> Works
          </h2>
          <p className="text-lg text-foreground/80">
            Get up and running in minutes with our simple three-step process.
          </p>
        </div>
        
        <div className="max-w-5xl mx-auto">
          <div className="relative">
            {/* Connect line between steps */}
            <div className="absolute left-[28px] top-24 bottom-24 w-[2px] bg-gradient-to-b from-violet-500 to-coral-500 hidden md:block"></div>
            
            <div className="space-y-16 relative">
              {steps.map((step, index) => (
                <div key={index} className="flex flex-col md:flex-row gap-6 md:gap-10">
                  <div className="flex flex-row md:flex-col items-center justify-center gap-4 md:gap-2">
                    <div className={`w-14 h-14 rounded-full bg-gradient-to-r ${step.color} flex items-center justify-center text-white shadow-lg`}>
                      {step.icon}
                    </div>
                  </div>
                  
                  <div className="glass p-6 rounded-xl flex-1">
                    <h3 className="text-xl font-bold mb-3">{step.title}</h3>
                    <p className="text-foreground/70 mb-4">{step.description}</p>
                    
                    {/* Step-specific content */}
                    {index === 0 && (
                      <div className="mt-4 p-3 rounded-lg bg-background/50 text-sm">
                        <p className="flex items-center gap-2">
                          <Lock size={14} className="text-teal-500" />
                          <span>Secure OAuth 2.0 authentication with Instagram</span>
                        </p>
                      </div>
                    )}
                    
                    {index === 1 && (
                      <div className="grid grid-cols-2 gap-3 mt-4">
                        {["Comment replies", "DM automation", "Story mentions", "Scheduled posts"].map((item, i) => (
                          <div key={i} className="p-2 rounded-lg bg-background/50 text-sm text-center">
                            {item}
                          </div>
                        ))}
                      </div>
                    )}
                    
                    {index === 2 && (
                      <div className="mt-4 p-3 rounded-lg bg-background/50 text-sm space-y-2">
                        <p className="text-xs text-foreground/60">Sample AI Response:</p>
                        <p className="italic">"Thanks for the love on my post! I really appreciate your support 😊 What's your favorite part of the video?"</p>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;

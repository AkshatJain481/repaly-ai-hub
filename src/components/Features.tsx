import { MessageCircle, Zap, Users, Instagram } from "lucide-react";

const features = [
  {
    title: "AI-Powered Automation",
    description:
      "Our intelligent system monitors your Instagram comments and replies to your followers with personalized responses.",
    icon: <Zap className="h-6 w-6 text-violet-500" />,
  },
  {
    title: "Smart AI Replies",
    description:
      "Leverage AI to craft responses that sound just like you. Maintain your brand voice while saving hours of time.",
    icon: <MessageCircle className="h-6 w-6 text-teal-500" />,
  },
  {
    title: "Tag-Based Responses",
    description:
      "Create custom response templates for different types of comments with intelligent tagging system.",
    icon: <Users className="h-6 w-6 text-coral-500" />,
  },
  {
    title: "Instagram Integration",
    description:
      "Seamlessly connect your Instagram business account with secure authentication and easy setup.",
    icon: <Instagram className="h-6 w-6 text-violet-500" />,
  },
];

const Features = () => {
  return (
    <section id="features" className="py-20 relative">
      {/* Background Effects */}
      <div className="absolute top-24 right-10 w-64 h-64 bg-coral-500/10 rounded-full filter blur-[80px]"></div>
      <div className="absolute bottom-24 left-10 w-72 h-72 bg-violet-600/10 rounded-full filter blur-[100px]"></div>

      <div className="container relative z-10">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Your AI-Powered Social Media{" "}
            <span className="text-gradient">Automation Suite</span>
          </h2>
          <p className="text-lg text-foreground/80">
            Repaly.ai helps you engage with your audience at scale without
            spending hours responding to comments.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {features.map((feature, index) => (
            <div
              key={feature.title}
              className="glass p-6 rounded-xl feature-card group hover:border-violet-500/50 transition-all duration-300"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="mb-4 p-2 rounded-lg bg-background/50 inline-block">
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold mb-3 group-hover:text-gradient transition-all duration-300">
                {feature.title}
              </h3>
              <p className="text-foreground/70">{feature.description}</p>
            </div>
          ))}
        </div>

        {/* Feature Highlight */}
        <div className="mt-20 glass p-6 md:p-8 rounded-xl max-w-5xl mx-auto overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-2xl font-bold mb-4">
                AI That Understands Your Brand Voice
              </h3>
              <p className="text-foreground/70 mb-6">
                Our AI doesn't just reply - it learns your unique communication
                style. The more you use Repaly.ai, the better it gets at
                sounding exactly like you.
              </p>
              <ul className="space-y-3">
                {[
                  "Train the AI with your past responses",
                  "Create custom response templates",
                  "Review and approve responses before sending",
                  "Continuous improvement with feedback",
                ].map((item, index) => (
                  <li key={index} className="flex items-center gap-3">
                    <div className="w-5 h-5 rounded-full bg-violet-500/20 flex items-center justify-center">
                      <div className="w-2 h-2 rounded-full bg-violet-500"></div>
                    </div>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="relative">
              <div className="aspect-[4/5] bg-gradient-to-br from-violet-800/40 to-teal-600/40 rounded-lg overflow-hidden flex items-center justify-center">
                <div className="text-center">
                  <p className="text-sm text-foreground/50">
                    AI Response Visualization
                  </p>
                </div>
              </div>
              {/* Floating Elements */}
              <div className="absolute -top-4 -right-4 glass p-3 rounded-lg shadow-lg hidden md:block animate-float">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-teal-500"></div>
                  <p className="text-xs font-medium">99% response accuracy</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;

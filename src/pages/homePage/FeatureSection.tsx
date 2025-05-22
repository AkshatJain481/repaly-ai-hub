import { MessageCircle, Zap, Users, Instagram } from "lucide-react";

const features = [
  {
    title: "AI-Powered Automation",
    description:
      "Our intelligent system monitors your Instagram comments and replies to your followers with personalized responses.",
    icon: <Zap className="h-6 w-6 text-violet-500 dark:text-violet-400" />,
  },
  {
    title: "Smart AI Replies",
    description:
      "Leverage AI to craft responses that sound just like you. Maintain your brand voice while saving hours of time.",
    icon: (
      <MessageCircle className="h-6 w-6 text-teal-500 dark:text-teal-400" />
    ),
  },
  {
    title: "Tag-Based Responses",
    description:
      "Create custom response templates for different types of comments with intelligent tagging system.",
    icon: <Users className="h-6 w-6 text-rose-500 dark:text-rose-400" />,
  },
  {
    title: "Instagram Integration",
    description:
      "Seamlessly connect your Instagram business account with secure authentication and easy setup.",
    icon: (
      <Instagram className="h-6 w-6 text-violet-500 dark:text-violet-400" />
    ),
  },
];

const FeatureSection = () => {
  return (
    <section
      id="features"
      className="py-16 relative bg-gray-50 dark:bg-gray-900 transition-colors duration-200"
    >
      {/* Background Effects */}
      <div className="absolute top-24 right-10 w-64 h-64 bg-rose-500/10 dark:bg-rose-400/10 rounded-full filter blur-[80px] z-0"></div>
      <div className="absolute bottom-24 left-10 w-72 h-72 bg-violet-600/10 dark:bg-violet-500/10 rounded-full filter blur-[100px] z-0"></div>

      <div className="container relative z-10">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-semibold text-gray-900 dark:text-gray-100 mb-4">
            Your AI-Powered Social Media{" "}
            <span className="bg-gradient-to-r from-purple-500 to-blue-500 bg-clip-text text-transparent">
              Automation Suite
            </span>
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            Repaly.ai helps you engage with your audience at scale without
            spending hours responding to comments.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {features.map((feature, index) => (
            <div
              key={feature.title}
              className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg border border-gray-200 dark:border-gray-600 hover:shadow-xl hover:-translate-y-1 hover:border-purple-500/50 transition-all duration-300"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="mb-4 p-2 rounded-lg bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 inline-block">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2 group-hover:bg-gradient-to-r group-hover:from-purple-500 group-hover:to-blue-500 group-hover:bg-clip-text group-hover:text-transparent transition-all duration-300">
                {feature.title}
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

        {/* Feature Highlight */}
        <div className="mt-16 bg-white dark:bg-gray-800 p-6 md:p-8 rounded-xl shadow-lg border border-gray-200 dark:border-gray-600 max-w-5xl mx-auto overflow-hidden transition-colors duration-200">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-4">
                AI That Understands Your Brand Voice
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-6">
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
                    <div className="w-5 h-5 rounded-full bg-violet-500/20 dark:bg-violet-400/20 flex items-center justify-center">
                      <div className="w-2 h-2 rounded-full bg-violet-500 dark:bg-violet-400"></div>
                    </div>
                    <span className="text-gray-700 dark:text-gray-300 text-sm">
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="relative">
              <div className="aspect-[4/5] bg-gradient-to-br from-violet-800/40 to-teal-600/40 rounded-lg overflow-hidden flex items-center justify-center">
                <div className="text-center">
                  <p className="text-sm text-gray-400 dark:text-gray-500">
                    AI Response Visualization
                  </p>
                </div>
              </div>
              {/* Floating Elements */}
              <div className="absolute -top-4 -right-4 bg-teal-500/10 dark:bg-teal-400/10 p-3 rounded-lg shadow-lg animate-float">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-teal-500 dark:bg-teal-400"></div>
                  <p className="text-xs font-medium text-gray-700 dark:text-gray-300">
                    99% response accuracy
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeatureSection;

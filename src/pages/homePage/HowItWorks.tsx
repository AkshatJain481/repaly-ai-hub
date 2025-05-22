import { Check, Lock, MessageCircle } from "lucide-react";

const steps = [
  {
    icon: <Lock className="h-6 w-6" />,
    title: "Connect Your Instagram",
    description:
      "Securely connect your Instagram business account through our OAuth integration. No passwords stored.",
    color: "from-violet-500 to-violet-700",
  },
  {
    icon: <Check className="h-6 w-6" />,
    title: "Set Up Automation Rules",
    description:
      "Define when and how you want the AI to respond. Create templates for different comment types.",
    color: "from-teal-500 to-teal-700",
  },
  {
    icon: <MessageCircle className="h-6 w-6" />,
    title: "Customize AI Responses",
    description:
      "Train the AI with your brand voice and style. Review and approve responses for continuous improvement.",
    color: "from-rose-500 to-rose-700",
  },
];

const HowItWorks = () => {
  return (
    <section
      id="how-it-works"
      className="py-16 relative bg-gray-50 dark:bg-gray-900 transition-colors duration-200"
    >
      <div className="absolute top-1/2 right-0 w-80 h-80 bg-violet-600/20 dark:bg-violet-500/10 rounded-full filter blur-[100px] z-0"></div>

      <div className="container relative z-10">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-semibold text-gray-900 dark:text-gray-100 mb-4">
            <span className="bg-gradient-to-r from-purple-500 to-blue-500 bg-clip-text text-transparent">
              How Repaly.ai Works
            </span>
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            Get up and running in minutes with our simple three-step process.
          </p>
        </div>

        <div className="max-w-5xl mx-auto">
          <div className="relative">
            {/* Connect line between steps */}
            <div className="absolute left-6 -z-10 top-20 bottom-24 w-0.5 bg-gradient-to-b from-violet-500 to-rose-500 hidden md:block"></div>

            <div className="space-y-12">
              {steps.map((step, index) => (
                <div
                  key={index}
                  className="flex flex-col md:flex-row gap-6 md:gap-8"
                >
                  <div className="flex flex-row md:flex-col items-center justify-center gap-4 md:gap-3">
                    <div
                      className={`w-12 h-12 rounded-full bg-gradient-to-r ${step.color} flex items-center justify-center text-white shadow-md`}
                    >
                      {step.icon}
                    </div>
                  </div>

                  <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg border border-gray-200 dark:border-gray-600 flex-1 hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2">
                      {step.title}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                      {step.description}
                    </p>

                    {/* Step-specific content */}
                    {index === 0 && (
                      <div className="mt-4 p-3 rounded-lg bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 text-sm">
                        <p className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
                          <Lock className="w-4 h-4 text-teal-500 dark:text-teal-400" />
                          Secure OAuth 2.0 authentication with Instagram
                        </p>
                      </div>
                    )}

                    {index === 1 && (
                      <div className="grid grid-cols-2 gap-3 mt-4">
                        {[
                          "Comment replies",
                          "DM automation",
                          "Story mentions",
                          "Scheduled posts",
                        ].map((item, i) => (
                          <div
                            key={i}
                            className="p-2 rounded-lg bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 text-sm text-gray-700 dark:text-gray-300 text-center"
                          >
                            {item}
                          </div>
                        ))}
                      </div>
                    )}

                    {index == 2 && (
                      <div className="mt-4 p-3 rounded-lg bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 text-sm space-y-2">
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                          Sample AI Response:
                        </p>
                        <p className="italic text-gray-700 dark:text-gray-300">
                          "Thanks for the love on my post! I really appreciate
                          your support 😊 What's your favorite part of the
                          video?"
                        </p>
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

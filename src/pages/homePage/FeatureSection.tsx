import { BsChatDots, BsAt, BsBarChart } from "react-icons/bs";

const FeatureCard = ({
  icon,
  title,
  description,
}: {
  icon: React.ReactElement;
  title: string;
  description: string;
}) => {
  return (
    <div className="bg-white dark:bg-black dark:border-white dark:border dark:border-solid rounded-xl p-8 transition-all duration-300 hover:-translate-y-1 hover:shadow-md hover:cursor-pointer">
      <div className="mb-4 w-12 h-12 rounded-md flex items-center justify-center bg-primary/20">
        {icon}
      </div>
      <h3 className="text-xl font-bold mb-3">{title}</h3>
      <p className="text-lg text-muted-foreground">{description}</p>
    </div>
  );
};

const FeaturesSection = () => {
  // Feature data
  const features = [
    {
      icon: <BsChatDots className="text-primary" size={24} />,
      title: "Smart Auto-Replies",
      description:
        "AI-powered responses for comments that keep your engagement high and save hours of manual work.",
    },
    {
      icon: <BsAt className="text-primary" size={24} />,
      title: "Custom DM Automation",
      description:
        "Create personalized direct messages based on user inquiries, complete with media and your brand voice.",
    },
    {
      icon: <BsBarChart className="text-primary" size={24} />,
      title: "Media Analytics",
      description:
        "Track engagement, analyze comments, and boost your social media growth with AI-powered insights.",
    },
  ];

  return (
    <div className="relative py-10 md:py-20 overflow-hidden bg-background px-1">
      {/* Background decorative elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden">
        <div className="absolute top-[60%] left-[10%] w-40 h-40 rounded-full bg-primary/10 blur-[60px]"></div>
        <div className="absolute top-[20%] right-[10%] w-64 h-64 rounded-full bg-primary/10 blur-[70px]"></div>
      </div>

      <div className="container relative z-10 mx-auto">
        <div className="flex flex-col items-center gap-6 mb-16 text-center">
          <span className="bg-primary/20 text-primary text-sm font-bold py-2 px-4 rounded-full">
            Features
          </span>

          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground leading-tight">
            Everything You Need to Elevate Your Social Media
          </h2>

          <p className="text-lg text-muted-foreground max-w-3xl">
            Designed for creators, influencers, and brands who want to scale
            their online presence without hiring a team
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <FeatureCard
              key={index}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default FeaturesSection;

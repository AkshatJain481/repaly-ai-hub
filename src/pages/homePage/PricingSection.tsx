
import PricingCard from "../../components/common/PricingCard";

const PricingSection = () => {
  return (
    <div className="relative py-10 md:py-20 overflow-hidden px-1">
      <div className="flex flex-col items-center gap-6 mb-16 text-center">
        <span className="bg-primary/20 text-primary text-sm font-bold py-2 px-4 rounded-full">
          Pricing
        </span>

        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground leading-tight">
          Plans That Scale With Your Growth
        </h2>

        <p className="text-lg text-muted-foreground max-w-3xl">
          Choose the perfect plan for your social media needs. All plans include
          core features with different limits.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 overflow-x-auto max-w-full p-4">
          <PricingCard
            title="Free Plan"
            price="0"
            description="Perfect for creators just getting started on their journey."
            buttonText="Get Started"
            features={[
              { text: "Free Forever" },
              { text: "Comment Reply Automation" },
              { text: "50 Media per month" },
            ]}
          />
          <PricingCard
            title="Premium Plan"
            price="19"
            isPopular={true}
            description="Perfect for creators ready to take things to the next level."
            buttonText="Get Started"
            features={[
              { text: "Everything in free plan" },
              { text: "Comment Reply Automation" },
              { text: "DM automations" },
              { text: "200 Media per month" },
              { text: "Basic Analytics Dashboard" },
            ]}
          />
          <PricingCard
            title="Enterprise Plan"
            price="Custom"
            description="For brands and professional influencers with high-volume needs."
            buttonText="Contact Sales"
            features={[
              { text: "Everything in premium plan" },
              { text: "Comment Reply Automation" },
              { text: "DM automations" },
              { text: "Custom Media per month" },
              { text: "Advanced Analytics & Reporting" },
              { text: "Dedicated Account Manager" },
            ]}
          />
        </div>
      </div>
    </div>
  );
};

export default PricingSection;

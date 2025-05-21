import { BsCheckCircle } from "react-icons/bs";
import LoginDrawer from "./LoginDrawer";

interface FeatureItem {
  text: string;
}

interface PricingCardProps {
  title: string;
  description: string;
  price: string;
  period?: string;
  features: FeatureItem[];
  buttonText: string;
  isPopular?: boolean;
  onClick?: () => void;
}

const PricingCard: React.FC<PricingCardProps> = ({
  title,
  description,
  price,
  period = "/month",
  features,
  buttonText,
  isPopular = false,
  onClick,
}) => {
  return (
    <div
      className={`relative w-72 p-8 rounded-2xl border-2 bg-white dark:bg-black dark:border-white h-full transition-all duration-200 ${
        isPopular
          ? "border-purple-600 dark:border-white"
          : "border-gray-100 dark:border-white"
      } hover:-translate-y-1 hover:shadow-md blur-sm opacity-70 pointer-events-none`}
    >
      {isPopular && (
        <div className="absolute top-3 right-3 bg-purple-600 dark:bg-white dark:text-black text-white font-extrabold rounded-full px-3 py-1 text-sm">
          POPULAR
        </div>
      )}

      {/* Title & Description */}
      <div className="flex flex-col items-start gap-3 mb-6">
        <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
          {title}
        </h3>
        <p className="text-lg text-left text-gray-600 dark:text-gray-300">
          {description}
        </p>
      </div>

      {/* Price */}
      <div className="flex items-baseline mb-6">
        <h2 className="text-4xl font-bold text-gray-900 dark:text-white">
          {price !== "Custom" && "₹"} {price}
        </h2>
        {price !== "Custom" && (
          <span className="ml-1 text-lg font-medium text-gray-600 dark:text-gray-300">
            {period}
          </span>
        )}
      </div>

      {/* Button */}
      <LoginDrawer
        triggerButton={
          <button
            className="w-full bg-purple-600 dark:bg-white dark:text-black text-white font-bold py-4 rounded-lg mb-6 hover:bg-opacity-80 dark:hover:bg-opacity-80"
            onClick={onClick}
          >
            {buttonText}
          </button>
        }
      />

      {/* Features */}
      <div className="flex flex-col gap-3">
        {features.map((feature, index) => (
          <div key={index} className="flex items-center gap-3">
            <BsCheckCircle
              className="text-purple-600 dark:text-white"
              size={20}
            />
            <span className="text-md text-gray-900 dark:text-white">
              {feature.text}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PricingCard;

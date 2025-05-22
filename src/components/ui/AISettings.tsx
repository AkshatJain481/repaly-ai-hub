import { useState } from "react";
import * as Switch from "@radix-ui/react-switch";
import CustomResponseSection from "./CustomResponseSection";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/redux/store";
import {
  setNegativeEnabled,
  setLeadsEnabled,
  setPositiveEnabled,
  setInquiryDetails,
} from "@/redux/slices/automation.slice";
import {
  FaCheck,
  FaExclamationTriangle,
  FaUserTag,
  FaQuestionCircle,
} from "react-icons/fa";

const FormField = ({
  label,
  placeholder,
  value,
  onChange,
  type = "input",
}: {
  label: string;
  placeholder: string;
  value: string;
  onChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  type?: "input" | "textarea";
}) => (
  <div className="space-y-2">
    <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
      {label}
    </label>
    {type === "textarea" ? (
      <textarea
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-purple-500 dark:focus:ring-purple-400 outline-none transition-colors resize-y min-h-[80px] text-sm"
      />
    ) : (
      <input
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-purple-500 dark:focus:ring-purple-400 outline-none transition-colors text-sm"
      />
    )}
  </div>
);

const InquiriesForm = ({
  websiteUrl,
  setWebsiteUrl,
  mobileNumber,
  setMobileNumber,
  productDetails,
  setProductDetails,
  mode,
  setMode,
}: {
  websiteUrl: string;
  setWebsiteUrl: (url: string) => void;
  mobileNumber: string;
  setMobileNumber: (number: string) => void;
  productDetails: string;
  setProductDetails: (details: string) => void;
  mode: "leave_comment" | "custom";
  setMode: (mode: "leave_comment" | "custom") => void;
}) => {
  const [isOpen, setIsOpen] = useState(mode === "custom");

  const toggleSwitch = () => {
    setProductDetails("");
    setMobileNumber("");
    setWebsiteUrl("");
    const newMode = isOpen ? "leave_comment" : "custom";
    setMode(newMode);
    setIsOpen(!isOpen);
  };

  return (
    <div className="p-6 bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-purple-200 dark:border-purple-700 transition-colors duration-200">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2 text-lg font-semibold text-purple-600 dark:text-purple-300">
          <FaQuestionCircle className="w-5 h-5" />
          Inquiries
        </div>
        <Switch.Root
          checked={isOpen}
          onCheckedChange={toggleSwitch}
          className="w-12 h-6 bg-gray-300 dark:bg-gray-600 rounded-full relative data-[state=checked]:bg-purple-600 dark:data-[state=checked]:bg-purple-500 transition-colors duration-200"
        >
          <Switch.Thumb className="block w-5 h-5 bg-white rounded-full transition-transform duration-200 translate-x-0.5 data-[state=checked]:translate-x-6" />
        </Switch.Root>
      </div>

      {isOpen && (
        <div className="space-y-4">
          <FormField
            label="Website URL"
            placeholder="https://yourwebsite.com"
            value={websiteUrl}
            onChange={(e) => setWebsiteUrl(e.target.value)}
          />
          <FormField
            label="Mobile Number"
            placeholder="+1-555-123-4567"
            value={mobileNumber}
            onChange={(e) => setMobileNumber(e.target.value)}
          />
          <FormField
            label="Product Details"
            placeholder="Briefly describe your product or service..."
            value={productDetails}
            onChange={(e) => setProductDetails(e.target.value)}
            type="textarea"
          />
        </div>
      )}
    </div>
  );
};

const AIEnabledInteractions = () => {
  const { positiveEnabled, negativeEnabled, leadsEnabled, inquiryDetails } =
    useSelector((state: RootState) => state.automation);
  const dispatch = useDispatch();

  return (
    <div className="p-6 bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-600 transition-colors duration-200">
      <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-6">
        AI-Enabled Interactions
      </h2>

      <div className="space-y-6">
        <CustomResponseSection
          icon={<FaCheck className="w-5 h-5" />}
          title="Positive Comments"
          mode={positiveEnabled}
          setMode={(payload) => dispatch(setPositiveEnabled(payload))}
          color="green"
        />

        <CustomResponseSection
          icon={<FaExclamationTriangle className="w-5 h-5" />}
          title="Negative Comments"
          mode={negativeEnabled}
          setMode={(payload) => dispatch(setNegativeEnabled(payload))}
          color="red"
        />

        <CustomResponseSection
          icon={<FaUserTag className="w-5 h-5" />}
          title="Leads / Potential Buyers"
          mode={leadsEnabled}
          setMode={(payload) => dispatch(setLeadsEnabled(payload))}
          color="blue"
        />

        <InquiriesForm
          websiteUrl={inquiryDetails.websiteUrl}
          setWebsiteUrl={(url) =>
            dispatch(setInquiryDetails({ ...inquiryDetails, websiteUrl: url }))
          }
          mobileNumber={inquiryDetails.mobileNumber}
          setMobileNumber={(num) =>
            dispatch(
              setInquiryDetails({ ...inquiryDetails, mobileNumber: num })
            )
          }
          productDetails={inquiryDetails.productDetails}
          setProductDetails={(details) =>
            dispatch(
              setInquiryDetails({ ...inquiryDetails, productDetails: details })
            )
          }
          mode={inquiryDetails.responseMode}
          setMode={(mode) =>
            dispatch(
              setInquiryDetails({ ...inquiryDetails, responseMode: mode })
            )
          }
        />
      </div>
    </div>
  );
};

export default AIEnabledInteractions;

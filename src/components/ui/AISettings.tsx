// components/AIEnabledInteractions.tsx
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
  <div className="space-y-1">
    <p className="text-sm text-gray-500">{label}</p>
    {type === "textarea" ? (
      <textarea
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className="w-full p-2 border border-gray-300 rounded-md resize-y text-sm"
      />
    ) : (
      <input
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className="w-full p-2 border border-gray-300 rounded-md text-sm"
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
    <div className="p-4 bg-white rounded-md shadow-sm border border-purple-200">
      <div className="flex items-center justify-between mb-4">
        <p className="font-bold flex gap-2 items-center text-purple-600">
          <FaQuestionCircle />
          Inquiries
        </p>
        <Switch.Root
          checked={isOpen}
          onCheckedChange={toggleSwitch}
          className="w-[44px] h-[24px] bg-gray-300 data-[state=checked]:bg-purple-600 rounded-full relative transition-colors duration-200"
        >
          <Switch.Thumb className="block w-[20px] h-[20px] bg-white rounded-full transition-transform duration-200 translate-x-1 data-[state=checked]:translate-x-[20px]" />
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
    <div className="shadow-lg border border-gray-200 p-6 rounded-lg">
      <h2 className="text-lg font-bold mb-6">AI-Enabled Interactions</h2>

      <div className="space-y-5">
        <CustomResponseSection
          icon={<FaCheck />}
          title="Positive Comments"
          mode={positiveEnabled}
          setMode={(payload) => dispatch(setPositiveEnabled(payload))}
          color="green"
        />

        <CustomResponseSection
          icon={<FaExclamationTriangle />}
          title="Negative Comments"
          mode={negativeEnabled}
          setMode={(payload) => dispatch(setNegativeEnabled(payload))}
          color="red"
        />

        <CustomResponseSection
          icon={<FaUserTag />}
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

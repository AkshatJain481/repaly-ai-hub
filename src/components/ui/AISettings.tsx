
import { useState } from "react";
import CustomResponseSection from "./CustomResponseSection";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/redux/store";
import {
  setNegativeEnabled,
  setLeadsEnabled,
  setPositiveEnabled,
  setInquiryDetails,
} from "@/redux/slices/automation.slice";
import { FaCheck, FaExclamationTriangle, FaUserTag, FaQuestionCircle } from "react-icons/fa";
import { Switch } from "@chakra-ui/react";

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
  return (
    <div className="p-4 bg-white rounded-md shadow-sm border border-purple-200">
      <div className="flex items-center justify-between mb-4">
        <p className="font-bold flex gap-2 items-center text-purple-600">
          <FaQuestionCircle />
          Inquiries
        </p>
        <div className="relative inline-flex items-center">
          <input
            type="checkbox"
            checked={isOpen}
            onChange={() => {
              setProductDetails("");
              setMobileNumber("");
              setWebsiteUrl("");
              setMode(isOpen ? "leave_comment" : "custom");
              setIsOpen(!isOpen);
            }}
            className="sr-only"
          />
          <div
            className={`block w-14 h-8 rounded-full ${
              isOpen ? "bg-purple-600" : "bg-gray-300"
            } transition-colors duration-200`}
          >
            <div
              className={`dot absolute left-1 top-1 bg-white w-6 h-6 rounded-full transition-transform duration-200 ${
                isOpen ? "transform translate-x-6" : ""
              }`}
            ></div>
          </div>
        </div>
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
          setWebsiteUrl={(payload) =>
            dispatch(
              setInquiryDetails({ ...inquiryDetails, websiteUrl: payload })
            )
          }
          mobileNumber={inquiryDetails.mobileNumber}
          setMobileNumber={(payload) =>
            dispatch(
              setInquiryDetails({ ...inquiryDetails, mobileNumber: payload })
            )
          }
          productDetails={inquiryDetails.productDetails}
          setProductDetails={(payload) =>
            dispatch(
              setInquiryDetails({ ...inquiryDetails, productDetails: payload })
            )
          }
          mode={inquiryDetails.responseMode}
          setMode={(payload) =>
            dispatch(
              setInquiryDetails({ ...inquiryDetails, responseMode: payload })
            )
          }
        />
      </div>
    </div>
  );
};

export default AIEnabledInteractions;

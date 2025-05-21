import { useState } from "react";
import {
  Box,
  VStack,
  Text,
  Textarea,
  Input,
  Heading,
  Flex,
  Switch,
} from "@chakra-ui/react";
import {
  FaCheck,
  FaExclamationTriangle,
  FaUserTag,
  FaQuestionCircle,
} from "react-icons/fa";
import CustomResponseSection from "./CustomResponseSection";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/redux/store";
import {
  setNegativeEnabled,
  setLeadsEnabled,
  setPositiveEnabled,
  setInquiryDetails,
} from "@/redux/slices/automation.slice";

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
  <Box>
    <Text fontSize="sm" mb={1} color="gray.500">
      {label}
    </Text>
    {type === "textarea" ? (
      <Textarea
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        size="sm"
        resize="vertical"
      />
    ) : (
      <Input
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        size="sm"
      />
    )}
  </Box>
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
    <Box
      p={4}
      bg="white"
      borderRadius="md"
      boxShadow="sm"
      border={1}
      borderColor="purple.200"
      borderStyle={"solid"}
    >
      <Flex alignItems="center" justifyContent={"space-between"} mb={4}>
        <Text
          fontWeight="bold"
          display={"flex"}
          gap={2}
          alignItems="center"
          color={"purple.600"}
        >
          <FaQuestionCircle />
          Inquiries
        </Text>
        <Switch.Root colorPalette={"purple"} size={"lg"} checked={isOpen}>
          <Switch.HiddenInput />
          <Switch.Control
            onClick={() => {
              setProductDetails("");
              setMobileNumber("");
              setWebsiteUrl("");
              setMode(isOpen ? "leave_comment" : "custom");
              setIsOpen(!isOpen);
            }}
          />
          <Switch.Label />
        </Switch.Root>
      </Flex>

      {isOpen && (
        <VStack gap={4} align="stretch">
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
        </VStack>
      )}
    </Box>
  );
};

const AIEnabledInteractions = () => {
  const { positiveEnabled, negativeEnabled, leadsEnabled, inquiryDetails } =
    useSelector((state: RootState) => state.automation);
  const dispatch = useDispatch();

  return (
    <Box
      shadow="lg"
      border={1}
      borderStyle="solid"
      borderColor="gray.200"
      p={6}
      borderRadius="lg"
    >
      <Heading size="md" mb={6}>
        AI-Enabled Interactions
      </Heading>

      <VStack gap={5} align="stretch">
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
      </VStack>
    </Box>
  );
};

export default AIEnabledInteractions;

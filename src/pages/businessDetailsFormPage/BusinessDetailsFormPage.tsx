import { HStack, Image, Stack, Text } from "@chakra-ui/react";
import SingleChoiceQuestion from "./SingleChoiceQuestion";
import { Questions } from "@/utils/constants";
import MultipleChoiceQuestion from "./MultipleChoiceQuestion";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { updateNumberOfQuestion } from "../../redux/slices/businessDetails.slice";
import { useNavigate } from "react-router-dom";
import { useSetBusinessDetailMutation } from "@/apis/user";
import { useEffect } from "react";
import { UserBusinessDetails } from "../../utils/interfaces";
import { getDynamicContent } from "@/utils/commonFunctions";
import { toast } from "react-toastify";

const BusinessDetailsFormPage = () => {
  const currentQuestionNumber = useSelector(
    (state: RootState) => state.businessDetails.currentQuestion
  );
  const currentQuestion = Questions[currentQuestionNumber] || {};
  const { numberOfQuestions, queries } = useSelector(
    (state: RootState) => state.businessDetails
  );
  const [setBusinessDetail] = useSetBusinessDetailMutation();
  const { message, description, image } = getDynamicContent(queries);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(updateNumberOfQuestion(Questions.length));
  }, [dispatch]);

  const submitForm = async () => {
    try {
      const payload: UserBusinessDetails = {
        queries,
      };
      await setBusinessDetail(payload).unwrap();
      toast.success("Details successfully filled!");
      navigate("/dashboard");
    } catch (error) {
      console.error("Error submitting form:", error);
      toast.error("Unexpected error filling form, please try again later!");
      navigate("/");
    }
  };

  useEffect(() => {
    if (Questions.length === currentQuestionNumber) {
      submitForm();
    }
  }, [numberOfQuestions, currentQuestionNumber, queries, navigate]);
  return (
    <HStack height={"100vh"} gap={0} bg="white">
      <Stack
        height="100vh"
        p="4"
        gap={1}
        display={{ base: "none", lg: "flex" }}
        width={{ base: "1/2", xl: "2/5" }}
        bg="purple.200"
      >
        <Text pb="24" fontSize={"4xl"}>
          REPALY
        </Text>
        <Image maxH="400px" src={image} fit="contain" />
        <Text pt="6" px="4" fontSize={"3xl"} fontWeight={"bold"}>
          {message}
        </Text>
        <Text px="4" color={"gray"} textJustify={"auto"}>
          {description}
        </Text>
      </Stack>
      <Stack flex="1" height={"100vh"} width={{ base: "1/2", xl: "3/5" }}>
        {currentQuestion.type === "single-choice" && (
          <SingleChoiceQuestion
            skipable={currentQuestion.skipable}
            question={currentQuestion.question}
            options={currentQuestion.options}
            completePercentage={currentQuestion.completePercentage}
          />
        )}
        {currentQuestion.type === "multiple-choice" && (
          <MultipleChoiceQuestion
            skipable={currentQuestion.skipable}
            question={currentQuestion.question}
            options={currentQuestion.options}
            completePercentage={currentQuestion.completePercentage}
          />
        )}
      </Stack>
    </HStack>
  );
};

export default BusinessDetailsFormPage;

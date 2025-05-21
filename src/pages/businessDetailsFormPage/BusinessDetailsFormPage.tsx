
import { useState, useEffect } from "react";
import SingleChoiceQuestion from "./SingleChoiceQuestion";
import { Questions } from "@/utils/constants";
import MultipleChoiceQuestion from "./MultipleChoiceQuestion";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { updateNumberOfQuestion } from "../../redux/slices/businessDetails.slice";
import { useNavigate } from "react-router-dom";
import { useSetBusinessDetailMutation } from "@/apis/user";
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
    <div className="flex h-screen gap-0 bg-background">
      <div className="hidden lg:flex flex-col h-screen p-4 gap-1 w-1/2 xl:w-2/5 bg-purple-200">
        <div className="pb-24 text-4xl">REPALY</div>
        <img className="max-h-[400px] object-contain" src={image} alt="Illustration" />
        <h2 className="pt-6 px-4 text-3xl font-bold">{message}</h2>
        <p className="px-4 text-gray-700 text-justify">{description}</p>
      </div>
      <div className="flex-1 h-screen w-1/2 xl:w-3/5">
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
      </div>
    </div>
  );
};

export default BusinessDetailsFormPage;

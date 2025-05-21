
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addDetails, removeDetails } from "../../redux/slices/businessDetails.slice";
import { Query } from "@/utils/interfaces";
import { RootState } from "@/redux/store";
import { Questions } from "@/utils/constants";
import { useNavigate } from "react-router-dom";
import CardIcon from "../../components/common/CardIcon";
import ProgressBar from "../../components/ui/ProgressBar";

type SingleChoiceQuestionProps = {
  question: string;
  skipable: boolean;
  options: {
    value: string;
    title: string;
    icon: string;
  }[];
  completePercentage: number;
};

const SingleChoiceQuestion: React.FC<SingleChoiceQuestionProps> = ({
  skipable,
  question,
  options,
  completePercentage,
}) => {
  const navigate = useNavigate();
  const [answer, setAnswer] = useState("");
  const [isOtherFlag, setOtherFlag] = useState(false);
  const [nextButtonFlag, setNextButtonFlag] = useState(false);
  const currentQuestion = useSelector(
    (state: RootState) => state.businessDetails.currentQuestion
  );
  const dispatch = useDispatch();

  const cardSelected = (value: string) => {
    setAnswer(
      value === "other" || question === "Please provide your contact details."
        ? ""
        : value
    );
    setOtherFlag(value === "other");
  };

  const inputChange = (value: string) => {
    setAnswer(value.length > 2 ? value : "");
  };

  const nextButtonClick = () => {
    const query: Query = {
      question,
      type: "single_choice_question",
      answer,
    };
    dispatch(addDetails(query));
    clearAnswer();
  };

  const clearAnswer = () => {
    setAnswer("");
    setOtherFlag(false);
  };

  const skipButtonClick = () => {
    const query: Query = {
      question,
      type: "single_choice_question",
      answer: "skipped",
    };
    dispatch(addDetails(query));
    clearAnswer();
  };

  const backButtonClick = () => {
    clearAnswer();
    if (currentQuestion === 0) {
      navigate("/");
    } else {
      dispatch(removeDetails(Questions[currentQuestion - 1].question));
    }
  };

  useEffect(() => {
    setNextButtonFlag(answer.length !== 0);
  }, [answer]);

  return (
    <div className="flex flex-col gap-4 p-8 m-auto max-w-3xl">
      <h2 className="text-4xl pb-8 leading-tight text-primary font-bold">
        {question}
      </h2>

      <div className="grid grid-cols-2 gap-2">
        {options.map((item) => (
          <div
            key={item.value}
            className={`flex flex-col items-center justify-center p-4 rounded-md border-2 cursor-pointer transition-colors
              ${answer === item.value ? "border-primary bg-primary/10" : "border-border hover:bg-accent"}
            `}
            onClick={() => cardSelected(item.value)}
          >
            <div className="mb-2">
              <CardIcon icon={item.icon} color="hsl(var(--primary))" />
            </div>
            <span className="text-center">{item.title}</span>
          </div>
        ))}
      </div>

      {isOtherFlag && (
        <input
          className="w-full px-4 py-2 border border-input rounded-md"
          placeholder="Please specify..."
          onChange={(e) => inputChange(e.target.value)}
        />
      )}

      <div className="flex gap-2 mt-2">
        <Button
          variant="outline"
          onClick={backButtonClick}
          className="font-bold"
        >
          {currentQuestion ? "Back" : "Cancel"}
        </Button>
        
        {nextButtonFlag && (
          <Button
            onClick={nextButtonClick}
            className="font-bold"
          >
            {currentQuestion === Questions.length - 1 ? "Finish" : "Next"}
          </Button>
        )}
        
        {skipable && (
          <Button
            onClick={skipButtonClick}
            className="font-bold"
          >
            Skip
          </Button>
        )}
      </div>

      <ProgressBar completePercentage={completePercentage} />
    </div>
  );
};

export default SingleChoiceQuestion;

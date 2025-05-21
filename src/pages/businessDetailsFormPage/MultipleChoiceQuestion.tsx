
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import ProgressBar from "../../components/ui/ProgressBar";
import CardIcon from "../../components/common/CardIcon";
import { addDetails, removeDetails } from "../../redux/slices/businessDetails.slice";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { Query } from "@/utils/interfaces";
import { useNavigate } from "react-router-dom";
import { Questions } from "@/utils/constants";

type MultipleChoiceQuestionProps = {
  question: string;
  skipable: boolean;
  options: {
    value: string;
    title: string;
    icon: string;
  }[];
  completePercentage: number;
};

const MultipleChoiceQuestion: React.FC<MultipleChoiceQuestionProps> = ({
  skipable,
  question,
  options,
  completePercentage,
}) => {
  const navigate = useNavigate();
  const [answer, setAnswer] = useState<string[]>([]);
  const [nextButtonFlag, setNextButtonFlag] = useState(false);
  const [isContactDetailsPage, setIsContactDetailsPage] = useState(false);
  const [values, setValues] = useState<{ [key: string]: string }>({});
  
  const handleChange = (
    key: string,
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setValues((prev) => ({
      ...prev,
      [key]: event.target.value,
    }));
  };

  const dispatch = useDispatch();
  const currentQuestion = useSelector(
    (state: RootState) => state.businessDetails.currentQuestion
  );
  
  const toggleOption = (value: string) => {
    setAnswer(prev => 
      prev.includes(value) 
        ? prev.filter(item => item !== value) 
        : [...prev, value]
    );
  };

  const nextButtonClick = () => {
    const query: Query = {
      question,
      type: "multiple_choice_question",
      answer: isContactDetailsPage ? JSON.stringify(values) : answer,
    };
    dispatch(addDetails(query));
    clearAnswer();
  };

  const skipButtonClick = () => {
    const query: Query = {
      question,
      type: "multiple_choice_question",
      answer: "skipped",
    };
    dispatch(addDetails(query));
    clearAnswer();
  };

  const clearAnswer = () => {
    setAnswer([]);
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
    setNextButtonFlag(answer.length > 0);
    setIsContactDetailsPage(
      question === "Please provide your contact details."
    );
  }, [answer, question]);

  return (
    <div className="flex flex-col gap-6 p-8 max-w-3xl m-auto">
      <h2 className="text-4xl font-bold text-primary">
        {question}
      </h2>
      
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
        {options.map((item) => (
          <div
            key={item.value}
            onClick={() => toggleOption(item.value)}
            className={`flex flex-col items-center justify-center p-4 rounded-md border-2 cursor-pointer transition-colors
              ${answer.includes(item.value) ? "border-primary bg-primary/10" : "border-border hover:bg-accent"}
            `}
          >
            <div className="mb-2">
              <CardIcon icon={item.icon} color="hsl(var(--primary))" />
            </div>
            <span className="text-center">{item.title}</span>
          </div>
        ))}
      </div>
      
      {isContactDetailsPage && (
        <>
          <p className="text-sm text-red-500">
            *We WILL share your contact details with your viewers.
          </p>
          {/* Contact details */}
          {answer?.map((item) => (
            <input
              key={item}
              type={item}
              placeholder={item + "..."}
              value={values[item] || ""}
              onChange={(e) => handleChange(item, e)}
              className="w-full px-4 py-2 border border-input rounded-md"
            />
          ))}
        </>
      )}
      
      <div className="flex gap-2">
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

export default MultipleChoiceQuestion;

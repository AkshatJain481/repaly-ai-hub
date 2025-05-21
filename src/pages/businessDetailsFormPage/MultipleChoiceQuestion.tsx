import { Button, CheckboxGroup, Grid, Input, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import ProgressBar from "../../components/ui/ProgressBar";
import { CheckboxCard } from "@/components/common/CheckboxCard";
import CardIcon from "../../components/common/CardIcon";
import {
  addDetails,
  removeDetails,
} from "../../redux/slices/businessDetails.slice";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { Query } from "@/utils/interfaces";
import { useNavigate } from "react-router-dom";
import { primaryColor, Questions } from "@/utils/constants";

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
  }, [answer]);

  return (
    <CheckboxGroup
      gap={6}
      p={8}
      maxW={"3xl"}
      value={answer}
      onValueChange={(value) => setAnswer(value)}
      m={"auto"}
    >
      <Text fontSize={"4xl"} color={primaryColor} fontWeight={"bold"}>
        {question}
      </Text>
      <Grid
        templateColumns={{ base: "repeat(2, 1fr)", sm: "repeat(3, 1fr)" }}
        gap={2}
      >
        {options.map((item) => (
          <CheckboxCard
            color={"purple.600"}
            colorPalette={"purple"}
            key={item.value}
            value={item.value}
            label={item.title}
            icon={<CardIcon icon={item.icon} color={primaryColor} />}
          />
        ))}
      </Grid>
      {isContactDetailsPage && (
        <>
          <Text fontSize={"sm"} color={"red.500"}>
            *We WILL share your contact details with your viewers.
          </Text>
          {/* Contact details */}
          {answer?.map((item) => (
            <Input
              key={item}
              type={item}
              placeholder={item + "..."}
              value={values[item] || ""}
              onChange={(e) => handleChange(item, e)}
            />
          ))}
        </>
      )}
      <Button
        onClick={backButtonClick}
        colorPalette={"purple"}
        variant={"outline"}
        fontWeight={"bold"}
      >
        {currentQuestion ? "Back" : "Cancel"}
      </Button>
      {nextButtonFlag && (
        <Button
          onClick={nextButtonClick}
          colorPalette={"purple"}
          variant={"solid"}
          fontWeight={"bold"}
        >
          {currentQuestion === Questions.length - 1 ? "Finish" : "Next"}
        </Button>
      )}
      {skipable && (
        <Button
          onClick={skipButtonClick}
          colorPalette={"purple"}
          fontWeight={"bold"}
          variant={"solid"}
        >
          Skip
        </Button>
      )}
      <ProgressBar completePercentage={completePercentage} />
    </CheckboxGroup>
  );
};

export default MultipleChoiceQuestion;

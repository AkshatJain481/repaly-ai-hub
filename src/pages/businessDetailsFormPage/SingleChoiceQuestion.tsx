import { Button, Grid, GridItem, Input } from "@chakra-ui/react";
import {
  RadioCardItem,
  RadioCardLabel,
  RadioCardRoot,
} from "@/components/ui/RadioCard";
import ProgressBar from "../../components/ui/ProgressBar";
import { useEffect, useState } from "react";
import CardIcon from "../../components/common/CardIcon";
import { useDispatch, useSelector } from "react-redux";
import {
  addDetails,
  removeDetails,
} from "../../redux/slices/businessDetails.slice";
import { Query } from "@/utils/interfaces";
import { RootState } from "@/redux/store";
import { primaryColor, Questions } from "@/utils/constants";
import { useNavigate } from "react-router-dom";

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
    <RadioCardRoot
      key={currentQuestion}
      gap={4}
      p={8}
      maxW={"3xl"}
      onValueChange={({ value }) => cardSelected(value)}
      m={"auto"}
    >
      <RadioCardLabel
        fontSize={"4xl"}
        pb={8}
        lineHeight={"1.2"}
        color={primaryColor}
        fontWeight={"bold"}
      >
        {question}
      </RadioCardLabel>
      <Grid templateColumns="repeat(2, 1fr)" gap={2}>
        {options.map((item) => (
          <RadioCardItem
            colorPalette={"purple"}
            color={"purple.600"}
            key={item.value}
            indicator={false}
            value={item.value}
            label={item.title}
            icon={<CardIcon icon={item.icon} color={primaryColor} />}
          />
        ))}
        <GridItem colSpan={2}>
          {isOtherFlag && (
            <Input
              placeholder="Please specify..."
              size={"xl"}
              onChange={(e) => inputChange(e.target.value)}
            />
          )}
        </GridItem>
      </Grid>
      <Button
        onClick={backButtonClick}
        colorPalette={"purple"}
        fontWeight={"bold"}
        variant={"outline"}
      >
        {currentQuestion ? "Back" : "Cancel"}
      </Button>
      {nextButtonFlag && (
        <Button
          onClick={nextButtonClick}
          colorPalette={"purple"}
          fontWeight={"bold"}
          variant={"solid"}
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
    </RadioCardRoot>
  );
};

export default SingleChoiceQuestion;

import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Query } from "@/utils/interfaces";

interface BusinessDetailsDTO {
  currentQuestion: number;
  queries: Query[];
  numberOfQuestions: number;
}

const businessDetailsSlice = createSlice({
  name: "BusinessDetails",
  initialState: {
    currentQuestion: 0,
    queries: [],
    numberOfQuestions: 1,
  } as BusinessDetailsDTO,
  reducers: {
    addDetails: (state, action: PayloadAction<Query>) => {
      state.queries.push(action.payload);
      state.currentQuestion = state.queries.length;
    },
    removeDetails: (state, action: PayloadAction<string>) => {
      state.queries = state.queries.filter(
        (query) => query.question !== action.payload,
      );
      state.currentQuestion = state.queries.length;
    },
    updateNumberOfQuestion: (state, action: PayloadAction<number>) => {
      state.numberOfQuestions = action.payload;
    },
  },
});

export const { addDetails, removeDetails, updateNumberOfQuestion } =
  businessDetailsSlice.actions;

export default businessDetailsSlice.reducer;

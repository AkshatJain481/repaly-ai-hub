import { StoryDetails } from "@/utils/interfaces";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AutomationState {
  storyDetails: StoryDetails | null;
  tags: string[];
  responseDM: string;
  fields: { tags: string[]; responseDM: string }[];
}

const initialState: AutomationState = {
  storyDetails: null,
  tags: [],
  responseDM: "",
  fields: [],
};

const storyAutomationSlice = createSlice({
  name: "StoryAutomation",
  initialState,
  reducers: {
    addField: (
      state,
      action: PayloadAction<{ tags: string[]; responseDM: string }>
    ) => {
      state.fields.push(action.payload);
    },
    removeField: (state, action: PayloadAction<number>) => {
      state.fields.splice(action.payload, 1);
    },
    setFields: (
      state,
      action: PayloadAction<{ tags: string[]; responseDM: string }[]>
    ) => {
      state.fields = action.payload;
    },
    setTags: (state, action: PayloadAction<string[]>) => {
      state.tags = action.payload;
    },
    setResponse: (state, action: PayloadAction<string>) => {
      state.responseDM = action.payload;
    },
    setStoryDetails: (state, action: PayloadAction<StoryDetails | null>) => {
      state.storyDetails = action.payload;
    },
  },
});

export const {
  addField,
  removeField,
  setFields,
  setTags,
  setResponse,
  setStoryDetails,
} = storyAutomationSlice.actions;

export default storyAutomationSlice.reducer;

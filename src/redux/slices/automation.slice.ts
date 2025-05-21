import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { InquiryDetails, MediaDetailsProp } from "../../utils/interfaces";

export interface TagValueProp {
  tags: string[];
  responseComment: string;
  responseDM: string;
  mode: boolean;
}

export interface AIResponseSettings {
  responseMode: "ai_enabled" | "custom" | "leave_comment";
  response: string;
}

interface AutomationState {
  tags: string[];
  responseComment: string;
  responseDM: string;
  mode: boolean;
  fields: TagValueProp[];
  positiveEnabled: AIResponseSettings;
  negativeEnabled: AIResponseSettings;
  leadsEnabled: AIResponseSettings;
  inquiryDetails: InquiryDetails;
  mediaDetails: MediaDetailsProp | null;
}

const initialResponseSettings: AIResponseSettings = {
  responseMode: "leave_comment",
  response: "",
};

const initialState: AutomationState = {
  tags: [],
  responseComment: "",
  responseDM: "",
  mode: true,
  fields: [],
  positiveEnabled: initialResponseSettings,
  negativeEnabled: initialResponseSettings,
  leadsEnabled: initialResponseSettings,
  inquiryDetails: {
    responseMode: "leave_comment",
    websiteUrl: "",
    mobileNumber: "",
    productDetails: "",
  },
  mediaDetails: null,
};

const automationSlice = createSlice({
  name: "Automation",
  initialState,
  reducers: {
    addField: (state, action: PayloadAction<TagValueProp>) => {
      state.fields.push(action.payload);
    },
    removeField: (state, action: PayloadAction<number>) => {
      state.fields.splice(action.payload, 1);
    },
    setFields: (state, action: PayloadAction<TagValueProp[]>) => {
      state.fields = action.payload;
    },
    setPositiveEnabled: (state, action: PayloadAction<AIResponseSettings>) => {
      state.positiveEnabled = action.payload;
    },
    setNegativeEnabled: (state, action: PayloadAction<AIResponseSettings>) => {
      state.negativeEnabled = action.payload;
    },
    setLeadsEnabled: (state, action: PayloadAction<AIResponseSettings>) => {
      state.leadsEnabled = action.payload;
    },
    setInquiryDetails: (state, action: PayloadAction<InquiryDetails>) => {
      state.inquiryDetails = action.payload;
    },
    setMediaDetails: (
      state,
      action: PayloadAction<MediaDetailsProp | null>
    ) => {
      state.mediaDetails = action.payload;
    },
    setTags: (state, action: PayloadAction<string[]>) => {
      state.tags = action.payload;
    },
    setResponseComment: (state, action: PayloadAction<string>) => {
      state.responseComment = action.payload;
    },
    setResponseDM: (state, action: PayloadAction<string>) => {
      state.responseDM = action.payload;
    },
    setMode: (state, action: PayloadAction<boolean>) => {
      state.mode = action.payload;
    },
  },
});

export const {
  addField,
  removeField,
  setFields,
  setPositiveEnabled,
  setNegativeEnabled,
  setLeadsEnabled,
  setInquiryDetails,
  setMediaDetails,
  setTags,
  setResponseComment,
  setResponseDM,
  setMode,
} = automationSlice.actions;

export default automationSlice.reducer;

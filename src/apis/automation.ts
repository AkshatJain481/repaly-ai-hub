import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { replaceUrlParams } from "@/utils/commonFunctions";
import {
  ApplyAutomationURL,
  SuggestReplyURL,
  GenerateTagsURL,
  InstagramStoryAutomationURL,
} from "@/utils/backend_urls";
import { RootState } from "@/redux/store";
import {
  QueryReturnValue,
  FetchBaseQueryError,
  FetchBaseQueryMeta,
} from "@reduxjs/toolkit/query/react";

export const automationAPI = createApi({
  reducerPath: "automationAPI",
  baseQuery: fetchBaseQuery({
    prepareHeaders: (headers) => {
      const token = localStorage.getItem("user-token");
      if (token) headers.set("Authorization", `Bearer ${token}`);
      return headers;
    },
  }),
  endpoints: (builder) => ({
    putAutomation: builder.mutation<void, { mediaId: string }>({
      async queryFn({ mediaId }, _queryApi, _extraOptions, fetchWithBQ) {
        const state: RootState = _queryApi.getState() as RootState;
        const {
          positiveEnabled,
          negativeEnabled,
          leadsEnabled,
          inquiryDetails,
          fields,
        } = state.automation;

        // Validations
        if (
          positiveEnabled.responseMode === "custom" &&
          !positiveEnabled.response.trim()
        ) {
          return {
            error: {
              status: 400,
              data: "Positive Comment Response cannot be empty.",
            },
          };
        }

        if (
          negativeEnabled.responseMode === "custom" &&
          !negativeEnabled.response.trim()
        ) {
          return {
            error: {
              status: 400,
              data: "Negative Comment Response cannot be empty.",
            },
          };
        }

        if (
          leadsEnabled.responseMode === "custom" &&
          !leadsEnabled.response.trim()
        ) {
          return {
            error: {
              status: 400,
              data: "Potential Buyer Response cannot be empty.",
            },
          };
        }

        if (
          inquiryDetails.responseMode === "custom" &&
          !inquiryDetails.websiteUrl &&
          !inquiryDetails.mobileNumber &&
          !inquiryDetails.productDetails
        ) {
          return {
            error: {
              status: 400,
              data: "Please fill at least one field in Inquiries Section.",
            },
          };
        }

        const payload = {
          tag_and_value_pair: fields,
          ai_enabled: {
            positive_comments: {
              mode: positiveEnabled.responseMode,
              value: positiveEnabled.response,
            },
            negative_comments: {
              mode: negativeEnabled.responseMode,
              value: negativeEnabled.response,
            },
            potential_buyers: {
              mode: leadsEnabled.responseMode,
              value: leadsEnabled.response,
            },
            inquiries: {
              mode: inquiryDetails.responseMode,
              value: {
                website_url: inquiryDetails.websiteUrl,
                mobile_no: inquiryDetails.mobileNumber,
                product_details: inquiryDetails.productDetails,
              },
            },
          },
        };

        const result = (await fetchWithBQ({
          url: replaceUrlParams(ApplyAutomationURL, { mediaId }),
          method: "PUT",
          body: payload,
        })) as QueryReturnValue<void, FetchBaseQueryError, FetchBaseQueryMeta>;

        return result;
      },
    }),

    turnOffAutomation: builder.mutation<void, { mediaId: string }>({
      async queryFn({ mediaId }, _queryApi, _extraOptions, fetchWithBQ) {
        const result = (await fetchWithBQ({
          url: replaceUrlParams(ApplyAutomationURL, { mediaId }),
          method: "PUT",
          body: {
            tag_and_value_pair: [],
            ai_enabled: {
              positive_comments: {
                mode: "leave_comment",
                value: "",
              },
              negative_comments: {
                mode: "leave_comment",
                value: "",
              },
              potential_buyers: {
                mode: "leave_comment",
                value: "",
              },
              inquiries: {
                mode: "leave_comment",
                value: {
                  website_url: "",
                  mobile_no: "",
                  product_details: "",
                },
              },
            },
          },
        })) as QueryReturnValue<void, FetchBaseQueryError, FetchBaseQueryMeta>;

        return result;
      },
    }),

    suggestReply: builder.mutation<
      string[],
      {
        mode: "comment_dm" | "comment";
        responseTarget: "comment" | "dm";
        captions: string;
        tags: string[];
      }
    >({
      async queryFn(
        { mode, responseTarget, captions, tags },
        _queryApi,
        _extraOptions,
        fetchWithBQ
      ) {
        const state: RootState = _queryApi.getState() as RootState;
        const { inquiryDetails } = state.automation;

        const payload = {
          mode,
          responseTarget,
          captions,
          tags,
          inquiries: {
            mobile_no: inquiryDetails.mobileNumber,
            product_details: inquiryDetails.productDetails,
            website_url: inquiryDetails.websiteUrl,
          },
        };

        const result = (await fetchWithBQ({
          url: SuggestReplyURL, // replace this with your actual URL
          method: "POST",
          body: payload,
        })) as QueryReturnValue<any, FetchBaseQueryError, FetchBaseQueryMeta>;

        return result;
      },
    }),
    generateTags: builder.query<string[], string>({
      query: (captions) => ({
        url: GenerateTagsURL,
        method: "POST",
        body: { captions },
      }),
    }),

    storyAutomation: builder.mutation<any, string>({
      async queryFn(storyId, _queryApi, _extraOptions, fetchWithBQ) {
        const state = _queryApi.getState() as RootState;
        const { fields } = state.storyAutomation;

        const response = await fetchWithBQ({
          url: replaceUrlParams(InstagramStoryAutomationURL, { storyId }),
          method: "PUT",
          body: {
            tag_and_value_pair: fields,
          },
        });

        return response;
      },
    }),
  }),
});

export const {
  useTurnOffAutomationMutation,
  useStoryAutomationMutation,
  usePutAutomationMutation,
  useSuggestReplyMutation,
  useGenerateTagsQuery,
} = automationAPI;

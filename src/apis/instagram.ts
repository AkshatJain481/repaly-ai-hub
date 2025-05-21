import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {
  InstagramGetMediaURL,
  InstagramPutMediaURL,
  InstagramDeleteAccountURL,
  InstagramMediaAnalyticsURL,
  InstagramGetStoriesURL,
  InstagramPutStoriesURL,
  InstagramMediaDetailsURL,
  InstagramGetStoryDetailsURL,
  InstagramGetMediaCommentTimeSeriesURL,
  InstagramGetStoryAnalyticsURL,
} from "@/utils/backend_urls";
import { replaceUrlParams } from "@/utils/commonFunctions";
// import { RootState } from "@/redux/store";
import { InstagramGetMediaCommmentsURL } from "../utils/backend_urls";
import {
  setFields,
  setInquiryDetails,
  setLeadsEnabled,
  setMediaDetails,
  setNegativeEnabled,
  setPositiveEnabled,
} from "@/redux/slices/automation.slice";
import {
  setFields as setStoryFields,
  setStoryDetails,
} from "@/redux/slices/storyAutomation.slice";
import {
  InstagramMediaAnalytics,
  CommentTimeseriesResponse,
} from "@/utils/interfaces";

export const instagramAPI = createApi({
  reducerPath: "instagramAPI",
  keepUnusedDataFor: 1200,
  baseQuery: fetchBaseQuery({
    prepareHeaders: (headers) => {
      const token = localStorage.getItem("user-token");
      if (token) headers.set("Authorization", `Bearer ${token}`);
      return headers;
    },
  }),
  endpoints: (builder) => ({
    // 🧠 GET + PUT recent media
    getRecentMedia: builder.query<any, string>({
      async queryFn(accountId, _queryApi, _extraOptions, fetchWithBQ) {
        if (!accountId) {
          return { error: { status: 400, data: "Missing active account ID" } };
        }

        // Call PUT first
        const putRes = await fetchWithBQ({
          url: replaceUrlParams(InstagramPutMediaURL, { accountId }),
          method: "PUT",
        });

        if (putRes.error) return { error: putRes.error };

        // Then GET
        const getRes = await fetchWithBQ({
          url: replaceUrlParams(InstagramGetMediaURL, { accountId }),
          method: "GET",
        });

        return getRes.error ? { error: getRes.error } : { data: getRes.data };
      },
    }),

    // ✅ DELETE Instagram account
    deleteInstagramAccount: builder.mutation<any, string>({
      query: (accountId) => ({
        url: replaceUrlParams(InstagramDeleteAccountURL, { accountId }),
        method: "DELETE",
      }),
    }),

    // ✅ GET media analytics
    getMediaAnalytics: builder.query<InstagramMediaAnalytics, string>({
      query: (mediaId) => ({
        url: replaceUrlParams(InstagramMediaAnalyticsURL, { mediaId }),
        method: "GET",
      }),
    }),

    getMediaGraphAnalytics: builder.query<CommentTimeseriesResponse, string>({
      query: (mediaId) => ({
        url: replaceUrlParams(InstagramGetMediaCommentTimeSeriesURL, {
          mediaId,
        }),
        method: "GET",
      }),
    }),

    getMediaComments: builder.query<any, { mediaId: string; type: string }>({
      query: ({ mediaId, type }) => ({
        url: replaceUrlParams(InstagramGetMediaCommmentsURL, {
          mediaId,
          type,
        }),
        method: "GET",
      }),
    }),

    getMediaDetails: builder.query<any, string>({
      query: (mediaId) =>
        replaceUrlParams(InstagramMediaDetailsURL, { mediaId }),

      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          const { tag_and_value_pair, ai_enabled } = data;
          dispatch(setMediaDetails(data));
          dispatch(setFields(tag_and_value_pair || []));

          dispatch(
            setPositiveEnabled({
              responseMode:
                ai_enabled?.positive_comments?.mode || "leave_comment",
              response: ai_enabled?.positive_comments?.value || "",
            })
          );

          dispatch(
            setNegativeEnabled({
              responseMode:
                ai_enabled?.negative_comments?.mode || "leave_comment",
              response: ai_enabled?.negative_comments?.value || "",
            })
          );

          dispatch(
            setLeadsEnabled({
              responseMode:
                ai_enabled?.potential_buyers?.mode || "leave_comment",
              response: ai_enabled?.potential_buyers?.value || "",
            })
          );

          dispatch(
            setInquiryDetails({
              responseMode: ai_enabled?.inquiries?.mode || "leave_comment",
              websiteUrl: ai_enabled?.inquiries?.value?.website_url || "",
              mobileNumber: ai_enabled?.inquiries?.value?.mobile_no || "",
              productDetails:
                ai_enabled?.inquiries?.value?.product_details || "",
            })
          );
        } catch (error) {
          console.log("Error in getTagValue:", error);
        }
      },
    }),

    getRecentStories: builder.query<any, string>({
      async queryFn(accountId, _queryApi, _extraOptions, fetchWithBQ) {
        if (!accountId) {
          return {
            error: { status: 400, data: "Missing IG user ID" },
          };
        }
        const putRes = await fetchWithBQ({
          url: replaceUrlParams(InstagramPutStoriesURL, { accountId }),
          method: "PUT",
        });

        if (putRes.error) return { error: putRes.error };

        const getRes = await fetchWithBQ({
          url: replaceUrlParams(InstagramGetStoriesURL, { accountId }),
          method: "GET",
        });

        return getRes.error ? { error: getRes.error } : { data: getRes.data };
      },
    }),

    getStoryAnalytics: builder.query<any, string>({
      query: (storyId) =>
        replaceUrlParams(InstagramGetStoryAnalyticsURL, { storyId }),
    }),

    getStoryDetails: builder.query<any, string>({
      query: (storyId) =>
        replaceUrlParams(InstagramGetStoryDetailsURL, { storyId }),
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          const { tag_and_value_pair } = data;

          dispatch(setStoryDetails(data));
          dispatch(
            setStoryFields(
              Array.isArray(tag_and_value_pair) ? tag_and_value_pair : []
            )
          );
        } catch (error) {
          console.log("Error in getStoryDetails: ", error);
          dispatch(setStoryFields([]));
        }
      },
    }),
  }),
});

export const {
  useGetMediaCommentsQuery,
  useGetMediaGraphAnalyticsQuery,
  useGetRecentMediaQuery,
  useDeleteInstagramAccountMutation,
  useGetMediaAnalyticsQuery,
  useGetRecentStoriesQuery,
  useGetMediaDetailsQuery,
  useLazyGetMediaDetailsQuery,
  useGetStoryDetailsQuery,
  useGetStoryAnalyticsQuery,
} = instagramAPI;

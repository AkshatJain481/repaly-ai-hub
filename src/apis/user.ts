import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {
  UserBusinessDetails,
  PlatformAccount,
  UserProfile,
} from "@/utils/interfaces";
import {
  BusinessDetailsURL,
  UserAccountsURL,
  UserProfileURL,
} from "@/utils/backend_urls";
import {
  safeParseJSON,
} from "@/utils/commonFunctions";
// import { RootState } from "@/redux/store";
import {
  setActiveAccount,
  setUserAccounts,
  setUserProfile,
} from "@/redux/slices/user.slice";

export const userAPI = createApi({
  reducerPath: "userAPI",
  baseQuery: fetchBaseQuery({
    prepareHeaders: (headers) => {
      const token = localStorage.getItem("user-token");
      if (token) headers.set("Authorization", `Bearer ${token}`);
      return headers;
    },
  }),
  endpoints: (builder) => ({
    // ✅ POST business details
    setBusinessDetail: builder.mutation<void, UserBusinessDetails>({
      query: (body) => ({
        url: BusinessDetailsURL,
        method: "POST",
        body,
      }),
    }),

    // ✅ GET user accounts + update central state (userId from localStorage)
    getUserAccounts: builder.query<PlatformAccount[], void>({
      query: () => UserAccountsURL,
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(setUserAccounts(data));
          if (data?.length > 0) {
            const savedActive = safeParseJSON(
              localStorage.getItem("activeAccount")
            );
            if (!savedActive) {
              dispatch(setActiveAccount(data[0]));
            } else {
              const doesAccountExist = data.some(
                (account) => account?.id === savedActive?.id
              );
              dispatch(
                doesAccountExist
                  ? setActiveAccount(savedActive)
                  : setActiveAccount(null)
              );
            }
          } else {
            dispatch(setActiveAccount(null));
          }
        } catch {
          console.error("Failed to fetch user accounts");
          dispatch(setUserAccounts([]));
          dispatch(setActiveAccount(null));
          localStorage.removeItem("activeAccount");
        }
      },
    }),

    // ✅ GET user profile + update central state (userId from localStorage)
    getUserProfile: builder.query<UserProfile, void>({
      query: () => UserProfileURL,
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(setUserProfile(data));
        } catch {
          console.error("Failed to fetch user profile");
          dispatch(setUserProfile(null));
        }
      },
    }),
  }),
});

export const {
  useSetBusinessDetailMutation,
  useGetUserAccountsQuery,
  useGetUserProfileQuery,
  useLazyGetUserAccountsQuery,
} = userAPI;

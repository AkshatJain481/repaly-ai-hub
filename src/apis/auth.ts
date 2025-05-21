
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {
  GetAccessTokenURL,
  ExchangeCodeURL,
  ValidateTokenURL,
} from "@/utils/backend_urls";
import { setToken } from "@/redux/slices/user.slice";

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface LoginResponse {
  token: string;
  userId: string;
}

export const authAPI = createApi({
  reducerPath: "authAPI",
  baseQuery: fetchBaseQuery({
    prepareHeaders: (headers) => {
      const token = localStorage.getItem("user-token");
      if (token) headers.set("Authorization", `Bearer ${token}`);
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getAccessToken: builder.query<any, { platformName: string; code: string }>({
      query: ({ platformName, code }) => ({
        url: GetAccessTokenURL,
        method: "POST",
        body: { platformName, code },
      }),
      async onQueryStarted(_, { queryFulfilled, dispatch }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(setToken(data?.token));
          if (data?.userId) {
            localStorage.setItem("userId", data.userId);
          }
        } catch (error) {
          console.error("Failed to set token in localStorage:", error);
        }
      },
    }),

    login: builder.mutation<LoginResponse, LoginCredentials>({
      query: (credentials) => ({
        url: '/api/login', // Update with your actual login endpoint
        method: 'POST',
        body: credentials,
      }),
    }),

    exchangeCodeForToken: builder.mutation<
      any,
      { platformName: string; code: string }
    >({
      query: ({ platformName, code }) => ({
        url: ExchangeCodeURL,
        method: "POST",
        body: {
          platformName,
          code,
        },
      }),
    }),

    validateToken: builder.mutation<any, void>({
      query: () => ({
        url: ValidateTokenURL,
        method: "POST",
        body: {},
      }),
    }),
  }),
});

export const {
  useGetAccessTokenQuery,
  useLoginMutation,
  useExchangeCodeForTokenMutation,
  useValidateTokenMutation,
} = authAPI;

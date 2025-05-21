
import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage"; // defaults to localStorage
import businessDetailsReducer from "./slices/businessDetails.slice";
import userReducer from "./slices/user.slice";
import authReducer from "./slices/auth.slice";
import automationReducer from "./slices/automation.slice";
import storyAutomationReducer from "./slices/storyAutomation.slice";
import { automationAPI } from "@/apis/automation";
import { userAPI } from "@/apis/user";
import { instagramAPI } from "@/apis/instagram";
import { authAPI } from "@/apis/auth";

// Persist config
const persistConfig = {
  key: "root",
  storage,
  whitelist: ["user", "auth"], // persist the user and auth slices
};

// Combine reducers
const rootReducer = combineReducers({
  businessDetails: businessDetailsReducer,
  user: userReducer,
  auth: authReducer,
  automation: automationReducer,
  storyAutomation: storyAutomationReducer,
  [automationAPI.reducerPath]: automationAPI.reducer,
  [userAPI.reducerPath]: userAPI.reducer,
  [instagramAPI.reducerPath]: instagramAPI.reducer,
  [authAPI.reducerPath]: authAPI.reducer,
});

// Create a persisted reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Configure store
const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // needed for redux-persist
    }).concat(
      automationAPI.middleware,
      userAPI.middleware,
      instagramAPI.middleware,
      authAPI.middleware
    ),
});

export const persistor = persistStore(store);
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;

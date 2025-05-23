
import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";
import businessDetailsReducer from "./slices/businessDetails.slice";
import userReducer from "./slices/user.slice";
import authReducer from "./slices/auth.slice";
import automationReducer from "./slices/automation.slice";
import storyAutomationReducer from "./slices/storyAutomation.slice";
import flowReducer from "./slices/flow.slice";
import flowUIReducer from "./slices/flowUI.slice";
import { automationAPI } from "@/apis/automation";
import { userAPI } from "@/apis/user";
import { instagramAPI } from "@/apis/instagram";
import { authAPI } from "@/apis/auth";

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["user", "auth", "flow"],
};

const rootReducer = combineReducers({
  businessDetails: businessDetailsReducer,
  user: userReducer,
  auth: authReducer,
  automation: automationReducer,
  storyAutomation: storyAutomationReducer,
  flow: flowReducer,
  flowUI: flowUIReducer,
  [automationAPI.reducerPath]: automationAPI.reducer,
  [userAPI.reducerPath]: userAPI.reducer,
  [instagramAPI.reducerPath]: instagramAPI.reducer,
  [authAPI.reducerPath]: authAPI.reducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
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

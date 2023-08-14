import { PreloadedState, configureStore } from "@reduxjs/toolkit";
import quizReducer from "./quizSlice";

export function setupStore(preloadedState?: PreloadedState<RootState>) {
  return configureStore({
    reducer: quizReducer,
    ...(preloadedState ? { preloadedState } : {}),
  });
}

export type RootState = ReturnType<typeof quizReducer>;

export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore["dispatch"];

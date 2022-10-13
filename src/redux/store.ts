import { configureStore } from "@reduxjs/toolkit";
import { exampleApi } from "./api/example";

export const store = configureStore({
  reducer: {
    [exampleApi.reducerPath]: exampleApi.reducer,
    // Connect the PostApi reducer to the store
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({}).concat([
      // Add the exampleApi middleware to the store
      exampleApi.middleware,
    ]),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

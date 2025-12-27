import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "antd/dist/reset.css";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import adminSlice from "./feature/admin/adminSlice.js";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
// import { store } from "./app/store";
// import { queryClient } from "./queries/client";
import App from "./App.jsx";

const queryClient = new QueryClient();

const reduxStore = configureStore({
  reducer: {
    adminSlice: adminSlice,
  },
});

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <Provider store={reduxStore}>
      <QueryClientProvider client={queryClient}>
        <App />
      </QueryClientProvider>
    </Provider>
  </BrowserRouter>
);

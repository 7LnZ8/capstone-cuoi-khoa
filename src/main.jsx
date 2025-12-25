import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

// import { Provider } from "react-redux";
// import { QueryClientProvider } from "@tanstack/react-query";

// import { store } from "./app/store";
// import { queryClient } from "./queries/client";
import App from "./App.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);

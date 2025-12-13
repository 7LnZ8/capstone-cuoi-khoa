// src/index.js hoặc src/main.jsx (File gốc của React)

import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { Provider } from "react-redux";
import { store } from "./redux/configStore"; // Import store vừa tạo

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <App />
  </Provider>
);
// src/index.js
import { BrowserRouter } from 'react-router-dom';

// ... code cũ
root.render(
  <BrowserRouter>
    <Provider store={store}>
      <App />
    </Provider>
  </BrowserRouter>
);
import React from "react";
import ReactDOM from "react-dom/client";

import App from "./App.js";
import {AuthProvider} from "./store/AuthContext.js";

const root = document.getElementById("root")!;
ReactDOM.createRoot(root).render(
  <React.StrictMode>
    <AuthProvider>
      <App />
    </AuthProvider>
  </React.StrictMode>
);

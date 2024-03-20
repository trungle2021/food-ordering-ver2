import React from "react";
import ReactDOM from "react-dom/client";

import App from "./App.js";
import {AuthProvider} from "./store/AuthContext.js";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
      <App />
    </AuthProvider>
  </React.StrictMode>
);

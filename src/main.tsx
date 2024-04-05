import React from "react";
import ReactDOM from "react-dom/client";
import {Provider} from 'react-redux';
import store from './store';
import App from "./App.js";
import {AuthProvider} from "./store/AuthContext.js";

const root = document.getElementById("root")!;
ReactDOM.createRoot(root).render(
  <React.StrictMode>
    <Provider store={store}>
      <AuthProvider>
        <App />
      </AuthProvider>
    </Provider>
  </React.StrictMode>
);

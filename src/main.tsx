import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { persistor, store } from "./store/store";
import App from "./App.js";
import { BrowserRouter } from "react-router-dom";
import { PersistGate } from "redux-persist/integration/react";
import { GoogleOAuthProvider } from "@react-oauth/google";


const root = document.getElementById("root")!;
ReactDOM.createRoot(root).render(
  // <React.StrictMode>
  <GoogleOAuthProvider clientId="810591686997-8pn6na96q83ui05rh5qprnk93lp28vla.apps.googleusercontent.com">
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </PersistGate>
  </Provider>
  </GoogleOAuthProvider>
  // </React.StrictMode>
);

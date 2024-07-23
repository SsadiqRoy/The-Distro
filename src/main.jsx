import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { ErrorBoundary } from "react-error-boundary";
import Error from "./pages/Error.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ErrorBoundary FallbackComponent={Error} onReset={() => window.location.replace("/dashboard")}>
      <App />
    </ErrorBoundary>
  </React.StrictMode>,
);

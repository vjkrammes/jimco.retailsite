import { createRoot } from "react-dom/client";
import { AlertProvider } from "./Contexts/AlertContext";
import App from "./Components/App";

const container = document.getElementById("root");
const root = createRoot(container);
root.render(
  <AlertProvider>
    <App />
  </AlertProvider>
);

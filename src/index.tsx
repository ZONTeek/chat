import { createRoot } from "react-dom/client";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import "./index.scss";

const container = document.getElementById("root") as Element;
const root = createRoot(container);
root.render(<App />);

reportWebVitals();

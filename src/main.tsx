import React from "react"
import ReactDOM from "react-dom/client"
import "./index.css"
import App from "./sections/App"

import "./util"

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)

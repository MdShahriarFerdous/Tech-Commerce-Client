import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "bootstrap";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "./assets/css/main.css";
import "./assets/css/animate.min.css";
import "react-loading-skeleton/dist/skeleton.css";
import "./App.css";
import { AuthProvider } from "./context/authContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
	<AuthProvider>
		<App />
	</AuthProvider>
);

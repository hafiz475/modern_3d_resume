// src/main.jsx
import * as THREE from "three";
THREE.Cache.enabled = true; // <- important: prevents repeated network loads

import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

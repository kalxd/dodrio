import React from "react";
import { render } from "react-dom";
import App from "./App";

import "antd/dist/antd.css";

const mountNode = document.createElement("main");
document.body.appendChild(mountNode);
render(<App/>, mountNode);

import React from "react";
import { render } from "react-dom";
import Main from "./Main.jsx";

import "antd/dist/antd.css";

const mountNode = document.createElement("main");
document.body.appendChild(mountNode);
render(<Main/>, mountNode);

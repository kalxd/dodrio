import React from "react";
import { render } from "react-dom";
import Main from "./Main.jsx";

import "fomantic-ui-css/semantic.min.css";

const mountNode = document.createElement("main");
document.body.appendChild(mountNode);
render(<Main/>, mountNode);

import {render} from 'react-dom';
import App from './App';

import "../node_modules/@blueprintjs/core/lib/css/blueprint.css";
import "../node_modules/@blueprintjs/icons/lib/css/blueprint-icons.css";

const mountNode = document.getElementById("app");
render(App, mountNode);

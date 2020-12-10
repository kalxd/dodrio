import {render} from 'react-dom';
import App from './App';

import "primereact/resources/themes/saga-blue/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";

const mountNode = document.getElementById("app");
render(App, mountNode);

import {render} from 'react-dom';
import App from './App';


const mountNode = document.createElement("main");
document.body.appendChild(mountNode);
render(App, mountNode);

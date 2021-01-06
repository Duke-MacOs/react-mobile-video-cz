import * as React from "react";
import { render } from "react-dom";
// import {Videocz} from './components/video'

import App from "./App";

console.log(App, '>>>>>>>>');

const rootElement = document.getElementById("root");
render(<App />, rootElement);

import * as React from "react";
// import "./styles.scss";
import Videocz from './components/video'
// import Videocz from 'react-video-cz';
// import 'react-video-cz/dist/video-react.css';
// import {Videocz} from './lib/index';
// import {Videocz} from './dist/video-react'
// import "react-video-cz/lib/static/css/main.css";
// import * as Videocz from 'react-video-cz';

// import 'react-video-cz/lib/index.css';
export default function App() {
  
  return (
    <div styleName="App">
      <Videocz src="https://online-education.codemao.cn/228/codecamp/c6c5c1add2ba484aa0beede69e56c43f.mp4" />
    </div>
  );
}

// export default Videocz;
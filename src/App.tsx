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

  const ref = React.useRef<HTMLVideoElement>(null);

  React.useEffect(()=>{
    console.log(ref.current);
    
  },[ref.current])
  
  return (
    <div className="App">
      <Videocz videoRef={ref} src="" />
    </div>
  );
}

// export default Videocz;
# React-video-cz

## CLI Commands
*   `npm install`: Installs dependencies

*   `npm run start`: Run a production-like server

*   `npm run build`: Production-ready build

## 使用

### 安装
```shell
npm install react-video-cz
```

### 引入
```jsx
import 'react-video-cz/lib/index.css';
import Videocz from 'react-video-cz';
```



### 事件钩子
组件已经暴露了大部分video的事件钩子，参看
[https://developer.mozilla.org/zh-CN/docs/Web/Guide/Events/Media_events](https://developer.mozilla.org/zh-CN/docs/Web/Guide/Events/Media_events)



### 注：

width和height样式弃用，组件默认占满容器



src?:string;    //资源链接

poster?:string;   //预览图链接

autoPlay?:boolean;   //是否自动播放

preload?:string;    //预加载

progressColor?:string;    //进度条已播部分的颜色

progressBackColor?:string;    //进度条未播部分的进度

thumb?:string;    //进度条拖动块的图片，base64

timeStyle?:Record<string, any>;  //时间样式

fullScreenBtn?:string; //全屏按钮图片，base64

pauseBtn?:string;   //暂停按钮图片，base64

playBtn?:string;   //播放按钮图片，base64

loading?:string;   //loading图片，base64

videoRef?:MutableRefObject<HTMLVideoElement>;     //获取video dom实例




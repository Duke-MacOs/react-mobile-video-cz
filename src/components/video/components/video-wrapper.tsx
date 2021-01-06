import React, {  useEffect } from 'react';
import { Icon } from '../assets/icon';
import '../index.scss';

interface VideoWrapperProps {
  videoState:string;
  pauseBtn?:string;
  playBtn?:string;
  loading?:string;
  operation:{
    setVolume:(value:number) => void;
    handleTogglePlay:() => void;
    handleFullScreen:() => void;
  };
}

export const VideoWrapper:React.FC<VideoWrapperProps> = (props) => {
  const { videoState, operation, playBtn, pauseBtn, loading } = props;
  useEffect(() => {
    console.log('videoState change in wrapper: ', videoState);
    console.log('type state: ', typeof videoState);
  }, [videoState]);

  const playIconStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginTop: '-19px',
    marginLeft: '-19px',
    width: '38px',
    height: '38px',
    background: `url(${playBtn ?? Icon.play}) center center no-repeat`,
    backgroundSize: 'contain',
    /* 部分 Android 机 <video> 初始化会触发 onerror 事件，故这里添加一个 error 匹配以便播放视频 */
    display: (videoState === 'pause' || videoState === 'null' || videoState === 'error') ? 'block' : 'none',
  } as React.CSSProperties;

  const pauseIconStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginTop: '-19px',
    marginLeft: '-19px',
    width: '38px',
    height: '38px',
    background: `url(${pauseBtn ?? Icon.pause}) center center no-repeat`,
    backgroundSize: 'contain',
    display: (videoState === 'play') ? 'block' : 'none',
  } as React.CSSProperties;

  const waitingIconStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '38px',
    height: '38px',
    background: `url(${loading ?? Icon.loading}) center center no-repeat`,
    display: videoState === 'waiting' ? 'block' : 'none',

  } as React.CSSProperties;

  return (
    <div styleName="video-wrapper">
      <div
        style={pauseIconStyle}
        onClick={operation.handleTogglePlay} />
      <div
        style={playIconStyle}
        onClick={operation.handleTogglePlay} />
      <div style={waitingIconStyle} />

    </div>
  );
};

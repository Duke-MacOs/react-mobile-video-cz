/** @jsx jsx */
import React, { useState, useEffect, useRef } from 'react';
import { jsx,css } from '@emotion/react';
// import { css } from '@emotion/css'

import { Icon } from '../assets/icon';
import { formatDuraton, getClient, getEleRelativeScreenPosition } from '../util';
import { VideoTypes } from '../type';
import thumbImg from './../assets/thumb.png';

import './control.scss';

interface NoFullscreenControlsProps {

  /** 样式相关 */
  progressColor?:string;
  progressBackColor?:string;
  thumb?:string;
  timeStyle?:Record<string, any>;
  fullScreenBtn?:string;

  videoState:string;
  currentTime:number;
  duration:number;
  isFullScreen:boolean;
  dispatch:any;
  operation:{
    setVolume:(value:number) => void;
    handleTogglePlay:() => void;
    handleFullScreen:() => void;
    handleVideoPlay:() => void;
    handleVideoPause:() => void;
  };
}

export const NoFullscreenControls:React.FC<NoFullscreenControlsProps> = (props) => {
  const { videoState, currentTime, duration, dispatch, isFullScreen, operation, progressColor, progressBackColor, thumb, timeStyle, fullScreenBtn } = props;
  const [percent, setPercent] = useState<number>(0);
  const [volumePercent, setVolumePercent] = useState<number>(100);
  const [visibleVolumeControl, setVisibleVolumeControl] = useState<boolean>(false);
  const progressLockRef = useRef<boolean>(true);
  const volumeLockRef = useRef<boolean>(true);

  useEffect(() => {
    if(currentTime && duration) {
      const p = Math.floor(currentTime / duration * 100);
      setPercent(p);
    }
  }, [currentTime, duration]);

  useEffect(() => {
    operation.setVolume(volumePercent / 100);
  }, [operation, volumePercent]);

  useEffect(() => {
    const bodyClickListener = (e:Event) => {
      setVisibleVolumeControl(false);
    };

    document.getElementById('video-container')?.addEventListener('click', bodyClickListener, false);

    return () => {
      document.getElementById('video-container')?.removeEventListener('click', bodyClickListener);
    };
  }, []);

  /**
   * 音量控制
   */
  useEffect(() => {
    const mouseMoveListener = (event:any) => {
      if(volumeLockRef.current) return;
      const client = getClient(event);
      if(!client) return;
      const { clientY } = client;
      const elePosition = getEleRelativeScreenPosition('progressVolume');
      if(!elePosition) return;

      const { eleHeight, eleBorderTop, eleBorderBottom } = elePosition;
      if(clientY >= eleBorderBottom) {
        setVolumePercent(0);
      }else if(clientY <= eleBorderTop) {
        setVolumePercent(100);
      }else {
        const percent = (eleBorderBottom - clientY) / eleHeight;
        setVolumePercent(Math.floor(percent * 100));
      }
    };

    window.addEventListener('mousemove', mouseMoveListener, false);
    window.addEventListener('touchmove', mouseMoveListener, false);

    return () => {
      window.removeEventListener('mousemove', mouseMoveListener);
      window.removeEventListener('touchmove', mouseMoveListener, false);
    };
  }, []);

  const handleMouseDownProgress = () => {
    console.log('handle mouse down progress');
    progressLockRef.current = false;
    operation.handleVideoPause();
  };

  const handleMouseDownVolume = () => {
    volumeLockRef.current = false;
  };

  const toggleVolumeControl = () => {
    setVisibleVolumeControl((prev) => !prev);
  };

  const entryFullscreenStyle = {
    width: '32px',
    height: '32px',
    background: `url(${fullScreenBtn ?? Icon.entryFullscreen}) center center no-repeat`,
    backgroundSize: 'contain',
  };

  const quitFullscreenStyle = {
    width: '32px',
    height: '32px',
    background: `url(${fullScreenBtn ?? Icon.quitFullscreen}) center center no-repeat`,
    backgroundSize: 'contain',
  };

  const volumeStyle = {
    width: '38px',
    height: '38px',
    background: `url(${Icon.volume}) center center no-repeat`,
  };

  // const processStyle = {
  //   backgroundSize: `${percent}% 100%`,
  // };

  const volumeBarStyle = {
    backgroundSize: `${volumePercent}% 100%`,
  };

  const progressStyle = {
    display: 'flex',
  };

  const inputCss = css `
    &::-webkit-slider-thumb {
      background-image: url(${thumb ?? thumbImg});
    }
    &::-moz-range-thumb {
      background-image: url(${thumb ?? thumbImg});
    }
    &::-ms-thumb{
      background-image: url(${thumb ?? thumbImg});
    }
  `;

  return (
    <div
      styleName="no-full-screen-container"
    >
      <span
        styleName="time left"
        style={timeStyle}>{formatDuraton(currentTime)}</span>
      {/* 进度条 */}
      <div
        id="progress"
        styleName="progress"
        style={progressStyle}
      >
        <div styleName="fake_bar" >
          <div
            // 修复左侧背景有一些没被覆盖问题
            style={{ background: `linear-gradient(to right, ${progressColor ?? '#FFE435'} 0%,${progressColor ?? '#FFE435'} ${percent}%, ${progressBackColor ?? '#0A002A'} ${percent}%,${progressBackColor ?? '#0A002A'} 100%)` }}
          />

        </div>
        <input
          css={inputCss}
          // className={inputCss}
          type="range"
          min="0"
          max="100"
          value={percent >> 0}
          step="1"
          onMouseDown={(e) => {
            operation.handleVideoPause();
          }}
          onMouseUp={(e) => {
            operation.handleVideoPlay();
          }}
          onTouchStart={(e) => {
            operation.handleVideoPause();
          }}
          onTouchEnd={(e) => {
            operation.handleVideoPlay();
          }}

          onChange={(e) => {
            e.preventDefault();
            e.stopPropagation();
            const time = Math.floor(duration * (Number.parseInt(e.target.value) / 100));
            dispatch({ type: VideoTypes.PAUSE });
            dispatch({ type: VideoTypes.MODIFY, payload: { currentTime: time } });
          }}
        />

      </div>
      <span
        styleName="time right"
        style={timeStyle}>{formatDuraton(duration)}</span>
      {/* 音量控制 */}
      <div
        styleName="volume"
        id="videoVolume"
        onClick={(e) => {e.stopPropagation();toggleVolumeControl();}} >
        <div style={volumeStyle}/>
        {visibleVolumeControl && (
          <input
            type="range"
            value={volumePercent}
            min="0"
            max="100"
            onChange={(e) => {
              setVolumePercent(Number.parseInt(e.target.value));
            }}
            style={{
              position: 'absolute',
              transform: 'rotate(-90deg)',
              width: 80,
              bottom: '200%',
              left: '-62%',
              ...volumeBarStyle,
            }} />

        )}
      </div>
      {isFullScreen ? (
        <div
          style={quitFullscreenStyle}
          onClick={operation.handleFullScreen} />
      ) : (
        <div
          style={entryFullscreenStyle}
          onClick={operation.handleFullScreen} />
      )}
    </div>
  );
};

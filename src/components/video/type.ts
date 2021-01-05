import { type } from 'os';
import { SyntheticEvent } from 'react';

export interface VideoczState {
  videoState:'play'|'pause'|'waiting'|'null'|'error';
  currentTime:number;
  duration:number;
  fullScreen:boolean;
}

type fun = (e:SyntheticEvent) => void;

export interface VideoczProps {
  width?:string;
  height?:string;
  src?:string;
  poster?:string;
  progressColor?:string;
  progressBackColor?:string;
  thumb?:string;
  timeStyle?:Record<string, any>;
  fullScreenBtn?:string;
  pauseBtn?:string;
  playBtn?:string;
  loading?:string;
  showCenterBtn?:boolean;

  // video事件
  onAbort?:fun;
  onCanplay?:fun;
  onCanPlaythrough?:fun;
  onDurationchange?:fun;
  onEmptied?:fun;
  onEnded?:fun;
  onError?:fun;
  onLoadedmetadata?:fun;
  onLoadstart?:fun;
  onPause?:fun;
  onPlay?:fun;
  onPlaying?:fun;
  onProgress?:fun;
  onRateChange?:fun;
  onSeeked?:fun;
  onSeeking?:fun;
  onStalled?:fun;
  onSuspend?:fun;
  onTimeupdate?:fun;
  onVolumechange?:fun;
  onWaiting?:fun;
}

export enum VideoTypes {
  PLAY = 'PLAY',
  PAUSE = 'PAUSE',
  MODIFY = 'MODIFY',
  ENTRYFULLSCREEN = 'ENTRYFULLSCREEN',
  QUITFULLSCREEN = 'QUITFULLSCREEN'
}

export interface PlayAction {
  type:typeof VideoTypes.PLAY;
}

export interface PauseAction {
  type:typeof VideoTypes.PAUSE;
}

export interface ModifyStateAction {
  type:typeof VideoTypes.MODIFY;
  payload:Partial<VideoczState>;
}

export interface EntryFullScreen {
  type:typeof VideoTypes.ENTRYFULLSCREEN;
}

export interface QuitFullScreen {
  type:typeof VideoTypes.QUITFULLSCREEN;
}

export type VideoActionTypes = PlayAction | PauseAction | ModifyStateAction | EntryFullScreen | QuitFullScreen

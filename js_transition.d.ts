// External libs

// These will have to remain until we (or someone else) writes
// proper .d.ts definition files for them.
declare let template:any;
// node's typings definitions currently break stuff, use this instead
declare let DEBUG:any;
interface NodeRequire {
  ensure:(paths:string[], callback:(require:<T>(path:string) => T) => void, name?:string ) => void;
}

interface DefaultObject {[key:string]:any}


declare interface Window {
  WeixinJSBridge:any;
  CODEMAOCONFIG:{
    env:'prod'|'staging'|'test'|'dev';
    language:string;
    wechat:{
      host:string;
      appid:string;
      tanyueAppID:string;
    };
    api:{
      codecamp:string;
      codecampMock:string;
      tiger:string;
      rocketApp:string;
      rockAppMock:string;
      tanYue:string;
    };
    mock:boolean;
    host:{
      api:string;
      kids:string;
      mlz:string;
      internal:string;
      tanyue:string;
      mobile:string;
      eventTrack:string;
      bcm:string;
      lbkMobile:string;
      lbkCm:string;
    };
    iris:{
      host:string;
      geetestProductId:string;
      waterproofWallProductId:string;
    };
    mockHost:string;
    agoraRtc:{
      appId:string;
    };
    imEnv:string;
  };
}

declare module '*.scss' {
  const content:any;
  // eslint-disable-next-line import/no-default-export
  export default content;
}

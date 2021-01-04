// 时间转换
export const formatDuraton = (time:number) => {
  let str = '00:00';
  if(time > 0) {
    const hour = Math.floor(time / 3600);
    const min = Math.floor(time / 60) % 60;
    const sec = Math.floor(time % 60);
    const minStr = min >= 10 ? `${min}` : `0${min}`;
    const secStr = sec >= 10 ? `${sec}` : `0${sec}`;
    if(hour > 10) {
      str = `${hour}:${minStr}:${secStr}`;
    }
    if(hour > 1) {
      str = `0${hour}:${minStr}:${secStr}`;
    } else {
      str = `${minStr}:${secStr}`;
    }
  }
  return str;
};

// 获取当前横向坐标
export const getClient = (event:any) => {
  let clientX;
  let clientY;
  if(event.type === 'mousemove') {
    clientX = event.clientX;
    clientY = event.clientY;
  } else if(event.type === 'touchmove') {
    clientX = event.touches[0].pageX;
    clientY = event.touches[0].pageY;
  }else {
    console.error('event type not found');
  }
  return { clientX, clientY } || undefined;
};

export const isElement = (ele:any) => ele instanceof HTMLElement;

export const getEleRelativeScreenPosition = (ele:HTMLElement|string) => {
  let _ele;
  if(typeof ele === 'object') {
    _ele = ele;
  } else if(typeof ele === 'string') {
    _ele = document.getElementById(ele);
  }
  if(!isElement(_ele) || !_ele) return null;

  const client = _ele.getBoundingClientRect();
  const eleWidth = _ele ? _ele.offsetWidth : 0;
  const eleHeight = _ele ? _ele.offsetHeight : 0;
  // 元素左侧边界相对于屏幕左侧的位置
  const eleBorderLeft = _ele ? client.left : 0;
  // 元素右侧边界相对于屏幕左侧的位置
  const eleBorderRight = _ele ? client.right : 0;
  // 元素顶部边界相对于屏幕顶部的位置
  const eleBorderTop = _ele ? client.top : 0;
  // 元素底部边界相对于屏幕顶部的位置
  const eleBorderBottom = _ele ? client.bottom : 0;

  return { eleWidth, eleHeight, eleBorderBottom, eleBorderLeft, eleBorderRight, eleBorderTop };
};

export const getIsInRocketApp = () => navigator.userAgent.toLowerCase().indexOf('mobile_rocket') !== -1;


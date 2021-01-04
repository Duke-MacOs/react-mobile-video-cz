import React from 'react';

interface IBottomProgress{
  currentTime:number;
  duration:number;
  progressColor?:string;
  progressBackColor?:string;
}

export const BottomProgress:React.FC<IBottomProgress> = ({ currentTime, duration, progressColor, progressBackColor }) => {

  const percent = (currentTime / duration) * 100;

  const progressStyle = {
    width: '100%',
    height: 1,
    backgroundSize: `${percent}% 100%`,
  };

  return (
    <div style={{ width: '100%', height: 1, backgroundColor: progressBackColor ?? '#0A002A' }}>
      <div
        style={{ ...{
          background: `-webkit-linear-gradient(${progressColor ?? '#FFE435'}, ${progressColor ?? '#FFE435'}) no-repeat`,
        }, ...progressStyle }} />
    </div>
  );
};

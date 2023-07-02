import { useEffect, useState } from "react";

export const TimeStamp = ({ timestamp } : { timestamp : string}) => {
    const [timeAgo, setTimeAgo] = useState('');
  
    useEffect(() => {
      const parsedTime = new Date(Date.parse(timestamp));
      const thisTime = new Date().getTime();
  
      const updateTimeStamp = () => {
        if (!parsedTime) return;
  
        const timeElapsed = Math.floor((thisTime - parsedTime.getTime()) / 1000);
  
        if (timeElapsed < 60) {
          setTimeAgo(`방금 전`);
        } else if (timeElapsed < 60 * 60) {
          const minutes = Math.floor(timeElapsed / 60);
          setTimeAgo(`${minutes}분 전`);
        } else if (timeElapsed < 60 * 60 * 24) {
          const hours = Math.floor(timeElapsed / (60 * 60));
          setTimeAgo(`${hours}시간 전`);
        } else if (timeElapsed < 60 * 60 * 24 * 7) {
          const days = Math.floor(timeElapsed / (60 * 60 * 24));
          setTimeAgo(`${days}일 전`);
        } else {
          const date = parsedTime.toISOString().slice(0, 10);
          setTimeAgo(date);
        }
      };
  
      updateTimeStamp();
    }, [timestamp]);
  
    if (!timeAgo) return <span>{timestamp}</span>;
    return <span>{timeAgo}</span>;
  };
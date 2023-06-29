import { useEffect, useState } from "react";
import { TimerContainer } from "./timecontainer";
import { TimerInput } from "./timeinput";

export const Timer = () => {
  const [newTime, setNewTime] = useState<number>(0);
  const [time, setTime] = useState<number>(0);
  const [days, setDays] = useState<number>(0);
  const [hours, setHours] = useState<number>(0);
  const [minutes, setMinutes] = useState<number>(0);
  const [seconds, setSeconds] = useState<number>(0);
  const [isTimerRunning, setIsTimerRunning] = useState<boolean>(false);

  const timeToMinutes = time * 60;
  const countDownDate = new Date().getTime() + timeToMinutes * 1000;


    useEffect(() => {
    let interval: ReturnType<typeof setInterval> | null = null;
    if (isTimerRunning && time > 0) {
      interval = setInterval(() => {
        const now = new Date().getTime();
        const difference = countDownDate - now;

        const newDays = Math.floor(difference / (1000 * 60 * 60 * 24));
        const newHours = Math.floor(
          (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
        );
        const newMinutes = Math.floor(
          (difference % (1000 * 60 * 60)) / (1000 * 60)
        );
        const newSeconds = Math.floor((difference % (1000 * 60)) / 1000);

        setDays(newDays);
        setHours(newHours);
        setMinutes(newMinutes);
        setSeconds(newSeconds);

        if (difference <= 0) {
          clearInterval(interval as ReturnType<typeof setInterval>);
          setDays(0);
          setHours(0);
          setMinutes(0);
          setSeconds(0);
          alert("경매가 종료되었습니다");
        }
      }, 1000);
    }

    return () => {
      if (interval) {
        clearInterval(interval as ReturnType<typeof setInterval>);
      }
    };
  }, [isTimerRunning, time]);


  const handleStartTimer = () => {
    if (!isTimerRunning && time > 0) {
      setIsTimerRunning(true);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let inputTime = parseInt(e.target.value);
    setNewTime(inputTime);
  };

  return (
    <div className="flex flex-col r">
      <TimerContainer
        days={days}
        hours={hours}
        minutes={minutes}
        seconds={seconds}
      /> 
       <TimerInput
        value={newTime}
        handleStartTimer={handleStartTimer}
        handleChange={handleChange}
      />
    </div>
  );
};

import { NumberBox } from "./numberbox";

interface timeProps {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

export const TimerContainer = ({
  days,
  hours,
  minutes,
  seconds,
}: timeProps) => {
  let daysFlip = false;
  let hoursFlip = false;
  let minutesFlip = false;
  let secondsFlip = true;

  // 남은 시간이 모두 0이하인 경우를 체크한다
  if (seconds <= 0 && minutes <= 0 && hours <= 0 && days <= 0) {
    daysFlip = false;
    hoursFlip = false;
    minutesFlip = false;
    secondsFlip = false;
  }

  // 초가 0인 경우 체크, 분이 0이 아닌 경우, 분을 59초로 설정한다
  if (seconds == 0) {
    if (minutes != 0) {
      seconds = 59;
    }

    secondsFlip = false;
    minutesFlip = true;
  }

  if (minutes == 0) {
    if (hours != 0) {
      minutes = 59;
    }

    minutesFlip = false;
    hoursFlip = true;
  }

  if (hours == 0) {
    hoursFlip = false;
    if (days != 0) {
      daysFlip = true;
    }
  }

  // 각각의 값이 10보다 작은경우 0을 붙여 자릿수를 맞추도록 한다
  if (days < 10) {
    days = 0 + days;
  }

  if (hours < 10) {
    hours = 0 + hours;
  }

  if (minutes < 10) {
    minutes = 0 + minutes;
  }

  if (seconds < 10) {
    seconds = 0 + seconds;
  }

  return (
    <div className="grid grid-cols-2 gap-4 md:flex md:items-center md:justify-between  rounded-xl  absolute pl-16 pt-32">
      <NumberBox num={days} unit="Days" flip={daysFlip} />
      <span className=" hidden text-3xl -mt-8 md:inline-block md:text-3xl font-normal text-gray-50 ">
        :
      </span>
      <NumberBox num={hours} unit="Hours" flip={hoursFlip} />
      <span className="hidden text-3xl -mt-8 md:inline-block md:text-3xl font-normal text-gray-50 ">
        :
      </span>
      <NumberBox num={minutes} unit="Minutes" flip={minutesFlip} />
      <span className="hidden text-3xl -mt-8 md:inline-block md:text-3xl font-normal text-gray-50 ">
        :
      </span>
      <NumberBox num={seconds} unit="Seconds" flip={secondsFlip} />
    </div>
  );
};

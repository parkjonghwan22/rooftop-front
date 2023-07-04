// import { useEffect, useRef, useState } from "react";
// import { TimerContainer } from "./timecontainer";
// import { TimerInput } from "./timeinput";

// export const Timer = () => {
//   const [newTime, setNewTime] = useState<number>(0);
//   const [days, setDays] = useState<number>(0);
//   const [hours, setHours] = useState<number>(0);
//   const [minutes, setMinutes] = useState<number>(0);
//   const [seconds, setSeconds] = useState<number>(0);

//   const countDownDateRef = useRef<number>(0);
//   const updateTimeRef = useRef<NodeJS.Timeout>();

 

//   return (
//     <div className="flex flex-col">
//       <TimerContainer
//         days={days}
//         hours={hours}
//         minutes={minutes}
//         seconds={seconds}
//       />
//       <TimerInput
//         value={newTime}
//         handleClick={handleClick}
//         handleChange={handleChange}
//       />
//     </div>
//   );
// };

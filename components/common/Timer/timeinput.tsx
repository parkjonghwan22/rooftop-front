// import { useRef, useState } from "react";

// export const TimerInput = (
// ) => {
//   const [newTime, setNewTime] = useState<number>(0);
//   const [days, setDays] = useState<number>(0);
//   const [hours, setHours] = useState<number>(0);
//   const [minutes, setMinutes] = useState<number>(0);
//   const [seconds, setSeconds] = useState<number>(0);

//   const countDownDateRef = useRef<number>(0);
//   const updateTimeRef = useRef<NodeJS.Timeout>();

//   const handleClick = () => {
//     if (newTime > 0) {
//       const timeToMinutes = newTime * 60;
//       countDownDateRef.current = new Date().getTime() + timeToMinutes * 1000;

//       updateTimeRef.current = setInterval(() => {
//         const now = new Date().getTime();
//         const difference = countDownDateRef.current - now;

//         const newDays = Math.floor(difference / (1000 * 60 * 60 * 24));
//         const newHours = Math.floor(
//           (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
//         );
//         const newMinutes = Math.floor(
//           (difference % (1000 * 60 * 60)) / (1000 * 60)
//         );
//         const newSeconds = Math.floor((difference % (1000 * 60)) / 1000);

//         setDays(newDays);
//         setHours(newHours);
//         setMinutes(newMinutes);
//         setSeconds(newSeconds);

//         if (difference <= 0) {
//           clearInterval(updateTimeRef.current!);
//           setDays(0);
//           setHours(0);
//           setMinutes(0);
//           setSeconds(0);
//         }
//       }, 1000);
//     } else {
//       clearInterval(updateTimeRef.current!);
//     }

//     return () => {
//       clearInterval(updateTimeRef.current!);
//     };
//   };

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const inputTime = Number(e.target.value);
//     setNewTime(inputTime);
//   };


//   return (
//     <div className="z-6 mx-auto space-y-4 flex flex-col md:flex-row justify-center items-center md:space-y-0 mt-2">
//       <input
//         className="text-xl md:text-lg font-redhat outline-none px-2 py-1 w-40 rounded-lg mr-4 bg-gray-800 text-white"
//         name="Timer Input"
//         type="number"
//         placeholder="시간설정"
//         onChange={handleChange}
//         min={0}
//       />
//       <button
//         onClick={handleClick}
//         className="bg-red-500 text-xl font-semibold font-redhat px-4 py-2 md:text-xl rounded-xl text-white hover:bg-rose-500 hover:text-rose-100 transition duration-300 ease-in"
//       >
//         Start
//       </button>
//     </div>
//   );
// };

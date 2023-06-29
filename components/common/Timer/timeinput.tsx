interface TimerInputProps {
  value: number;
  handleStartTimer(): void;
  handleChange(e: React.ChangeEvent<HTMLInputElement>): void;
}

export const TimerInput = ({
  value,

  handleStartTimer,
  handleChange,
}: TimerInputProps) => {
  return (
    <div className="z-6 mx-auto space-y-4 flex flex-col md:flex-row justify-center items-center md:space-y-0 mt-2">
      <input
        className="text-xl md:text-lg font-redhat outline-none px-2 py-1 w-40 rounded-lg mr-4 bg-gray-800 text-white"
        name="Timer Input"
        type="number"
        placeholder="시간설정"
        value={value}
        onChange={handleChange}
        min={0}
      />
      <button
        onClick={handleStartTimer}
        className="bg-red-500 text-xl font-semibold font-redhat px-4 py-2 md:text-xl rounded-xl text-white hover:bg-rose-500 hover:text-rose-100 transition duration-300 ease-in"
      >
        Start
      </button>
    </div>
  );
};

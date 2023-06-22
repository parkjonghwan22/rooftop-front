import LoadingSlider from "../modal/styled/LoadingSlide.styled";

export const LoadingSpinner2 = () => {
  return (
    <>
      <div className="relative flex justify-center items-center mt-40">
        <div className="absolute animate-spin rounded-full h-96 w-96 border-t-4 border-b-4 border-red-500"></div>
        <div className="rounded-full h-80 w-80">
          <LoadingSlider />
        </div>
      </div>
    </>
  );
};
{
  /* <div className="relative flex justify-center items-center mt-40">
        <div className="absolute animate-spin rounded-full h-96 w-96 border-t-4 border-b-4 border-red-500"></div>
        <img
          src="http://localhost:3000/test2.png"
          className="rounded-full h-80 w-80"
        />
      </div> */
}

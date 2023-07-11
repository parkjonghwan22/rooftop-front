import tw from "tailwind-styled-components";
import Image from "next/image";
import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const LoadingSlider = () => {
  const settings = {
    infinite: true,
    speed: 300,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 1000,
    arrows: false,
  };

  return (
    <Slider {...settings}>
      <div>
        <Image
          src="http://localhost:3000/test1.png"
          alt="test"
          width={1000}
          height={1000}
          className="object-fill w-80 h-80 rounded-full "
        />
      </div>
      <div>
        <Image
          src="http://localhost:3000/test2.png"
          alt="test"
          width={1000}
          height={1000}
          className="object-fill w-80 h-80 rounded-full"
        />
      </div>
      <div>
        <Image
          src="http://localhost:3000/test3.png"
          alt="test"
          width={1000}
          height={1000}
          className="object-fill w-80 h-80 rounded-full"
        />
      </div>
      <div>
        <Image
          src="http://localhost:3000/test4.png"
          alt="test"
          width={1000}
          height={1000}
          className="object-fill w-80 h-80 rounded-full"
        />
      </div>
    </Slider>
  );
};

export default LoadingSlider;

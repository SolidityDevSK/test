import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Image from "next/image";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

const CustomPrevArrow = (props) => {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ ...style, zIndex: "50", display: "block", left: "0" }}
      onClick={onClick}
    >
      <FaArrowLeft />
    </div>
  );
};

const CustomNextArrow = (props) => {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ ...style, display: "block", right: "0" }}
      onClick={onClick}
    >
      <FaArrowRight />
    </div>
  );
};

export const ImageSlider = ({ images, isSelected, handleSelectBG }) => {
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    centerMode: false,
    initialSlide: isSelected,
    afterChange: (current) => {
      handleSelectBG(current);
    },
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <div className="md:max-w-full max-w-[250px] mx-auto">
      <Slider
        {...settings}
        prevArrow={<CustomPrevArrow />}
        nextArrow={<CustomNextArrow />}
      >
        {images.map((item, index) => (
          <div key={index} className="relative">
            <Image
              src={item}
              alt={`img-${index}`}
              width={150}
              height={150}
              className={`${
                index === isSelected ? "border-white" : "border-transparent"
              } border w-[200px] h-[100px] mx-auto rounded-lg cursor-pointer object-cover`}
              onClick={() => handleSelectBG(index)}
            />
          </div>
        ))}
      </Slider>
    </div>
  );
};

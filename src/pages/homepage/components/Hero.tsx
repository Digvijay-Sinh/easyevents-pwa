import { Carousel } from "flowbite-react";
import PosterImage1 from "../../../assets/events/adam-whitlock-I9j8Rk-JYFM-unsplash.jpg";
import PosterImage3 from "../../../assets/events/aleksandr-popov-hTv8aaPziOQ-unsplash.jpg";
import PosterImage2 from "../../../assets/events/matthew-osborn-wMRIcT86SWU-unsplash.jpg";

// import PosterImage6 from "../../../assets/events/adam-whitlock-I9j8Rk-JYFM-unsplash.jpg";
const Hero = () => {
  const SliderData = [
    {
      id: 1,
      bgImg: PosterImage1,
      slogan: "Pushkar Holi",
      title: "Mela",
      desc: "March 21, 2024, 10:00 AM - March 23, 2024, 8:00 PM",
    },
    {
      id: 2,
      bgImg: PosterImage2,
      slogan: "Microsoft Community",
      title: "Conference",
      desc: "April 15, 2024, 9:00 AM - April 16, 2024, 5:00 PM",
    },
    {
      id: 3,
      bgImg: PosterImage3,
      slogan: "DJ Night",
      title: "Ed-Sheeran",
      desc: "May 5, 2024, 8:00 PM - May 6, 2024, 2:00 AM",
    },
  ];
  return (
    <>
      <div className="md:h-[60vh] sm:h-[60vh] xs:h-[60vh] overflow-hidden sm:p-10 ">
        <div className="md:h-[50vh] sm:h-[50vh] xs:h-[50vh] w-full  mt-5">
          <Carousel>
            {SliderData.map((item) => (
              <div
                key={item.id}
                className="relative md:h-[90vh] sm:h-[70vh] xs:h-[70vh] "
              >
                <img
                  src={item.bgImg}
                  className="object-cover w-full h-full opacity-70"
                  alt="..."
                />
                <div className="absolute inset-0 flex flex-col justify-center items-start ml-14">
                  <h1 className="text-white  md:text-6xl sm:text-4xl xs:text-3xl pb-1 font-bold text-center">
                    {item.slogan}
                  </h1>
                  <h1 className="text-white md:text-6xl sm:text-5xl xs:text-3xl pb-4 font-bold text-center ">
                    {item.title}
                  </h1>
                  <p className="text-white md:text-2xl sm:text-xl xs:text-lg text-center w-3/4">
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </Carousel>
        </div>
      </div>
    </>
  );
};

export default Hero;

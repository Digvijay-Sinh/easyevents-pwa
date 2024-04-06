import { Link } from "react-router-dom";
// import { Event } from "../index";
// interface EventDetailsProps {
//   event: Event;
//   customKey: number;
// }

const EventCard = () => {
  return (
    <>
      <Link to={`/event/876876`}>
        <div className="w-full   rounded-md bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 p-[1px] ">
          <div className=" transition-transform duration-200 hover:scale-105 m-[1px] border w-5/6   rounded-lg shadow   w-full  p-2  bg-black ">
            <a href="#">
              <img
                className="rounded-t-lg lg:h-48 md:h-48 h-28 w-full object-cover object-center "
                src={`https://easyeventsbackend-pwa.onrender.com/uploads/image-1710848396506garba_event.jpg`}
                alt=""
              />
            </a>
            <div className="p-5">
              <p className="mb-3 font-normal sm:text-xs text-[10px] text-gray-400">
                Booking starts from: <br />
              </p>
              <h5 className="mb-2 truncate text-lg  font-bold tracking-tight text-white  md:text-2xl sm:text-3xl xs:text-3xl">
                title
              </h5>
              <p className="mb-3 font-normal sm:text-xs text-[10px] text-gray-200">
                Something
              </p>

              {/* <a
            href="#"
            className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white  rounded-lg   bg-blue-600 hover:bg-blue-700 focus:ring-blue-800"
          >
            Read more
            <svg
              className="rtl:rotate-180 w-3.5 h-3.5 ms-2"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 14 10"
            >
              <path
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M1 5h12m0 0L9 1m4 4L9 9"
              />
            </svg>
          </a> */}
            </div>
          </div>
        </div>
      </Link>
    </>
  );
};

export default EventCard;

import { Link } from "react-router-dom";
import { Event } from "../index";
interface EventDetailsProps {
  event: Event;
  customKey: number;
}

const EventCard: React.FC<EventDetailsProps> = ({ event }) => {
  const convertedEventDate = (backendDate: string) => {
    const userTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;

    // Create a Date object from the backend date string
    const utcDate = new Date(backendDate);

    // Convert the date to the user's timezone
    const userLocalDate = new Date(
      utcDate.toLocaleString("en-US", { timeZone: userTimeZone })
    );

    // Get the time portion of the date
    // const time = userLocalDate.toLocaleTimeString("en-US", {
    //   hour: "numeric",
    //   minute: "numeric",
    //   hour12: true,
    // });
    // https://dv8rlqlr-5173.inc1.devtunnels.ms/
    return `${userLocalDate.toDateString()}`;
  };
  return (
    <>
      <Link to={`/event/${event.id}`}>
        <div className="w-full h-full   rounded-md bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 p-[1px] ">
          <div className="max-w-sm transition-transform duration-200 hover:scale-105 m-[1px] border w-5/6   rounded-lg shadow   w-full  p-2  bg-black ">
            <a href="#">
              <img
                className="rounded-t-lg lg:h-48 md:h-48 h-28 w-full object-cover object-center "
                src={`https://easyeventsbackend-pwa.onrender.com/uploads/${event.images[0]?.poster_image}`}
                alt=""
              />
            </a>
            <div className="p-5">
              <p className="mb-3 font-normal sm:text-xs text-[10px] text-gray-400">
                Booking starts from: <br />
                {convertedEventDate(event.start_date_toRegister)}{" "}
              </p>
              <h5 className="mb-2 truncate text-lg  font-bold tracking-tight text-white  md:text-2xl sm:text-3xl xs:text-3xl">
                {event.title}
              </h5>
              <p className="mb-3 font-normal sm:text-xs text-[10px] text-gray-200">
                {convertedEventDate(event.start_date)}-{" "}
                {convertedEventDate(event.end_date)}
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

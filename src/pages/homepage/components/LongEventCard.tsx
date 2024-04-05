import { Link } from "react-router-dom";
import { Event } from "../index";

import { MdDateRange } from "react-icons/md";

interface EventDetailsProps {
  event: Event;
  customKey: number;
}

const LongEventCard: React.FC<EventDetailsProps> = ({ event, customKey }) => {
  console.log(customKey);

  const convertedEventDate = (backendDate: string) => {
    const userTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;

    // Create a Date object from the backend date string
    const utcDate = new Date(backendDate);

    // Convert the date to the user's timezone
    const userLocalDate = new Date(
      utcDate.toLocaleString("en-US", { timeZone: userTimeZone })
    );

    return `${userLocalDate.toDateString()}`;
  };
  return (
    <>
      <Link className="w-1/2 p-3" to={`/event/${event.id}`}>
        <div className="w-full h-full   rounded-md bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 p-[1px] ">
          <div className="flex sm:w-full w-full  sm:border bg-black border-gray-700  flex-col sm:flex-row rounded-xl mt-0">
            {/* Profile Side */}
            <div className="sm:w-1/3 flex items-center sm:p-4 w-full p-1">
              <div className="posterImage w-full">
                <img
                  className="rounded-t-lg w-full object-cover object-center aspect-ratio-16-9 "
                  src={`https://easyeventsbackend-pwa.onrender.com/uploads/${event?.images[0]?.poster_image}`}
                  alt=""
                />{" "}
              </div>
            </div>
            {/* Bookings Table Side */}
            <div className="sm:w-2/3 sm:p-4 w-full p-1 ">
              <div className="datetime flex items-center p-3 rounded-xl sm:py-3 backdrop-blur-md bg-black/50  ">
                <div className="flex flex-col gap-3">
                  {" "}
                  <div className="username w-full flex gap-2 flex-col ">
                    <span className="text-sm   md:text-base text-white m-0">
                      {event.title}
                    </span>
                    <span className="text-sm self-start p-1 px-2 max-w-fit rounded-lg bg-gradient-to-r from-fuchsia-600 to-pink-600   md:text-base text-white m-0">
                      ₹ {event.price}
                    </span>
                  </div>
                  <div className="username flex gap-2">
                    <MdDateRange className="text-yellow-300 mr-2 text-xl md:text-2xl" />

                    <span className="text-sm   md:text-base text-white m-0">
                      {convertedEventDate(event?.start_date)}-
                      {convertedEventDate(event?.end_date)}
                    </span>
                  </div>
                  {/* <span className="text-sm   md:text-base text-white m-0">
                {event?.end_date}
              </span> */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </Link>
    </>
  );
};

export default LongEventCard;

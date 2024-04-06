import { useParams } from "react-router-dom";
// import posterImage from "../../assets/events/aleksandr-popov-hTv8aaPziOQ-unsplash.jpg";
import { FaMapMarkerAlt } from "react-icons/fa";
import { MdDateRange } from "react-icons/md";
import { Button } from "flowbite-react";
import { RiAccountCircleFill } from "react-icons/ri";
import { IoTimeSharp } from "react-icons/io5";
import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { axiosPrivate } from "../../api/axios";
import Maps from "../demoApi/Maps";
import { LatLngExpression } from "leaflet";
// const LazyCustomModal = lazy(() => import("./CustomModel"));

interface BookingWithUserData {
  id: number;
  eventId: number;
  userId: number;

  qrCodeImageUrl: string | null;
  bookingDateTime: Date;
  numberOfTickets: number;
  bookingStatus: string;
  paymentStatus: string;
  paymentMethod: string;
  totalAmount: number;
  bookingReference: string;
  user: SelectedUserData2; // User data associated with the booking
}

interface SelectedUserData2 {
  id: number;
  email: string;
  name: string | null;
  mobileNumber: string | null;
  profileImage: string | null;
}

export interface Organizer {
  id: number;
  email: string;
  name: string;
  isAuthenticated: boolean;
  googleId: string | null;
  password: string;
  refreshToken: string;
}

export interface Venue {
  id: number;
  name: string;
  latitude: number | null;
  postcode: string;
  longitude: number | null;
  address: string;
  city: string;
  state: string;
  country: string;
  google_place_id: string;
}

export interface Category {
  id: number;
  name: string;
  image: string;
}

export interface Type {
  id: number;
  name: string;
}

export interface Speaker {
  id: number;
  name: string;
  bio: string;
  email: string;
  organization: string;
  image: string;
}

export interface Image {
  id: number;
  poster_image: string;
  event_id: number;
}

export interface Event {
  id: number;
  title: string;
  description: string;
  start_date: string;
  end_date: string;
  start_date_toRegister: string;
  end_date_toRegister: string;
  mode: string;
  capacity: number;
  tickets_remaining: number;
  price: number;
  organizer_id: number;
  venue_id: number;
  category_id: number;
  type_id: number;
  organizer: Organizer;
  venue: Venue;
  category: Category;
  type: Type;
  speakers: Speaker[];
  images: Image[];
}

const EventHostedPage = () => {
  const [event, setEvent] = useState<Event>();
  const [bookingData, setBookingData] = useState<BookingWithUserData[]>();
  const [selectPosition, setSelectPosition] = useState<LatLngExpression | null>(
    null
  );

  const position: LatLngExpression = [23.03282845, 72.54671281964617];
  const eventId = useParams().eventId;
  console.log(eventId);

  const convertedEventDate = (backendDate: string) => {
    const userTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;

    // Create a Date object from the backend date string
    const utcDate = new Date(backendDate);

    // Convert the date to the user's timezone
    const userLocalDate = new Date(
      utcDate.toLocaleString("en-US", { timeZone: userTimeZone })
    );
    console.log(userLocalDate);

    const formattedTime = userLocalDate.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    });

    // Get the time portion of the date
    // const time = userLocalDate.toLocaleTimeString("en-US", {
    //   hour: "numeric",
    //   minute: "numeric",
    //   hour12: true,
    // });
    // https://dv8rlqlr-5173.inc1.devtunnels.ms/
    return `${userLocalDate.toDateString()} ${formattedTime}`;
  };

  const fetchDetailedEventData = async () => {
    try {
      // Make a GET request to fetch categories from the backend
      const response = await axios.get<Event[]>(
        `https://easyeventsbackend-pwa.onrender.com/api/v1/events/detailed/${eventId}`
      );

      console.log(response.data);

      // Set the fetched categories in the state
      setEvent(response.data[0]);

      console.log("=========categories==============");
    } catch (error) {
      if (axios.isAxiosError(error)) {
        // Handle Axios errors
        if (error.response && error.response.data) {
          // Handle specific error messages from backend
          const errorMessage = error.response.data.message;
          toast.error(errorMessage);
        } else {
          // Other errors
          toast.error("An error occurred");
        }
      } else {
        // Handle non-Axios errors
        toast.error("An error occurred");
        console.error("An error occurred:", error);
      }
      console.log(error);
    }
  };

  const fetchDetailedBookingData = async () => {
    try {
      // Make a GET request to fetch categories from the backend
      const response = await axiosPrivate.get<BookingWithUserData[]>(
        `/api/v1/events/getUserEventsDetailsHostedEvents/${eventId}`
      );

      console.log(response.data);

      // Set the fetched categories in the state
      setBookingData(response.data);

      console.log("=========categories==============");
    } catch (error) {
      if (axios.isAxiosError(error)) {
        // Handle Axios errors
        if (error.response && error.response.data) {
          // Handle specific error messages from backend
          const errorMessage = error.response.data.message;
          toast.error(errorMessage);
        } else {
          // Other errors
          toast.error("An error occurred");
        }
      } else {
        // Handle non-Axios errors
        toast.error("An error occurred");
        console.error("An error occurred:", error);
      }
      console.log(error);
    }
  };

  useEffect(() => {
    console.log("====================================");
    console.log("REached");
    console.log("====================================");
    fetchDetailedBookingData();
  }, []);

  useEffect(() => {
    console.log("====================================");
    console.log(bookingData);
    console.log("====================================");
  }, [bookingData]);

  useEffect(() => {
    fetchDetailedEventData();
  }, []);
  useEffect(() => {
    console.log("====================================");
    console.log(event);
    console.log("====================================");
    if (event?.venue.latitude && event?.venue.longitude) {
      setSelectPosition([
        event?.venue.latitude,
        event?.venue.longitude,
      ] as LatLngExpression);
    }
  }, [event]);

  return (
    <div
      className="mx-auto"
      style={{
        background:
          "linear-gradient(142deg, rgba(86,31,41,1) 0%, rgba(0,0,0,1) 25%, rgba(0,0,0,1) 75%, rgba(86,31,41,1) 100%)",
      }}
    >
      <div className="pt-10 px-2 sm:w-5/6 w-full mx-auto flex flex-col justify-between">
        <h1 className="text-xl my-2 font-bold leading-tight tracking-wide  md:text-2xl text-white text-left">
          {event?.title} <br />
        </h1>{" "}
        <div className="flex flex-col">
          {" "}
          <span className="text-xs flex items-center gap-2 mb-1 md:text-sm text-gray-300 m-0">
            <IoTimeSharp className="text-yellow-300 text-base" />
            Registration{" "}
            {convertedEventDate(event?.start_date_toRegister as string)}-{" "}
            {convertedEventDate(event?.end_date_toRegister as string)}
          </span>
        </div>
      </div>
      <div className="flex sm:w-5/6 w-full mx-auto sm:border border-gray-700  flex-col sm:flex-row rounded-xl ">
        <div className="left sm:w-4/6 sm:p-4 w-full p-1">
          <div className="posterImage w-full">
            <img
              className="rounded-t-lg w-full object-cover object-center aspect-ratio-16-9 "
              src={`https://easyeventsbackend-pwa.onrender.com/uploads/${event?.images[0]?.poster_image}`}
              alt=""
            />{" "}
          </div>
          <div className="datetime flex flex-wrap gap-2 items-center mt-2 border border-gray-700 p-3 rounded-xl sm:py-3 backdrop-blur-md bg-black/50  ">
            <Button className="p-0 mx-auto bg-purple-900 rounded-full">
              {event?.mode}
            </Button>
            <Button className="p-0 mx-auto  bg-purple-900 rounded-full">
              {event?.category.name}
            </Button>
            <Button className="p-0 mx-auto  bg-purple-900 rounded-full">
              {event?.type.name}
            </Button>
          </div>
        </div>
        <div className="right  sm:w-2/6 sm:p-4 w-full p-1">
          <div className="datetime flex items-center border border-gray-700 p-3 rounded-xl sm:py-3 backdrop-blur-md bg-black/50  ">
            <MdDateRange className="text-yellow-300 mr-2 text-xl md:text-2xl" />
            <div className="flex flex-col">
              {" "}
              <span className="text-sm   md:text-base text-white m-0">
                {convertedEventDate(event?.start_date as string)}
              </span>
              {/* <span className="text-sm   md:text-base text-white m-0">
                {event?.end_date}
              </span> */}
            </div>
            <span className="text-sm   md:text-base text-white mx-4">-</span>
            <div className="flex flex-col">
              {" "}
              <span className="text-sm   md:text-base text-white m-0">
                {convertedEventDate(event?.end_date as string)}
              </span>
              {/* <span className="text-sm   md:text-base text-white m-0">
                15:21:00{" "}
              </span> */}
            </div>
          </div>
          <div className="datetime mt-3 flex items-center border border-gray-700 p-3 rounded-xl sm:py-3 backdrop-blur-md bg-black/50  ">
            <FaMapMarkerAlt className="text-yellow-300 mr-2 text-xl md:text-2xl" />
            <div className="flex flex-col">
              {" "}
              <span className="text-sm   md:text-base text-white m-0">
                {event?.venue.name}
              </span>
              <span className="text-sm   md:text-base text-white m-0">
                {event?.venue.city}, {event?.venue.state},{event?.venue.country}{" "}
                - {event?.venue.postcode}
              </span>
            </div>
          </div>
          <div className="datetime mt-3 flex items-center border h-[25vh] border-gray-700 p-3 rounded-xl sm:py-3 backdrop-blur-md bg-black/50  ">
            <div style={{ width: "100%", height: "100%" }}>
              <Maps selectPosition={selectPosition || position} />
            </div>
          </div>
          <div className="flex justify-center w-full">
            <div className="datetime mt-3 sm:w-full w-full ticket sm:py-3  align-middle  ">
              <div className="flex justify-between">
                <p className="text-sm p-1   md:text-base text-white m-0">
                  Tickets remaining:
                </p>
                <p className="text-sm p-1 px-3 rounded-lg font-bold  bg-yellow-300  md:text-base text-black m-0">
                  {event?.tickets_remaining}
                </p>
              </div>
              <div className="flex justify-between mt-1">
                <p className="text-sm p-1   md:text-base text-white m-0">
                  Tickets booked:
                </p>
                <p className="text-sm p-1 px-3 rounded-lg font-bold  bg-yellow-300  md:text-base text-black m-0">
                  {event?.tickets_remaining
                    ? (((event?.capacity as number) -
                        event?.tickets_remaining) as number)
                    : 0}
                </p>
              </div>

              {/* <Button
                onClick={() => {
                  //check if user exists in auth in useAuth

                  //if yes then open modal
                  setModalOpen(true);
                }}
                className="p-0 mx-auto mt-2 focus:z-0"
              >
                Book now
              </Button> */}
            </div>
          </div>
          {/* <div className="datetime flex flex-wrap gap-2 items-center mt-2 border border-gray-700 p-3 rounded-xl sm:py-3 backdrop-blur-md bg-black/50  ">
            <Button className="p-0 mx-auto bg-purple-900 rounded-full">
              {event?.mode}
            </Button>
            <Button className="p-0 mx-auto  bg-purple-900 rounded-full">
              {event?.category.name}
            </Button>
            <Button className="p-0 mx-auto  bg-purple-900 rounded-full">
              {event?.type.name}
            </Button>
          </div> */}
        </div>
      </div>
      <div className="flex sm:w-5/6 w-full mx-auto sm:border border-gray-700 flex-col-reverse sm:flex-row rounded-xl mt-2">
        <div className="left sm:w-4/6 sm:p-4 p-2 w-full ">
          <div className="border border-gray-700 rounded-xl p-3">
            <h1 className="text-xl my-2 font-bold leading-tight tracking-tight  md:text-2xl text-white text-left">
              Description <br />
            </h1>{" "}
            <p className="text-white text-justify text-sm">
              {event?.description}
            </p>
          </div>
        </div>
        <div className="right sm:w-2/6 sm:p-4 w-full p-1">
          <div className="datetime flex flex-col items-center border border-gray-700 p-3 rounded-xl sm:py-3 backdrop-blur-md bg-black/50  ">
            <span className="text-sm   md:text-base text-white m-0">
              Organizer
            </span>
            <div className="flex">
              <RiAccountCircleFill className="text-yellow-300 mr-2 text-xl md:text-2xl" />
              <span className="text-sm   md:text-base text-white m-0">
                {event?.organizer.name}
              </span>
            </div>
          </div>
          <div className="datetime mt-2 flex flex-col items-center border  border-gray-700 p-3 rounded-xl sm:py-3 backdrop-blur-md bg-black/50  ">
            <span className="text-sm   md:text-base text-white m-0">
              Speakers
            </span>
            {event?.speakers.map((speaker) => {
              return (
                <div className="flex items-center  mt-2">
                  <div className="posterImage w-1/4 mr-4">
                    <img
                      className="rounded-full w-full object-cover object-center aspect-ratio-rounded"
                      src={`https://easyeventsbackend-pwa.onrender.com/uploads/${speaker.image}`}
                      alt=""
                    />{" "}
                  </div>
                  <span className="text-sm   md:text-base text-white m-0">
                    {speaker.name}
                  </span>
                </div>
              );
            })}

            {/* <div className="flex items-center mt-2">
              <div className="posterImage w-1/4 mr-4">
                <img
                  className="rounded-full w-full object-cover object-center aspect-ratio-rounded"
                  src={`https://easyeventsbackend-pwa.onrender.com/uploads/${event?.speakers}`}
                  alt=""
                />{" "}
              </div>
              <span className="text-sm   md:text-base text-white m-0">
                Digvijay Sinh Chauhan
              </span>
            </div> */}
            {/* <div className="flex items-center  mt-2">
              <div className="posterImage w-1/4 mr-4">
                <img
                  className="rounded-full w-full object-cover object-center aspect-ratio-rounded"
                  src={posterImage}
                  alt=""
                />{" "}
              </div>
              <span className="text-sm   md:text-base text-white m-0">
                Digvijay Sinh Chauhan
              </span>
            </div>
            <div className="flex items-center  mt-2">
              <div className="posterImage w-1/4 mr-4">
                <img
                  className="rounded-full w-full object-cover object-center aspect-ratio-rounded"
                  src={posterImage}
                  alt=""
                />{" "}
              </div>
              <span className="text-sm   md:text-base text-white m-0">
                Digvijay Sinh Chauhan
              </span>
            </div> */}
          </div>
        </div>
      </div>
      <div className="flex mt-3 sm:w-5/6 w-full mx-auto sm:border border-gray-700  flex-col sm:flex-row rounded-xl ">
        <div className="relative overflow-x-auto w-full shadow-md sm:rounded-lg">
          <div className="flex items-center justify-between flex-column flex-wrap md:flex-row space-y-4 md:space-y-0 pb-4  ">
            {/* <div>
              <button
                id="dropdownActionButton"
                data-dropdown-toggle="dropdownAction"
                className="inline-flex items-center text-gray-500 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-3 py-1.5  text-gray-400 border-gray-600 hover:bg-gray-700 hover:border-gray-600 focus:ring-gray-700"
                type="button"
              >
                <span className="sr-only">Action button</span>
                Action
                <svg
                  className="w-2.5 h-2.5 ms-2.5"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 10 6"
                >
                  <path
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="m1 1 4 4 4-4"
                  />
                </svg>
              </button>
              <div
                id="dropdownAction"
                className="z-10 hidden bg-white divide-y divide-gray-100 rounded-lg shadow w-44 bg-gray-700 divide-gray-600"
              >
                <ul
                  className="py-1 text-sm text-gray-700 text-gray-200"
                  aria-labelledby="dropdownActionButton"
                >
                  <li>
                    <a
                      href="#"
                      className="block px-4 py-2 hover:bg-gray-100 hover:bg-gray-600 hover:text-white"
                    >
                      Reward
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="block px-4 py-2 hover:bg-gray-100 hover:bg-gray-600 hover:text-white"
                    >
                      Promote
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="block px-4 py-2 hover:bg-gray-100 hover:bg-gray-600 hover:text-white"
                    >
                      Activate account
                    </a>
                  </li>
                </ul>
                <div className="py-1">
                  <a
                    href="#"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:bg-gray-600 text-gray-200 hover:text-white"
                  >
                    Delete User
                  </a>
                </div>
              </div>
            </div> */}
            {/* <label htmlFor="table-search" className="sr-only">
              Search
            </label> */}
            {/* <div className="relative">
              <div className="absolute inset-y-0 rtl:inset-r-0 start-0 flex items-center ps-3 pointer-events-none">
                <svg
                  className="w-4 h-4 text-gray-500 text-gray-400"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 20 20"
                >
                  <path
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                  />
                </svg>
              </div>
              <input
                type="text"
                id="table-search-users"
                className="block p-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
                placeholder="Search for users"
              />
            </div> */}
          </div>
          <table className="w-full text-sm text-left rtl:text-right  text-gray-300">
            <thead className="text-xs text-white uppercase">
              <tr>
                <th scope="col" className="px-6 py-3">
                  Name
                </th>

                <th scope="col" className="px-6 py-3">
                  No. Of Tickets
                </th>
                <th scope="col" className="px-6 py-3">
                  Payment
                </th>
                <th scope="col" className="px-6 py-3">
                  Booking Status
                </th>
                <th scope="col" className="px-6 py-3">
                  Payment Status
                </th>
              </tr>
            </thead>
            <tbody>
              {bookingData &&
                bookingData.map((booking, i) => {
                  console.log(booking);

                  return (
                    <tr className=" border  border-gray-700 ">
                      <th
                        scope="row"
                        className="flex items-center px-6 py-4  whitespace-nowrap text-white"
                      >
                        <img
                          className="w-10 h-10 rounded-full"
                          src={`https://easyeventsbackend-pwa.onrender.com/uploads/${
                            bookingData
                              ? bookingData[i].user.profileImage
                              : "No Image"
                          }
                    `}
                          alt="Jese image"
                        />
                        <div className="ps-3">
                          <div className="text-base font-semibold">
                            {bookingData ? bookingData[i].user.name : "No name"}
                          </div>
                          <div className="font-normal text-gray-300">
                            {bookingData
                              ? bookingData[i].user.email
                              : "No email"}
                          </div>
                        </div>
                      </th>

                      <td className="px-6 py-4">
                        <div className="flex items-center">
                          {bookingData
                            ? bookingData[i].numberOfTickets
                            : "No Tickets"}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center">
                          ₹{" "}
                          {bookingData
                            ? bookingData[i].totalAmount
                            : "No Amount"}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center">
                          <div className="h-2.5 w-2.5 rounded-full bg-green-500 me-2"></div>{" "}
                          {bookingData
                            ? bookingData[i].bookingStatus
                            : "No status"}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center">
                          <div className="h-2.5 w-2.5 rounded-full bg-green-500 me-2"></div>{" "}
                          {bookingData
                            ? bookingData[i].paymentStatus
                            : "No Status"}
                        </div>
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </div>
      </div>
      {/* <>
        <div>
          <Suspense fallback={<h2>Loading...</h2>}>
            {modalOpen && (
              <div className="fixed inset-0 backdrop-filter backdrop-blur-lg">
                <LazyCustomModal
                  modalOpen={modalOpen}
                  handleOpenModal={handleOpenModal}
                  handleCloseModal={handleCloseModal}
                  eventId={event?.id}
                  eventPrice={event?.price}
                />
              </div>
            )}
          </Suspense>
        </div>
      </> */}
    </div>
  );
};

export default EventHostedPage;

import { useParams } from "react-router-dom";
import { FaMapMarkerAlt } from "react-icons/fa";
import { MdDateRange } from "react-icons/md";
import { Button } from "flowbite-react";
import { RiAccountCircleFill } from "react-icons/ri";
import { IoTimeSharp } from "react-icons/io5";
import { Suspense, lazy, useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useAuth } from "../../context/AuthProvider";
import Maps from "../demoApi/Maps";
import { LatLngExpression } from "leaflet";
const LazyCustomModal = lazy(() => import("./CustomModel"));

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
  longitude: number | null;
  address: string;
  city: string;
  state: string;
  country: string;
  postcode: string;
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

const EventPage = () => {
  const [selectPosition, setSelectPosition] = useState<LatLngExpression | null>(
    null
  );

  const [booked, setBooked] = useState(false);

  const position: LatLngExpression = [23.03282845, 72.54671281964617];

  const [modalOpen, setModalOpen] = useState(false);

  const { auth } = useAuth();

  const handleOpenModal = () => {
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  const [event, setEvent] = useState<Event>();

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
        `http://localhost:5000/api/v1/events/detailed/${eventId}`
      );

      console.log(JSON.stringify(response.data));

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

  useEffect(() => {
    fetchDetailedEventData();
  }, []);
  useEffect(() => {
    fetchDetailedEventData();
  }, [booked]);
  useEffect(() => {
    console.log("====================================");
    console.log(event);
    console.log("====================================");
    console.log(event?.venue.latitude);
    console.log(event?.venue.longitude);
    console.log("====================================");
    if (event?.venue.latitude && event?.venue.longitude) {
      setSelectPosition([
        event?.venue.latitude,
        event?.venue.longitude,
      ] as LatLngExpression);
    }
    console.log("====================================");
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
              src={`http://localhost:5000/uploads/${event?.images[0]?.poster_image}`}
              alt=""
            />{" "}
          </div>
          <div className="datetime w-full flex flex-wrap gap-2 items-center mt-2 border border-gray-700 p-3 rounded-xl sm:py-3 backdrop-blur-md bg-black/50  ">
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
                {event?.venue.city}, {event?.venue.state},{" "}
                {event?.venue.country} - {event?.venue.postcode}
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
                  Tickets remaining: {event?.tickets_remaining}
                </p>
                <p className="text-sm p-1 px-3 rounded-lg font-bold  bg-yellow-300  md:text-base text-black m-0">
                  ₹ {event?.price}
                </p>
              </div>
              <Button
                onClick={() => {
                  if (auth && auth?.accessToken) {
                    const currentDate = new Date();
                    const startDateToRegister = new Date(
                      event?.start_date_toRegister as string
                    );
                    const endDateToRegister = new Date(
                      event?.end_date_toRegister as string
                    );

                    console.log("====================================");
                    console.log("Current Date:", currentDate);
                    console.log("Start Date:", startDateToRegister);
                    console.log("End Date:", endDateToRegister);
                    console.log("====================================");

                    if (
                      currentDate >= startDateToRegister &&
                      currentDate <= endDateToRegister
                    ) {
                      // User is within the registration period
                      // Open the modal
                      setModalOpen(true);
                    } else {
                      toast.error("Registration period has ended");
                      // User is outside the registration period
                      // Display a message or take appropriate action
                    }
                  } else {
                    setModalOpen(true);
                  }
                  //check if user exists in auth in useAuth

                  //if yes then open modal
                }}
                className="p-0 mx-auto mt-2 focus:z-0"
              >
                Book now
              </Button>
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
                      src={`http://localhost:5000/uploads/${speaker.image}`}
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
                  src={`http://localhost:5000/uploads/${event?.speakers}`}
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
      <>
        <div>
          <Suspense fallback={<h2>Loading...</h2>}>
            {modalOpen && (
              <div className="fixed inset-0 backdrop-filter backdrop-blur-lg">
                <LazyCustomModal
                  booked={booked}
                  modalOpen={modalOpen}
                  setBooked={setBooked}
                  handleOpenModal={handleOpenModal}
                  handleCloseModal={handleCloseModal}
                  eventId={event?.id as number}
                  eventPrice={event?.price as number}
                />
              </div>
            )}
          </Suspense>
        </div>
      </>
    </div>
  );
};

export default EventPage;

import { yupResolver } from "@hookform/resolvers/yup";
import axios from "axios";
import { Button } from "flowbite-react";
import React, { useEffect, useRef, useState, Dispatch } from "react";
import { Resolver, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { MdAddBox } from "react-icons/md";
import * as yup from "yup";
import { DevTool } from "@hookform/devtools";
import { axiosPrivate } from "../../api/axios";
import { Event } from "../eventpage";
import { LatLngExpression } from "leaflet";
import SearchBox, { PlaceData } from "../demoApi/SearchBar";
import Maps from "../demoApi/Maps";

enum EventMode {
  OFFLINE = "OFFLINE",
  ONLINE = "ONLINE",
}

interface Venue {
  id: number;
  name: string;
  latitude?: number | null;
  longitude?: number | null;
  address: string;
  city: string;
  state: string;
  country: string;
  google_place_id?: string | null;
}

interface Category {
  id: number;
  name: string;
}
interface Type {
  id: number;
  name: string;
}

const schema = yup.object().shape({
  title: yup.string().required("Event Title is required"),
  description: yup.string().required("Event Description is required"),
  start_date: yup.date().required("Event Start Date is required"),
  end_date: yup
    .date()
    .min(yup.ref("start_date"), "End date must be after start date")
    .required("Event End Date is required"),
  start_date_toRegister: yup
    .date()
    .required("Registration Start Date is required")
    .max(
      yup.ref("start_date"),
      "Registration start date must be before event start date"
    ),

  end_date_toRegister: yup
    .date()
    .required("End Date to Register is required")
    .test(
      "end_date_toRegister",
      "Registration end date must be before start date and registration start date",
      function (value) {
        const { start_date, start_date_toRegister } = this.parent;
        // Custom validation logic
        return (
          new Date(value) <= new Date(start_date) &&
          new Date(value) >= new Date(start_date_toRegister)
        );
      }
    ),
  mode: yup
    .string()
    .oneOf(Object.values(EventMode))
    .required("Event Mode is required"),
  capacity: yup.number().integer().required("Event Capacity is required"),
  price: yup.number().required("Ticket Price is required"),
  organizer_id: yup.number().required("Organizer ID is required"),
  venue_id: yup.number().required("Venue ID is required"),
  category_id: yup.number().required("Category ID is required"),
  type_id: yup.number().required("Type ID is required"),
});

type FormData = {
  title: string;
  description: string;
  start_date: Date;
  end_date: Date;
  start_date_toRegister: Date;
  end_date_toRegister: Date;
  capacity: number;
  price: number;
  organizer_id: number;
  venue_id: number;
  category_id: number;
  type_id: number;
};
type FormDataVenue = {
  name: string;
  address: string;
  city: string;
  state: string;
  country: string;
};

const formDataVenueSchema = yup.object().shape({
  name: yup.string().required("Name is required"),
  address: yup.string().required("Address is required"),
  city: yup.string().required("City is required"),
  state: yup.string().required("State is required"),
  country: yup.string().required("Country is required"),
});

type props = {
  showForm1: boolean;
  setShowForm1: React.Dispatch<React.SetStateAction<boolean>>;
  showForm2: boolean;
  setShowForm2: React.Dispatch<React.SetStateAction<boolean>>;
  showForm3: boolean;
  setShowForm3: React.Dispatch<React.SetStateAction<boolean>>;
  showForm4: boolean;
  setShowForm4: React.Dispatch<React.SetStateAction<boolean>>;
  eventId: number;
  event: Event;
};

const EditEventForm: React.FC<props> = ({
  eventId,
  event,
  showForm1,
  showForm2,
  showForm3,
  setShowForm4,
  setShowForm1,
  setShowForm2,
  setShowForm3,
  showForm4,
}) => {
  const startDateRef = useRef<HTMLInputElement>(null);
  const [venues, setVenues] = useState<Venue[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [types, setTypes] = useState<Type[]>([]);
  const [selectPosition, setSelectPosition] = useState<LatLngExpression | null>(
    null
  );
  const [searchAddress, setSearchAddress] = useState<PlaceData>();

  const position: LatLngExpression = [23.03282845, 72.54671281964617];
  // Function to fetch venues from the backend
  const fetchVenues = async () => {
    try {
      // Make a GET request to your backend endpoint using Axios
      const response = await axios.get<Venue[]>(
        "https://easyeventsbackend-pwa.onrender.com/api/v1/venue"
      );

      console.log(response.data);

      // Set the fetched venues in the state
      setVenues(response.data);

      console.log("============venues======");
      console.log(venues);

      console.log("=========venues==============");
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
  const fetchCategories = async () => {
    try {
      // Make a GET request to fetch categories from the backend
      const response = await axios.get<Category[]>(
        "https://easyeventsbackend-pwa.onrender.com/api/v1/category"
      );

      console.log(response.data);

      // Set the fetched categories in the state
      setCategories(response.data);

      console.log("============categories======");
      console.log(categories);

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

  const fetchTypes = async () => {
    try {
      // Make a GET request to fetch types from the backend
      const response = await axios.get<Type[]>(
        "https://easyeventsbackend-pwa.onrender.com/api/v1/types"
      );

      console.log(response.data);

      // Set the fetched types in the state
      setTypes(response.data);

      console.log("============types======");
      console.log(types);

      console.log("=========types==============");
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
    const convertedEventDate = (backendDate: string) => {
      const userTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;

      // Create a Date object from the backend date string
      const utcDate = new Date(backendDate);

      // Convert the date to the user's timezone
      const userLocalDate = new Date(
        utcDate.toLocaleString("en-US", { timeZone: userTimeZone })
      );
      console.log(userLocalDate.toISOString());

      // Format the date to a string

      const formattedTime = userLocalDate.toLocaleTimeString("en-US", {
        hour: "numeric",
        minute: "numeric",
        hour12: false,
      });

      console.log(userLocalDate.getMonth());

      const newDate = `${userLocalDate.getFullYear()}-${
        userLocalDate.getMonth() > 8
          ? userLocalDate.getMonth() + 1
          : "0" + (userLocalDate.getMonth() + 1)
      }-${
        userLocalDate.getDate() > 9
          ? userLocalDate.getDate()
          : "0" + userLocalDate.getDate()
      }T${formattedTime}`;
      console.log(newDate);

      // Get the time portion of the date
      // const time = userLocalDate.toLocaleTimeString("en-US", {
      //   hour: "numeric",
      //   minute: "numeric",
      //   hour12: true,
      // });
      // https://dv8rlqlr-5173.inc1.devtunnels.ms/
      return `${newDate}`;
    };
    // Function to set the value after the page is mounted
    const setStartDateValue = () => {
      // Access the input element using the ref's current property
      const startDate = document.getElementById(
        "startDate"
      ) as HTMLInputElement;
      const endDate = document.getElementById("endDate") as HTMLInputElement;
      const startDateToRegister = document.getElementById(
        "startDateToRegister"
      ) as HTMLInputElement;
      const endDateToRegister = document.getElementById(
        "endDateToRegister"
      ) as HTMLInputElement;
      // Check if the input element exists
      if (startDate) {
        startDate.value = convertedEventDate(event.start_date);
      }
      if (endDate) {
        endDate.value = convertedEventDate(event.end_date);
      }
      if (startDateToRegister) {
        startDateToRegister.value = convertedEventDate(
          event.start_date_toRegister
        );
      }
      if (endDateToRegister) {
        endDateToRegister.value = convertedEventDate(event.end_date_toRegister);
      }
    };

    // Call the function to set the value
    setStartDateValue();
  }, [event]); // Empty dependency array ensures this effect runs only once after mounting

  // Call fetchVenues function when component mounts
  useEffect(() => {
    fetchVenues();
    fetchCategories();
    fetchTypes();
    console.log("====================================");
    console.log(event);
    console.log("====================================");
  }, []); // Empty dependency array ensures it runs only once when the component mounts
  useEffect(() => {
    console.log("====================================");
    console.log(searchAddress);
    if (searchAddress?.address.city) {
      setValueVenue("city", searchAddress?.address?.city);
    } else if (searchAddress?.address.town) {
      setValueVenue("city", searchAddress?.address?.town);
    } else if (searchAddress?.address.state_district) {
      setValueVenue("city", searchAddress?.address?.state_district);
    } else if (searchAddress?.address.village) {
      setValueVenue("city", searchAddress?.address?.village);
    } else {
      setValueVenue("city", "");
    }

    resetVenue({
      address: searchAddress?.display_name || "",

      state: searchAddress?.address.state || "",
      country: searchAddress?.address.country || "",
    });
    if (searchAddress?.display_name) {
      const nameOfAddress = searchAddress?.display_name;
      const firstCommaIndex = nameOfAddress.indexOf(",");
      const wordBeforeFirstComma = nameOfAddress
        .substring(0, firstCommaIndex)
        .trim();
      setValueVenue("name", wordBeforeFirstComma);
      console.log(wordBeforeFirstComma); // Output: Google
    }
  }, [searchAddress]);

  const [venueId, setVenueId] = useState("");

  const [showAddVenueForm, setShowAddVenueForm] = useState(false);
  const {
    register,
    handleSubmit,
    control,
    formState,
    setValue,
    getValues,
    reset,
  } = useForm({
    defaultValues: {
      title: "",
      description: "",
      start_date: new Date(),
      end_date: new Date(),
      start_date_toRegister: new Date(),
      end_date_toRegister: new Date(),
      mode: EventMode.OFFLINE, // Assuming EventMode.Default is defined in your code.
      capacity: 0,
      price: 0,
      organizer_id: 0,
      venue_id: 0,
      category_id: 0,
      type_id: 0,
    },
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    reset({
      title: event.title,
      description: event.description,

      mode: event.mode === "OFFLINE" ? EventMode.OFFLINE : EventMode.ONLINE, // Assuming EventMode.Default is defined in your code.
      capacity: event.capacity,
      price: event.price,
      organizer_id: event.organizer_id,
      venue_id: event.venue_id,
      category_id: event.category_id,
      type_id: event.type_id,
    });

    // setValue("start_date", formattedStartDate);
  }, [categories, types, event]);

  const {
    register: registerVenue,
    handleSubmit: handleSubmitVenue,
    formState: formStateVenue,
    reset: resetVenue,
    setValue: setValueVenue,
  } = useForm<FormDataVenue>({
    defaultValues: {
      name: "",
      address: "",
      city: "",
      state: "",
      country: "",
    },
    resolver: yupResolver(formDataVenueSchema) as Resolver<FormDataVenue>,
  });
  // useEffect(() => {
  //   console.log("============venues======");
  //   setValue("venue_id", parseInt(venueId));
  //   console.log(venues);
  // }, [venues]);
  const { errors } = formState;
  const { errors: errorsVenue } = formStateVenue;

  const onSubmit = async (data: FormData) => {
    console.log("reached");

    try {
      const initialDatetime = new Date(data.start_date);
      const initialDatetime1 = new Date(data.end_date);
      const initialDatetime2 = new Date(data.start_date_toRegister);
      const initialDatetime3 = new Date(data.end_date_toRegister);
      // const finalDatetime = new Date(
      //   initialDatetime.getTime() +
      //     4 * 24 * 60 * 60 * 1000 +
      //     1 * 60 * 60 * 1000 +
      //     48 * 60 * 1000
      // );
      // console.log(finalDatetime);

      // Make a POST request to your backend API endpoint
      const response = await axiosPrivate.put(
        `https://easyeventsbackend-pwa.onrender.com/api/v1/events/${event.id}`,
        {
          ...data,
          start_date: initialDatetime.toISOString(),
          end_date: initialDatetime1.toISOString(),
          start_date_toRegister: initialDatetime2.toISOString(),
          end_date_toRegister: initialDatetime3.toISOString(),
        }
      );
      toast.success("Step 1 completed successfully");
      setShowForm1(false);
      setShowForm2(true);
      setShowForm3(false);
      setShowForm4(false);

      // console.log("response", response.data.data.id);

      // // Handle the response
      // console.log("Response:", response.data);
    } catch (error) {
      // Handle any errors
      toast.error("An error occurred while adding the venue");
      console.error("Error:", error);
    }
    console.log(data);
  };
  const onSubmitVenue = async (data: FormDataVenue) => {
    try {
      console.log("====================================");
      console.log(venues);
      console.log("====================================");
      // Make a POST request to your backend API endpoint
      const response = await axios.post(
        "https://easyeventsbackend-pwa.onrender.com/api/v1/venue",
        {
          ...data,
          latitude: parseFloat(searchAddress?.lat),
          longitude: parseFloat(searchAddress?.lon),
          postcode: searchAddress?.address.postcode,
        }
      );
      toast.success("Venue added successfully");

      console.log("response", response.data.data.id);

      setShowAddVenueForm(false);
      await fetchVenues();
      console.log("fetchVenues", venues);
      setValue("venue_id", response.data.data.id);
      setVenueId(response.data.data.id.toString());
      const avshas = getValues("venue_id");
      console.log(avshas);

      // Handle the response
      console.log("Response:", response.data);
    } catch (error) {
      // Handle any errors
      toast.error("An error occurred while adding the venue");
      console.error("Error:", error);
    }
  };
  // const onSubmitVenue: SubmitHandler<FormDataVenue> = async (data) => {

  //   // Handle form submission
  //   console.log(data);
  // };

  return (
    <section className="bg-no-repeat bg-center bg-cover ">
      {/* <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0 "> */}
      <div className="w-full   shadow   md:mt-0 xl:p-0 bg-transparent">
        <div className="p-6 space-y-4 rounded-3xl md:space-y-6 sm:p-8 ">
          <h1 className="text-xl font-bold leading-tight tracking-tight  md:text-2xl text-white">
            Create an Event
          </h1>
          {showAddVenueForm && (
            <div className="border-2 border-solid border-gray-600 p-2 rounded-lg">
              <div
                className="gap-3"
                style={{
                  display: "flex",
                  flexDirection: "row",
                  width: "100%",
                  height: "40vh",
                }}
              >
                <div style={{ width: "70%", height: "100%" }}>
                  <Maps selectPosition={selectPosition || position} />
                </div>
                <div
                  className="flex flex-col items-start mt-4"
                  style={{ width: "30%" }}
                >
                  <SearchBox
                    setSelectPosition={setSelectPosition}
                    setSearchAddress={setSearchAddress}
                  />
                </div>
              </div>
              <form
                className="space-y-4 md:space-y-6"
                noValidate
                onSubmit={handleSubmitVenue(onSubmitVenue)}
              >
                {" "}
                <div>
                  <div>
                    <label className="block mb-2 text-sm font-medium text-white">
                      Venue name
                    </label>
                    <input
                      type="text"
                      {...registerVenue("name")}
                      className="border sm:text-sm rounded-lg block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
                    />
                    <div>
                      {errorsVenue.name ? (
                        <p className="text-red-500 text-xs italic">
                          {errorsVenue.name.message}
                        </p>
                      ) : (
                        <div style={{ height: "1rem" }} />
                      )}
                    </div>
                  </div>
                  <div>
                    <label className="block mb-2 text-sm font-medium text-white">
                      Venue address
                    </label>
                    <input
                      type="text"
                      {...registerVenue("address")}
                      className="border sm:text-sm rounded-lg block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
                    />
                    <div>
                      {errorsVenue.address ? (
                        <p className="text-red-500 text-xs italic">
                          {errorsVenue.address.message}
                        </p>
                      ) : (
                        <div style={{ height: "1rem" }} />
                      )}
                    </div>
                  </div>
                  <div>
                    <label className="block mb-2 text-sm font-medium text-white">
                      Venue city
                    </label>
                    <input
                      type="text"
                      {...registerVenue("city")}
                      className="border sm:text-sm rounded-lg block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
                    />
                    <div>
                      {errorsVenue.city ? (
                        <p className="text-red-500 text-xs italic">
                          {errorsVenue.city.message}
                        </p>
                      ) : (
                        <div style={{ height: "1rem" }} />
                      )}
                    </div>
                  </div>
                  <div>
                    <label className="block mb-2 text-sm font-medium text-white">
                      Venue state
                    </label>
                    <input
                      type="text"
                      {...registerVenue("state")}
                      className="border sm:text-sm rounded-lg block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
                    />
                    <div>
                      {errorsVenue.state ? (
                        <p className="text-red-500 text-xs italic">
                          {errorsVenue.state.message}
                        </p>
                      ) : (
                        <div style={{ height: "1rem" }} />
                      )}
                    </div>
                  </div>
                  <div>
                    <label className="block mb-2 text-sm font-medium text-white">
                      Venue country
                    </label>
                    <input
                      type="text"
                      {...registerVenue("country")}
                      className="border sm:text-sm rounded-lg block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
                    />
                    <div>
                      {errorsVenue.country ? (
                        <p className="text-red-500 text-xs italic">
                          {errorsVenue.country.message}
                        </p>
                      ) : (
                        <div style={{ height: "1rem" }} />
                      )}
                    </div>
                  </div>
                </div>
                <div className="w-full flex justify-end ">
                  <Button className="m-4" type="submit">
                    Enter Venue
                  </Button>
                </div>
              </form>
              {/* <div>
                        <label className="block mb-2 text-sm font-medium text-white">
                          Venue ID
                        </label>
                        <input
                          type="text"
                          {...register("venue_id")}
                          className="border sm:text-sm rounded-lg block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
                        />
                        <div>
                          {errors.venue_id ? (
                            <p className="text-red-500 text-xs italic">
                              {errors.venue_id.message}
                            </p>
                          ) : (
                            <div style={{ height: "1rem" }} />
                          )}
                        </div>
                      </div> */}
            </div>
          )}

          <div>
            <div>
              <form
                className="space-y-4 md:space-y-6"
                noValidate
                onSubmit={handleSubmit(onSubmit)}
              >
                {!showAddVenueForm && (
                  <div>
                    <label className="block mb-2 text-sm font-medium text-white">
                      Event Venue
                    </label>
                    <select
                      id="mode"
                      // value={category}
                      // onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setCategory(e.target.value)}
                      className=" border xt-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500focus:border-blue-500"
                      {...register("venue_id", { valueAsNumber: true })}
                      onChange={(e) =>
                        setValue("venue_id", parseInt(e.target.value))
                      } // Update the value when the dropdown selection changes
                    >
                      <option value="">Select venue</option>

                      {venues.map((venue) => (
                        <option key={venue.id} value={venue.id}>
                          <div>
                            {venue.name},{venue.city},{venue.state},
                            {venue.country}
                          </div>
                        </option>
                      ))}
                      {/* 
                <option value="ONLINE">Online</option>
                <option value="OFFLINE">Offline</option> */}
                    </select>
                    <div>
                      {errors.venue_id ? (
                        <p className="text-red-500 text-xs italic">
                          {errors.venue_id.message}
                        </p>
                      ) : (
                        <div style={{ height: "1rem" }} />
                      )}
                    </div>{" "}
                  </div>
                )}
                <div className="w-full flex justify-end ">
                  <Button
                    onClick={() => {
                      setShowAddVenueForm(!showAddVenueForm);
                    }}
                    className="m-4"
                    type="button"
                  >
                    <span className="text-2xl mr-1">
                      <MdAddBox />
                    </span>
                    {showAddVenueForm ? (
                      <span> Close the form</span>
                    ) : (
                      <span> Add new venue</span>
                    )}{" "}
                  </Button>
                </div>
                <div className="flex flex-col sm:flex-row w-full">
                  <div className="sm:w-1/2 w-full m-0 sm:m-4">
                    <div>
                      <label className="block mb-2 text-sm font-medium text-white">
                        Event Title
                      </label>
                      <input
                        type="text"
                        {...register("title")}
                        className="border sm:text-sm rounded-lg block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
                      />
                      <div>
                        {errors.title ? (
                          <p className="text-red-500 text-xs italic">
                            {errors.title.message}
                          </p>
                        ) : (
                          <div style={{ height: "1rem" }} />
                        )}
                      </div>{" "}
                    </div>

                    <div>
                      <label className="block mb-2 text-sm font-medium text-white">
                        Event Description
                      </label>
                      <textarea
                        rows={4}
                        {...register("description")}
                        className="border sm:text-sm rounded-lg block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
                      />
                      <div>
                        {errors.description ? (
                          <p className="text-red-500 text-xs italic">
                            {errors.description.message}
                          </p>
                        ) : (
                          <div style={{ height: "1rem" }} />
                        )}
                      </div>
                    </div>

                    <div>
                      <label className="block mb-2 text-sm font-medium text-white">
                        Event Date
                      </label>
                      <div
                        date-rangepicker
                        className="flex sm:flex-row flex-col items-center"
                      >
                        <div className="relative">
                          <input
                            id="startDate"
                            {...register("start_date")}
                            type="datetime-local"
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            placeholder="Select date start"
                          />
                          <div>
                            {errors.start_date ? (
                              <p className="text-red-500 text-xs italic">
                                {errors.start_date.message}
                              </p>
                            ) : (
                              <div style={{ height: "1rem" }} />
                            )}
                          </div>
                        </div>
                        <span className="mx-4 text-gray-500">to</span>
                        <div className="relative">
                          <input
                            id="endDate"
                            {...register("end_date")}
                            type="datetime-local"
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            placeholder="Select date end"
                          />
                          <div>
                            {errors.end_date ? (
                              <p className="text-red-500 text-xs italic">
                                {errors.end_date.message}
                              </p>
                            ) : (
                              <div style={{ height: "1rem" }} />
                            )}
                          </div>
                        </div>
                      </div>{" "}
                    </div>
                    <div>
                      <label className="block mb-2 text-sm font-medium text-white">
                        Event Registration date
                      </label>
                      <div
                        date-rangepicker
                        className="flex sm:flex-row flex-col items-center"
                      >
                        <div className="relative">
                          <input
                            id="startDateToRegister"
                            {...register("start_date_toRegister")}
                            type="datetime-local"
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            placeholder="Select date start"
                          />
                          <div>
                            {errors.start_date_toRegister ? (
                              <p className="text-red-500 text-xs italic">
                                {errors.start_date_toRegister.message}
                              </p>
                            ) : (
                              <div style={{ height: "1rem" }} />
                            )}
                          </div>
                        </div>
                        <span className="mx-4 text-gray-500">to</span>
                        <div className="relative">
                          <div>
                            {" "}
                            <input
                              id="endDateToRegister"
                              {...register("end_date_toRegister")}
                              type="datetime-local"
                              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                              placeholder="Select date end"
                            />
                          </div>
                          <div>
                            {errors.end_date_toRegister ? (
                              <p className="text-red-500 text-xs italic">
                                {errors.end_date_toRegister.message}
                              </p>
                            ) : (
                              <div style={{ height: "1rem" }} />
                            )}
                          </div>
                        </div>
                      </div>{" "}
                    </div>
                  </div>
                  <div className="sm:w-1/2 w-full m-0 sm:m-4">
                    <div>
                      <label className="block mb-2 text-sm font-medium text-white">
                        Event Capacity
                      </label>
                      <input
                        type="text"
                        {...register("capacity", { valueAsNumber: true })}
                        className="border sm:text-sm rounded-lg block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
                      />
                      <div>
                        {errors.capacity ? (
                          <p className="text-red-500 text-xs italic">
                            {errors.capacity.message}
                          </p>
                        ) : (
                          <div style={{ height: "1rem" }} />
                        )}
                      </div>
                    </div>

                    <div>
                      <label className="block mb-2 text-sm font-medium text-white">
                        Ticket price
                      </label>
                      <input
                        type="number"
                        {...register("price", { valueAsNumber: true })}
                        className="border sm:text-sm rounded-lg block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
                      />
                      <div>
                        {errors.price ? (
                          <p className="text-red-500 text-xs italic">
                            {errors.price.message}
                          </p>
                        ) : (
                          <div style={{ height: "1rem" }} />
                        )}
                      </div>{" "}
                    </div>

                    <div>
                      <label className="block mb-2 text-sm font-medium text-white">
                        Event Mode
                      </label>
                      <select
                        id="mode"
                        // value={category}
                        // onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setCategory(e.target.value)}
                        className=" border xt-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500focus:border-blue-500"
                        {...register("mode")}
                      >
                        <option value="">Select mode</option>

                        <option value="ONLINE">Online</option>
                        <option value="OFFLINE">Offline</option>
                      </select>
                      <div>
                        {errors.mode ? (
                          <p className="text-red-500 text-xs italic">
                            {errors.mode.message}
                          </p>
                        ) : (
                          <div style={{ height: "1rem" }} />
                        )}
                      </div>{" "}
                    </div>
                    <div>
                      <label className="block mb-2 text-sm font-medium text-white">
                        Event Category
                      </label>
                      <select
                        id="category"
                        // value={category}
                        // onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setCategory(e.target.value)}
                        className=" border xt-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500focus:border-blue-500"
                        {...register("category_id", { valueAsNumber: true })}
                      >
                        <option value="">Select Category</option>

                        {categories.map((category) => (
                          <option key={category.id} value={category.id}>
                            <div>{category.name},</div>
                          </option>
                        ))}
                      </select>
                      <div>
                        {errors.category_id ? (
                          <p className="text-red-500 text-xs italic">
                            {errors.category_id.message}
                          </p>
                        ) : (
                          <div style={{ height: "1rem" }} />
                        )}
                      </div>
                    </div>
                    <div>
                      <label className="block mb-2 text-sm font-medium text-white">
                        Event type
                      </label>
                      <select
                        id="type"
                        // value={category}
                        // onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setCategory(e.target.value)}
                        className=" border xt-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500focus:border-blue-500"
                        {...register("type_id", { valueAsNumber: true })}
                      >
                        <option value="">Select Type</option>

                        {types.map((type) => (
                          <option key={type.id} value={type.id}>
                            <div>{type.name},</div>
                          </option>
                        ))}
                      </select>
                      <div>
                        {errors.type_id ? (
                          <p className="text-red-500 text-xs italic">
                            {errors.type_id.message}
                          </p>
                        ) : (
                          <div style={{ height: "1rem" }} />
                        )}
                      </div>{" "}
                    </div>
                  </div>
                </div>
                <div className="w-full flex justify-end ">
                  <Button className="m-4" type="submit">
                    Submit
                  </Button>
                </div>
              </form>
              <DevTool control={control} /> {/* set up the dev tool */}
            </div>
          </div>
        </div>
      </div>
      {/* </div> */}
    </section>
  );
};

export default EditEventForm;

import { yupResolver } from "@hookform/resolvers/yup";
import { Button } from "flowbite-react";
import React from "react";
import { Resolver, useForm } from "react-hook-form";
import * as yup from "yup";

enum EventMode {
  OFFLINE = "OFFLINE",
  ONLINE = "ONLINE",
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
    .required("Registration Start Date is required"),
  end_date_toRegister: yup
    .date()
    .required("End Date to Register is required")
    .test(
      "end_date_toRegister",
      "Registration end date must be before start date",
      function (value) {
        const { start_date, start_date_toRegister } = this.parent;
        // Custom validation logic
        return (
          new Date(value) <= new Date(start_date) &&
          new Date(value) <= new Date(start_date_toRegister)
        );
      }
    ),
  mode: yup
    .string()
    .oneOf(Object.values(EventMode))
    .required("Event Mode is required"),
  capacity: yup.number().integer().required("Event Capacity is required"),
  price: yup
    .number()
    .required("Ticket Price is required")
    .transform((originalValue) => parseFloat(originalValue).toFixed(2)),
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
  mode: EventMode;
  capacity: number;
  price: number;
  organizer_id: number;
  venue_id: number;
  category_id: number;
  type_id: number;
};

const AddEventForm4: React.FC = () => {
  const { register, handleSubmit, formState } = useForm<FormData>({
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
    resolver: yupResolver(schema) as Resolver<FormData>,
  });

  const { errors } = formState;

  const onSubmit = (data: FormData) => {
    // Handle form submission
    console.log(data);
  };

  return (
    <section className="bg-no-repeat bg-center bg-cover ">
      {/* <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0 "> */}
      <div className="w-full   shadow   md:mt-0 xl:p-0 bg-transparent">
        <div className="p-6 space-y-4 rounded-3xl md:space-y-6 sm:p-8 ">
          <h1 className="text-xl font-bold leading-tight tracking-tight  md:text-2xl text-white">
            Create an Event 4
          </h1>
          <div>
            <div>
              <form
                className="space-y-4 md:space-y-6"
                noValidate
                onSubmit={handleSubmit(onSubmit)}
              >
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
                      {errors.title && <span>{errors.title.message}</span>}
                    </div>

                    <div>
                      <label className="block mb-2 text-sm font-medium text-white">
                        Event Description
                      </label>
                      <input
                        type="text"
                        {...register("description")}
                        className="border sm:text-sm rounded-lg block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
                      />
                      {errors.description && (
                        <span>{errors.description.message}</span>
                      )}
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
                          <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                            <svg
                              className="w-4 h-4 text-gray-500 dark:text-gray-400"
                              aria-hidden="true"
                              xmlns="http://www.w3.org/2000/svg"
                              fill="currentColor"
                              viewBox="0 0 20 20"
                            >
                              <path d="M20 4a2 2 0 0 0-2-2h-2V1a1 1 0 0 0-2 0v1h-3V1a1 1 0 0 0-2 0v1H6V1a1 1 0 0 0-2 0v1H2a2 2 0 0 0-2 2v2h20V4ZM0 18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8H0v10Zm5-8h10a1 1 0 0 1 0 2H5a1 1 0 0 1 0-2Z" />
                            </svg>
                          </div>
                          <input
                            {...register("start_date")}
                            type="datetime-local"
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            placeholder="Select date start"
                          />
                          {errors.start_date && (
                            <span>{errors.start_date.message}</span>
                          )}
                        </div>
                        <span className="mx-4 text-gray-500">to</span>
                        <div className="relative">
                          <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                            <svg
                              className="w-4 h-4 text-gray-500 dark:text-gray-400"
                              aria-hidden="true"
                              xmlns="http://www.w3.org/2000/svg"
                              fill="currentColor"
                              viewBox="0 0 20 20"
                            >
                              <path d="M20 4a2 2 0 0 0-2-2h-2V1a1 1 0 0 0-2 0v1h-3V1a1 1 0 0 0-2 0v1H6V1a1 1 0 0 0-2 0v1H2a2 2 0 0 0-2 2v2h20V4ZM0 18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8H0v10Zm5-8h10a1 1 0 0 1 0 2H5a1 1 0 0 1 0-2Z" />
                            </svg>
                          </div>
                          <input
                            {...register("end_date")}
                            type="datetime-local  "
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            placeholder="Select date end"
                          />
                          {errors.end_date && (
                            <span>{errors.end_date.message}</span>
                          )}
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
                          <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                            <svg
                              className="w-4 h-4 text-gray-500 dark:text-gray-400"
                              aria-hidden="true"
                              xmlns="http://www.w3.org/2000/svg"
                              fill="currentColor"
                              viewBox="0 0 20 20"
                            >
                              <path d="M20 4a2 2 0 0 0-2-2h-2V1a1 1 0 0 0-2 0v1h-3V1a1 1 0 0 0-2 0v1H6V1a1 1 0 0 0-2 0v1H2a2 2 0 0 0-2 2v2h20V4ZM0 18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8H0v10Zm5-8h10a1 1 0 0 1 0 2H5a1 1 0 0 1 0-2Z" />
                            </svg>
                          </div>
                          <input
                            {...register("start_date_toRegister")}
                            type="datetime-local"
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            placeholder="Select date start"
                          />
                          {errors.start_date_toRegister && (
                            <span>{errors.start_date_toRegister.message}</span>
                          )}
                        </div>
                        <span className="mx-4 text-gray-500">to</span>
                        <div className="relative">
                          <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                            <svg
                              className="w-4 h-4 text-gray-500 dark:text-gray-400"
                              aria-hidden="true"
                              xmlns="http://www.w3.org/2000/svg"
                              fill="currentColor"
                              viewBox="0 0 20 20"
                            >
                              <path d="M20 4a2 2 0 0 0-2-2h-2V1a1 1 0 0 0-2 0v1h-3V1a1 1 0 0 0-2 0v1H6V1a1 1 0 0 0-2 0v1H2a2 2 0 0 0-2 2v2h20V4ZM0 18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8H0v10Zm5-8h10a1 1 0 0 1 0 2H5a1 1 0 0 1 0-2Z" />
                            </svg>
                          </div>
                          <input
                            {...register("end_date_toRegister")}
                            type="datetime-local  "
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            placeholder="Select date end"
                          />
                          {errors.end_date_toRegister && (
                            <span>{errors.end_date_toRegister.message}</span>
                          )}
                        </div>
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
                        {...register("mode", {
                          required: {
                            value: true,
                            message: "Atleast One category is required!!",
                          },
                        })}
                      >
                        <option value="">Select mode</option>

                        <option value="Online">Online</option>
                        <option value="Offline">Offline</option>
                      </select>
                      {errors.mode && <span>{errors.mode.message}</span>}
                    </div>
                  </div>
                  <div className="sm:w-1/2 w-full m-0 sm:m-4">
                    <div>
                      <label className="block mb-2 text-sm font-medium text-white">
                        Event Capacity
                      </label>
                      <input
                        type="text"
                        {...register("capacity")}
                        className="border sm:text-sm rounded-lg block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
                      />
                      {errors.capacity && (
                        <span>{errors.capacity.message}</span>
                      )}
                    </div>

                    <div>
                      <label className="block mb-2 text-sm font-medium text-white">
                        Ticket price
                      </label>
                      <input
                        type="text"
                        {...register("price")}
                        className="border sm:text-sm rounded-lg block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
                      />
                      {errors.price && <span>{errors.price.message}</span>}
                    </div>

                    <div>
                      <label className="block mb-2 text-sm font-medium text-white">
                        Venue ID
                      </label>
                      <input
                        type="text"
                        {...register("venue_id")}
                        className="border sm:text-sm rounded-lg block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
                      />
                      {errors.venue_id && (
                        <span>{errors.venue_id.message}</span>
                      )}
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
                        {...register("category_id", {
                          required: {
                            value: true,
                            message: "Atleast One category is required!!",
                          },
                        })}
                      >
                        <option value="">Select Category</option>

                        <option value="Online">Business</option>
                        <option value="Offline">Technical</option>
                      </select>
                      {errors.category_id && (
                        <span>{errors.category_id.message}</span>
                      )}
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
                        {...register("type_id", {
                          required: {
                            value: true,
                            message: "Atleast One category is required!!",
                          },
                        })}
                      >
                        <option value="">Select Type</option>

                        <option value="Conference">Conference</option>
                        <option value="Workshop">Workshop</option>
                      </select>
                      {errors.type_id && <span>{errors.type_id.message}</span>}
                    </div>
                  </div>
                </div>
                <div className="w-full flex justify-end ">
                  <Button className="m-4" type="submit">
                    Submit
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      {/* </div> */}
    </section>
  );
};

export default AddEventForm4;

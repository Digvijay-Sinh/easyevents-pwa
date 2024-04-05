import { yupResolver } from "@hookform/resolvers/yup";
import React from "react";
import { Resolver, useForm } from "react-hook-form";
import * as yup from "yup";
import formbg from "../../assets/events/formbgfinal.jpg";

const schema = yup.object().shape({
  eventTitle: yup.string().required("Event Title is required"),
  eventDescription: yup.string().required("Event Description is required"),
  eventDate: yup.date().required("Event Date is required"),
  eventTime: yup.string().required("Event Time is required"),
  eventLocation: yup.string().required("Event Location is required"),
  eventCategory: yup.string().required("Event Category is required"),
  organizerName: yup.string().required("Organizer Name is required"),
  organizerContactEmail: yup
    .string()
    .email("Invalid email")
    .required("Organizer Contact Email is required"),
  organizerContactPhone: yup
    .string()
    .required("Organizer Contact Phone is required"),
  ticketPrice: yup.number().required("Ticket Price is required"),
  ticketQuantity: yup.number().required("Ticket Quantity is required"),
  eventImage: yup.string().required("Event Image is required"),
  eventTags: yup.string().required("Event Tags are required"),
  eventCapacity: yup.number().required("Event Capacity is required"),
  eventAgeRestrictions: yup
    .string()
    .required("Event Age Restrictions are required"),
  registrationDeadline: yup
    .date()
    .required("Registration Deadline is required"),
  cancellationPolicy: yup.string().required("Cancellation Policy is required"),
  additionalNotes: yup.string().required("Additional Notes are required"),
  socialMediaSharing: yup.string().required("Social Media Sharing is required"),
});

type FormData = {
  eventTitle: string;
  eventDescription: string;
  eventDate: Date;
  eventTime: string;
  eventLocation: string;
  eventCategory: string;
  organizerName: string;
  organizerContactEmail: string;
  organizerContactPhone: string;
  ticketPrice: number;
  ticketQuantity: number;
  eventImage: string;
  eventTags: string;
  eventCapacity: number;
  eventAgeRestrictions: string;
  registrationDeadline: Date;
  cancellationPolicy: string;
  additionalNotes: string;
  socialMediaSharing: string;
};

const AddEventForm2: React.FC = () => {
  const { register, handleSubmit, formState } = useForm<FormData>({
    defaultValues: {
      eventTitle: "",
      eventDescription: "",
      eventDate: new Date(),
      eventTime: "",
      eventLocation: "",
      eventCategory: "",
      organizerName: "",
      organizerContactEmail: "",
      organizerContactPhone: "",
      ticketPrice: 0,
      ticketQuantity: 0,
      eventImage: "",
      eventTags: "",
      eventCapacity: 0,
      eventAgeRestrictions: "",
      registrationDeadline: new Date(),
      cancellationPolicy: "",
      additionalNotes: "",
      socialMediaSharing: "",
    },
    resolver: yupResolver(schema) as Resolver<FormData>,
  });

  const { errors } = formState;

  const onSubmit = (data: FormData) => {
    // Handle form submission
    console.log(data);
  };

  return (
    <section
      style={{ backgroundImage: `url(${formbg})` }}
      className="bg-no-repeat bg-center bg-cover "
    >
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0 ">
        <div className="w-full   shadow   md:mt-0 sm:max-w-md xl:p-0 bg-transparent">
          <div className="p-6 space-y-4 rounded-3xl md:space-y-6 sm:p-8 backdrop-blur-md bg-black/50 ">
            <h1 className="text-xl font-bold leading-tight tracking-tight  md:text-2xl text-white">
              Create an account
            </h1>
          </div>
          <div>
            <form
              className="space-y-4 md:space-y-6"
              noValidate
              onSubmit={handleSubmit(onSubmit)}
            >
              <div>
                <label className="block mb-2 text-sm font-medium text-white">
                  Event Image
                </label>
                <input
                  type="text"
                  {...register("eventImage")}
                  className="border sm:text-sm rounded-lg block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
                />
                {errors.eventImage && <span>{errors.eventImage.message}</span>}
              </div>

              <div>
                <label className="block mb-2 text-sm font-medium text-white">
                  Event Tags
                </label>
                <input
                  type="text"
                  {...register("eventTags")}
                  className="border sm:text-sm rounded-lg block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
                />
                {errors.eventTags && <span>{errors.eventTags.message}</span>}
              </div>

              <div>
                <label className="block mb-2 text-sm font-medium text-white">
                  Event Capacity
                </label>
                <input
                  type="number"
                  {...register("eventCapacity")}
                  className="border sm:text-sm rounded-lg block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
                />
                {errors.eventCapacity && (
                  <span>{errors.eventCapacity.message}</span>
                )}
              </div>

              <div>
                <label className="block mb-2 text-sm font-medium text-white">
                  Event Age Restrictions
                </label>
                <input
                  type="text"
                  {...register("eventAgeRestrictions")}
                  className="border sm:text-sm rounded-lg block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
                />
                {errors.eventAgeRestrictions && (
                  <span>{errors.eventAgeRestrictions.message}</span>
                )}
              </div>

              <div>
                <label className="block mb-2 text-sm font-medium text-white">
                  Registration Deadline
                </label>
                <input
                  type="date"
                  {...register("registrationDeadline")}
                  className="border sm:text-sm rounded-lg block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
                />
                {errors.registrationDeadline && (
                  <span>{errors.registrationDeadline.message}</span>
                )}
              </div>

              <div>
                <label className="block mb-2 text-sm font-medium text-white">
                  Cancellation Policy
                </label>
                <input
                  type="text"
                  {...register("cancellationPolicy")}
                  className="border sm:text-sm rounded-lg block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
                />
                {errors.cancellationPolicy && (
                  <span>{errors.cancellationPolicy.message}</span>
                )}
              </div>

              <div>
                <label className="block mb-2 text-sm font-medium text-white">
                  Additional Notes
                </label>
                <input
                  type="text"
                  {...register("additionalNotes")}
                  className="border sm:text-sm rounded-lg block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
                />
                {errors.additionalNotes && (
                  <span>{errors.additionalNotes.message}</span>
                )}
              </div>

              <div>
                <label className="block mb-2 text-sm font-medium text-white">
                  Social Media Sharing
                </label>
                <input
                  type="text"
                  {...register("socialMediaSharing")}
                  className="border sm:text-sm rounded-lg block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
                />
                {errors.socialMediaSharing && (
                  <span>{errors.socialMediaSharing.message}</span>
                )}
              </div>

              <button type="submit">Submit</button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AddEventForm2;

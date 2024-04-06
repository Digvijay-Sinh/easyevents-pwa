import { useForm, SubmitHandler, FieldValues, Resolver } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import axios from "axios";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import { useState } from "react";

type FormData = {
  name: string;
  email: string;
  terms: boolean;
};

type Props = {
  setEmail: React.Dispatch<React.SetStateAction<string>>;
  setOtpTimerActive: React.Dispatch<React.SetStateAction<boolean>>;
  setShowOtpScreen: React.Dispatch<React.SetStateAction<boolean>>;
};

const schema = yup.object().shape({
  name: yup.string().required("Name is required"),
  email: yup
    .string()
    .email("Email should be in correct format")
    .required("Email is required"),
  terms: yup.bool().oneOf([true], "You must accept the terms and conditions"),
});

const EmailForm: React.FC<Props> = ({
  setEmail,
  setOtpTimerActive,
  setShowOtpScreen,
}) => {
  const [name, setName] = useState("");
  const emailForm = useForm<FormData>({
    defaultValues: {
      name: "",
      email: "",
      terms: false,
    },
    resolver: yupResolver(schema) as Resolver<FormData>,
  });
  const { register, handleSubmit, formState } = emailForm;
  const { errors } = formState;

  const submithandler: SubmitHandler<FieldValues> = async (data) => {
    console.log("====================================");
    console.log(data);
    console.log("====================================");
    const { email, name } = data;
    const loading = toast.loading(`Sending OTP to ${email}`);

    setEmail(email);
    try {
      const res = await axios.post(
        `https://easyeventsbackend-pwa.onrender.com/api/v1/auth/send-otp`,
        { email, name }
      );
      if (res && res.data) {
        // router.push("/otp")
        setShowOtpScreen((prev) => !prev);
        setOtpTimerActive((prev) => !prev);
        toast.dismiss(loading);

        toast.success("OTP sent succesfully");

        console.log(res);
      } else {
        if (res && res.status === 400) {
          toast.dismiss(loading);
          toast.error("Invalid email");
          toast("Internal server error");
          console.log(res);
        } else {
          toast.dismiss(loading);

          console.error("Some error occured");
        }
        toast.dismiss(loading);
        console.error("Some error occured");
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        // Handle Axios errors
        if (error.response && error.response.data) {
          // Handle specific error messages from backend
          const errorMessage = error.response.data.message;
          toast.dismiss(loading);
          toast.error(errorMessage);
        } else {
          // Other errors
          toast.dismiss(loading);
          toast.error("An error occurred");
        }
      } else {
        // Handle non-Axios errors
        toast.dismiss(loading);
        console.error("An error occurred:", error);
      }
    }
  };
  return (
    <div>
      <form
        noValidate
        className="space-y-4 md:space-y-6"
        onSubmit={handleSubmit(submithandler)}
      >
        <div>
          <label
            htmlFor="name"
            className="block mb-2 text-sm font-medium text-white"
          >
            Your Name
          </label>
          <input
            {...register("name")}
            type="text"
            id="name"
            className=" border   sm:text-sm rounded-lg  block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
            placeholder="Enter your name"
          />
          <div className="mt-1">
            {errors.email ? (
              <p className="text-red-500 text-xs italic">
                {errors.email?.message}{" "}
              </p>
            ) : (
              <div style={{ height: "1rem" }} />
            )}
          </div>
          <label
            htmlFor="email"
            className="block mb-2 text-sm font-medium text-white"
          >
            Your email
          </label>
          <input
            {...register("email")}
            type="email"
            id="email"
            className=" border   sm:text-sm rounded-lg  block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
            placeholder="abc@abc.com"
          />
          <div className="mt-1">
            {errors.email ? (
              <p className="text-red-500 text-xs italic">
                {errors.email?.message}{" "}
              </p>
            ) : (
              <div style={{ height: "1rem" }} />
            )}
          </div>
        </div>

        <div className="flex items-start">
          <div className="flex items-center h-5">
            <input
              id="terms"
              aria-describedby="terms"
              type="checkbox"
              className="w-4 h-4 border  rounded focus:ring-3  bg-gray-700 border-gray-600 focus:ring-primary-600 ring-offset-gray-800"
              {...register("terms")}
            />
          </div>
          <div className="ml-3 text-sm">
            <label htmlFor="terms" className="font-light text-gray-300">
              I accept the{" "}
              <Link
                className="font-medium  hover:underline text-primary-500"
                to="/termsConditions"
              >
                Terms and Conditions
              </Link>
            </label>
            <div>
              {errors.terms ? (
                <p className="text-red-500 text-xs italic">
                  {errors.terms?.message}{" "}
                </p>
              ) : (
                <div style={{ height: "1rem" }} />
              )}
            </div>
          </div>
        </div>
        <button
          type="submit"
          className="w-full text-white bg-blue-500  focus:ring-4 focus:outline-none  font-medium rounded-lg text-sm px-5 py-2.5 text-center bg-primary-600 hover:bg-green-500 focus:ring-primary-800"
        >
          Verify your email
        </button>
        <p className="text-sm font-light text-gray-400">
          Already have an account?{" "}
          <Link
            to="/login"
            className="font-medium   hover:underline text-blue-500"
          >
            Login here
          </Link>
        </p>
      </form>
    </div>
  );
};

export default EmailForm;

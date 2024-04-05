import { useForm, SubmitHandler, FieldValues, Resolver } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

type FormData = {
  otp: string;
};

type Props = {
  email: string;
  setShowOtpScreen: React.Dispatch<React.SetStateAction<boolean>>;
  setShowPasswordScreen: React.Dispatch<React.SetStateAction<boolean>>;
};

const schema = yup.object().shape({
  otp: yup
    .string()
    .matches(/^\d{6}$/, "Otp should be of 6 digits") // Matches exactly 6 digits
    .required("OTP is required"),
});

const OtpForm: React.FC<Props> = ({
  email,
  setShowPasswordScreen,
  setShowOtpScreen,
}) => {
  const [minute, setMinute] = useState(1);
  const [second, setSecond] = useState(59);

  useEffect(() => {
    const interval = setInterval(() => {
      if (second > 0) {
        setSecond(second - 1);
      }
      if (second === 0) {
        if (minute === 0) {
          clearInterval(interval);
        } else {
          setSecond(59);
          setMinute(minute - 1);
        }
      }
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, [second]);

  const otpForm = useForm<FormData>({
    defaultValues: {
      otp: "",
    },
    resolver: yupResolver(schema) as Resolver<FormData>,
  });
  const { register, handleSubmit, formState } = otpForm;
  const { errors } = formState;

  const verifyOtp: SubmitHandler<FieldValues> = async (data) => {
    const { otp } = data;

    try {
      const res = await axios.post(
        `https://easyeventsbackend-pwa.onrender.com/api/v1/auth/verify-otp`,
        { email, otp }
      );
      if (res && res.data) {
        setShowOtpScreen((prev) => !prev);
        setShowPasswordScreen((prev) => !prev);
        // router.push("/otp")
        toast.success("OTP verified succesfully");

        console.log(res);
      } else {
        console.error("Some error occured");
      }
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

  const resendOtp = async () => {
    try {
      const res = await axios.post(
        `https://easyeventsbackend-pwa.onrender.com/api/v1/auth/resend-otp`,
        { email }
      );
      if (res && res.data) {
        setSecond(59);
        setMinute(1);
        toast.success("OTP resent succesfully");

        // router.push("/otp")
        // setShowOtpScreen((prev) => !prev);
        console.log(res);
      } else {
        console.error("Some error occured");
      }
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

  return (
    <div>
      <form
        noValidate
        className="space-y-4 md:space-y-6"
        onSubmit={handleSubmit(verifyOtp)}
      >
        <div>
          <label
            htmlFor="otp"
            className="block mb-2 text-sm font-medium text-white"
          >
            Your OTP
          </label>
          <input
            type="text"
            {...register("otp")}
            id="otp"
            className=" border   sm:text-sm rounded-lg  block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
            placeholder="Enter OTP"
            required
          />
          <div>
            {errors.otp ? (
              <p className="text-red-500 text-xs italic">
                {errors.otp.message}
              </p>
            ) : (
              <div style={{ height: "1rem" }} />
            )}
          </div>
        </div>

        <button
          type="submit"
          className="w-full text-white bg-blue-500  focus:ring-4 focus:outline-none  font-medium rounded-lg text-sm px-5 py-2.5 text-center bg-primary-600 hover:bg-green-500 focus:ring-primary-800"
        >
          Verify OTP
        </button>

        <p className="text-sm font-light text-gray-400">
          Time remaining:
          <div>
            {minute < 10 ? `0${minute}` : minute}:
            {second < 10 ? `0${second}` : second}
          </div>{" "}
          <button
            type="button"
            disabled={second > 0 || minute > 0}
            onClick={() => {
              resendOtp();
            }}
            className={`font-medium    hover:underline text-primary-500 ${
              second > 0 || minute > 0
                ? "cursor-not-allowed opacity-50"
                : "cursor-pointer"
            } `}
          >
            Resend OTP
          </button>
        </p>
      </form>
    </div>
  );
};

export default OtpForm;

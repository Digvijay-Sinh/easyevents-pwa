import { useForm, SubmitHandler, FieldValues, Resolver } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import axios from "axios";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";

type FormData = {
  email: string;
};

type Props = {
  setEmail: React.Dispatch<React.SetStateAction<string>>;
  setOtpTimerActive: React.Dispatch<React.SetStateAction<boolean>>;
  setShowOtpScreen: React.Dispatch<React.SetStateAction<boolean>>;
};

const schema = yup.object().shape({
  email: yup
    .string()
    .email("Email should be in correct format")
    .required("Email is required"),
});

const EmailForm: React.FC<Props> = ({
  setEmail,
  setOtpTimerActive,
  setShowOtpScreen,
}) => {
  const emailForm = useForm<FormData>({
    defaultValues: {
      email: "",
    },
    resolver: yupResolver(schema) as Resolver<FormData>,
  });
  const { register, handleSubmit, formState } = emailForm;
  const { errors } = formState;

  const submithandler: SubmitHandler<FieldValues> = async (data) => {
    console.log("====================================");
    console.log(data);
    console.log("====================================");
    const { email } = data;
    const loading = toast.loading(`Sending OTP to ${email}`);

    setEmail(email);
    try {
      const res = await axios.post(
        `http://localhost:5000/api/v1/auth/forgot-password`,
        { email }
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
          toast("Internal server error");
          console.log(res);
        } else {
          console.error("Some error occured");
        }
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

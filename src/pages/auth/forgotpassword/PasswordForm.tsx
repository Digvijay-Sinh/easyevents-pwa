import { useForm, SubmitHandler, FieldValues, Resolver } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";

type FormData = {
  password: string;
  verifyPassword: string;
};

type Props = {
  email: string;
  setShowPasswordScreen: React.Dispatch<React.SetStateAction<boolean>>;
};

const schema = yup.object().shape({
  password: yup
    .string()
    .required("Password is required")
    .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
    .matches(/[a-z]/, "Password must contain at least one lowercase letter")
    .matches(/[0-9]/, "Password must contain at least one number")
    .matches(
      /[!@#$%^&*(),.?":{}|<>]/,
      "Password must contain at least one special character"
    )
    .min(8, "Password must be at least 8 characters long"),
  verifyPassword: yup
    .string()
    .oneOf([yup.ref("password"), ""], "Passwords must match")
    .required("Password confirmation is required"),
});

const PasswordForm: React.FC<Props> = ({ email, setShowPasswordScreen }) => {
  const navigate = useNavigate();
  const passwordForm = useForm<FormData>({
    defaultValues: {
      password: "",
      verifyPassword: "",
    },
    resolver: yupResolver(schema) as Resolver<FormData>,
  });
  const { register, handleSubmit, formState } = passwordForm;
  const { errors } = formState;

  const passwordSetter: SubmitHandler<FieldValues> = async (data) => {
    const { password, verifyPassword } = data;
    if (password !== verifyPassword) {
      toast("Passwords do not match", { icon: "🔒" });
      console.log("====================================");
      console.log("passwords do not match");
      console.log("====================================");
      return;
    }
    try {
      const res = await axios.post(
        `http://localhost:5000/api/v1/auth/set-password`,
        { email, password, verifyPassword }
      );
      if (res && res.data) {
        setShowPasswordScreen((prev) => !prev);
        toast.success("Password set successfully");
        toast.success("Login to continue");
        navigate("/login");
        // router.push("/otp")

        console.log(res);
      } else {
        toast.error("Internal server error");
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
        onSubmit={handleSubmit(passwordSetter)}
      >
        <div>
          <label
            htmlFor="password"
            className="block mb-2 text-sm font-medium text-white"
          >
            Password
          </label>
          <input
            type="password"
            {...register("password")}
            id="password"
            placeholder="••••••••"
            className=" border   sm:text-sm rounded-lg  block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
          />
          <div>
            {errors.password ? (
              <p className="text-red-500 text-xs italic">
                {errors.password.message}
              </p>
            ) : (
              <div style={{ height: "1rem" }} />
            )}
          </div>
        </div>
        <div>
          <label
            htmlFor="confirm-password"
            className="block mb-2 text-sm font-medium text-white"
          >
            Confirm password
          </label>
          <input
            type="password"
            {...register("verifyPassword")}
            id="confirmPassword"
            placeholder="••••••••"
            className=" border  sm:text-sm rounded-lg  block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
            required
          />
          <div>
            {errors.verifyPassword ? (
              <p className="text-red-500 text-xs italic">
                {errors.verifyPassword.message}
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
          Create an account
        </button>
        <p className="text-sm font-light text-gray-400">
          Already have an account?{" "}
          <Link
            to="/login"
            className="font-medium  hover:underline text-primary-500"
          >
            Login here
          </Link>
        </p>
      </form>
    </div>
  );
};

export default PasswordForm;

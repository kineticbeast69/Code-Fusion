import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import axios from "axios";
function Signup() {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [error, setError] = useState({
    event: false,
    message: "",
  });
  const submitData = async (data) => {
    const { username, email, password, confirmPassword } = data;
    try {
      const response = await axios.post("http://localhost:8000/auth/signup", {
        username,
        email,
        password,
        confirmPassword,
      });
      navigate("/");
    } catch (error) {
      if (error.response) {
        setError({ event: true, message: error.response.data.message });
      }
    }
  };

  return (
    <div className="min-h-screen w-full flex justify-center items-center text-white bg-[#040820] overflow-y-hidden">
      <div className="w-[80%] md:w-[50%] lg:w-[30%]">
        <div className="flex items-center justify-center gap-3  mb-3 md:mb-6 ">
          <img
            src="../images/code.png"
            alt=""
            className="w-[55px] md:w-[75px]"
          />
          <span className="text-3xl font-semibold">
            Code <span className="text-blue-600">Fusion</span>
          </span>
        </div>
        <div className="w-full ">
          <form
            className=" shadow-md rounded "
            onSubmit={handleSubmit(submitData)}
          >
            {/* username field is over here */}

            <div className="mb-4">
              <label
                className="block text-gray-300 text-md font-bold mb-2"
                htmlFor="username"
              >
                Username
              </label>
              <input
                className="shadow appearance-none  border-b border-teal-500 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="username"
                type="text"
                placeholder="Username"
                {...register("username", {
                  required: "Username is required.",
                  minLength: {
                    value: 5,
                    message: "Username must be 5 characters long*",
                  },
                  maxLength: {
                    value: 20,
                    message: "Username must be less than 20 characters*",
                  },
                  pattern: {
                    value: /^[A-Za-z0-9]+$/i,
                    message:
                      "Username can only contain alphanumeric characters",
                  },
                })}
              />
              {errors.username && (
                <p className="text-red-500 text-xs italic ">
                  {errors.username.message}
                </p>
              )}
            </div>

            {/* email field is over her */}

            <div className="mb-4">
              <label
                className="block text-gray-300 text-md font-bold mb-2"
                htmlFor="email"
              >
                Email
              </label>
              <input
                className="shadow appearance-none  border-b border-teal-500 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="email"
                type="email"
                placeholder="abc@mail.com"
                {...register("email", {
                  required: "Email is required.",
                  pattern: {
                    value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                    message: "Enter valid Email.",
                  },
                })}
              />
              {errors.email && (
                <p className="text-red-500 text-xs italic">
                  {errors.email.message}
                </p>
              )}
            </div>

            {/* password field is over here */}

            <div className="mb-4">
              <label
                className="block text-gray-300 text-md font-bold mb-2"
                htmlFor="password"
              >
                Password
              </label>
              <input
                className="shadow appearance-none border-b border-teal-500 rounded w-full py-2 px-3 text-gray-700 mb-1 leading-tight focus:outline-none focus:shadow-outline"
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder={showPassword ? "password" : "********"}
                {...register("password", {
                  required: "Password is required.",
                  minLength: {
                    value: 5,
                    message: "Password must be 5 characters long.",
                  },
                  maxLength: {
                    value: 10,
                    message: "Password must be less than 10 characters.",
                  },
                  pattern: {
                    value: /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*])/,
                    message:
                      "Password must include uppercase, lowercase, number, and special character",
                  },
                })}
              />
              {errors.password && (
                <p className="text-red-500 text-xs italic">
                  {errors.password.message}
                </p>
              )}
            </div>

            {/* confirm password is over here */}

            <div className="mb-4">
              <label
                className="block text-gray-300 text-md font-bold mb-2"
                htmlFor="confirm_password"
              >
                Confirm Password
              </label>
              <input
                className="shadow appearance-none border-b border-teal-500 rounded w-full py-2 px-3 text-gray-700 mb-1 leading-tight focus:outline-none focus:shadow-outline"
                id="confirm_password"
                type={showPassword ? "text" : "password"}
                placeholder={showPassword ? "password" : "********"}
                {...register("confirmPassword", {
                  required: "Password is required.",
                  minLength: {
                    value: 5,
                    message: "Password must be 5 characters long.",
                  },
                  maxLength: {
                    value: 10,
                    message: "Password must be less than 10 characters.",
                  },
                  pattern: {
                    value: /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*])/,
                    message:
                      "Password must include uppercase, lowercase, number, and special character",
                  },
                })}
              />
              {errors.confirmPassword && (
                <p className="text-red-500 text-xs italic">
                  {errors.confirmPassword.message}
                </p>
              )}
              <div className="flex items-center justify-start gap-1 my-2">
                <input
                  type="checkbox"
                  id="check_password"
                  className="w-[14px] rounded-md outline-none border-none"
                  onClick={() => setShowPassword((prev) => !prev)}
                />
                <label
                  htmlFor="check_password"
                  className="text-gray-300 text-sm"
                >
                  {showPassword ? " Hide " : " Show "}Password
                </label>
              </div>
            </div>
            {/* error request from the server. */}
            {error.event ? (
              <div className="my-2 text-lg text-red-500 italic">
                {error.message}
              </div>
            ) : (
              ""
            )}
            <div className="flex items-center justify-between">
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
                type="submit"
              >
                Sign Up
              </button>
            </div>
            <div className="h-[0.7px] w-[100%] bg-slate-500 align-middle rounded-full my-5" />
          </form>
          <div className=" text-sm">
            Already Have an Account?{" "}
            <span>
              <Link to="/" className="font-semibold text-blue-600">
                Sign-In
              </Link>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Signup;
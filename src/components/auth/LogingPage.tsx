import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
//import api from "../services/interceptors";
import { login, otp } from "../../services";
import {  saveToken } from "../../utils/decode";
import { AlertCircle, LogIn } from "lucide-react";
//import { get } from "node_modules/axios/index.d.cts";

// const Crediential = {
//  email: "azeez@gmail.com",
//  password: "azeez123",
// };
const validationSchema = Yup.object({
  emailAddress: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
});

const otpValidationSchema = Yup.object({
  otp: Yup.string()
    .required("OTP is required")
    .length(6, "OTP must be exactly 6 digits")
    .matches(/^[0-9]+$/, "OTP must contain only digits"),
});

const LoginPage: React.FC = () => {
  //  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [showOtp, setShowOtp] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      emailAddress: "",
      password: "",
      otp: "",
    },
    validationSchema: showOtp ? otpValidationSchema : validationSchema,
    enableReinitialize: true,
    onSubmit: async (values) => {
      // setIsLoading(true);
      // setEmail("")
      // setPassword("")

      if (!showOtp) {
        setIsLoading(true);
        // setError

        try {
          const payload = {
            emailAddress: values.emailAddress,
            password: values.password,
          };
          const res = await login(payload);
          if (res.success || res.message === "Token is still valid ") {
            toast.success(res.message);
            setShowOtp(true);
            //setIsLoading(false);
          } else {
            //setError(res.message || "Login failed");
            toast.error(res.message || "Login failed");
          }

         // toast.success("Login successful!");
        } catch (error) {
          console.error("Login error", error);
        } finally {
           setIsLoading(false);
        }
        return;
        //console.log(values);
      }
      if (showOtp) {
        setIsLoading(true);
        setError("");
        try {
          const payload = {
            emailAddress: values.emailAddress,
            otp: values.otp,
          };
          const res = await otp(payload);

          if (res.data.success) {
            saveToken("token", res.data.token);
            sessionStorage.setItem("ud", JSON.stringify(res.data));
            toast.success("Login successful!");
            navigate("/layout");
            // const userData = getDecodedToken("token");

            toast.success("OTP verified successfully!");
            navigate("/layout");
          } else {
           // setError(res.data.message || "OTP verification failed");
            toast.error(res.data.message || "OTP verification failed");
          }
        } catch (error) {
          console.error("OTP verification error:", error);
        } finally {
          setIsLoading(false);
        }
      }
    },
  });

  return (
    <div className="min-h-screen bg-white- flex items-center justify-center">
      {/* Card */}
      <div className="w-[400%] max-w-5xl h-[500px] flex rounded-3xl overflow-hidden shadow-2xl">
        {/* LEFT SIDE */}
        <div className="w-1/2 relative bg-gradient-to-br from-[#510c35] to-[#B0127D] text-white p-12 flex flex-col ">
          <div className="mb-10 justify-items-center gap-6 flex flex-col ml-14">
            <p className="text-6xl font-bold first-line ml-24">SDE</p>

            <p className="text-2xl tracking-wide font-extrabold mt-20">
              STRUCTURED DATABASE
            </p>
            <p className="text-lg  font-semibold ml-32 mt-8"> FOR</p>
            <p className="text-4xl font-semibold ml-12 ">E - CHANNELS</p>
          </div>

          {/* Decorative watermark (optional) */}
          <div className="absolute inset-0 font-black flex items-center justify-center">
            <img src="./trans_cover.png" alt="watermark"></img>
          </div>
        </div>

        {/* RIGHT SIDE */}
        <div className="w-1/2 bg-[#ffff] p-12 flex flex-col justify-center">
          <div className="mb-8 text-center">
            <div className="mb-3 flex justify-center">
              {/* Logo placeholder */}
              {/* <div className="w-10 h-10 bg-purple-600 rounded-md" /> */}
              <img src="./wena_icon.png" className="w-15 h-12" />
            </div>
            <h2 className="text-3xl font-bold">Welcome</h2>
            <p className="text-sm text-gray-600 mt-2 font-extrabold">
              Sign in To Get Report
            </p>
          </div>

          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-center space-x-2 text-red-700">
              <AlertCircle className="w-5 h-5 flex-shrink-0" />
              <span className="text-sm">{error}</span>
            </div>
          )}

          <form onSubmit={formik.handleSubmit} className="space-y-6">
            {!showOtp ? (
              <>
                <div>
                  <label htmlFor="email" className="text-sm">
                    Email address
                  </label>
                  <input
                    name="emailAddress"
                    type="email"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.emailAddress}
                    className="mt-2 w-full rounded-xl px-5 py-3 outline-none"
                  />
                </div>

                <div>
                  <label className="text-sm">Password</label>
                  <input
                    id="password"
                    type="password"
                    name="password"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.password}
                    className="mt-2 w-full rounded-xl px-5 py-3 outline-none hover:border-[#79146b]"
                  />
                </div>

                <button
                  type="submit"
                  className="w-40 mx-auto block bg-[#8A226F] text-white py-3 rounded-2xl  hover:bg-[#bd3799] shadow-2xl transition"
                >
                  sign in
                </button>
              </>
            ) : (
              <>
                {/* OTP Field */}
                <div>
                  <label
                    htmlFor="otp"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Enter OTP
                  </label>
                  <input
                    id="otp"
                    type="text"
                    {...formik.getFieldProps("otp")}
                    className={`input-field ${
                      formik.touched.otp && formik.errors.otp
                        ? "border-red-300 focus:ring-red-500 focus:border-red-500"
                        : ""
                    }`}
                    placeholder="Enter your OTP"
                  />
                  {formik.touched.otp && formik.errors.otp && (
                    <p className="mt-1 text-sm text-red-600">
                      {formik.errors.otp}
                    </p>
                  )}
                </div>

                {/* OTP Submit */}
                <button
                  type="submit"
                  disabled={isLoading || !formik.values.otp || !formik.isValid}
                  className="w-full mt-10 gradient-primary-hover disabled:from-gray-400 disabled:to-gray-500 text-white font-medium py-3 px-4 rounded-lg transition-all duration-200 flex items-center justify-center space-x-2"
                >
                  {isLoading ? (
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <>
                      <LogIn className="w-5 h-5" />
                      <span>Proceed</span>
                    </>
                  )}
                </button>
              </>
            )}
            ;
          </form>
        </div>
      </div>
    </div>
  );
};
export default LoginPage;

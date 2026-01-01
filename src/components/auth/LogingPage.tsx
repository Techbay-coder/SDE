
import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import type loginValues from "../../types";
import toast from "react-hot-toast";


const Crediential = {
 email: "azeez@gmail.com",
 password: "azeez123",
};
 const validationSchema = Yup.object({
  email: Yup.string()
  .email("Invalid email address").required("Email is required"),
  password: Yup.string()
  .min(6, "Password must be at least 6 characters")
  .required("Password is required"),
});

 const LoginPage: React.FC = () => {
    // const [email, setEmail] = useState("");
    // const [password, setPassword] = useState("");
    const navigate = useNavigate();



   const formik = useFormik<loginValues>({
     initialValues: {
       email: "",
       password: "",
       otp: "",
    
     },
      validationSchema,
     onSubmit: (values) => {
       
        // setEmail('');
        // const email = values.email; 
        // setPassword('');
  
        if (values.email === Crediential.email && values.password === Crediential.password) {
          //  setEmail(values.email);
           toast.success("Login successful!");
           navigate("/layout");
          }
         console.log(values);
       },
   });

  return (
    <div className="min-h-screen bg-white- flex items-center justify-center">
      {/* Card */}
      <div className="w-[400%] max-w-5xl h-[500px] flex rounded-3xl overflow-hidden shadow-2xl">

        {/* LEFT SIDE */}
        <div className="w-1/2 relative bg-gradient-to-br from-[#510c35] to-[#B0127D] text-white p-12 flex flex-col ">
         <div className="mb-10 justify-items-center gap-6 flex flex-col ml-14" >
          <p className="text-6xl font-bold first-line ml-24">
            SDE
           </p>

          <p className="text-2xl tracking-wide font-extrabold mt-20">
            STRUCTURED DATABASE
          </p>
          <p className="text-lg  font-semibold ml-32 mt-8"  > FOR</p>
          <p className="text-4xl font-semibold ml-12 ">
            E - CHANNELS
          </p>
         </div> 

          {/* Decorative watermark (optional) */}
          <div className="absolute inset-0 font-black flex items-center justify-center">
            <img
                 src='./trans_cover.png'
                  alt="watermark"
            ></img>
          </div>
        </div>

        {/* RIGHT SIDE */}
        <div className="w-1/2 bg-[#E9E5E7] p-12 flex flex-col justify-center">
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

          <form onSubmit={ formik.handleSubmit} className="space-y-6">
            <div>
              <label className="text-sm">Email address</label>
              <input
                id ="email"
                name="email"
                type="email"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.email}

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
          </form>
        </div>

      </div>
    </div>
  );
};
export default LoginPage;

// import React, { useState } from "react";
// import axios from "axios";
// import {useNavigate } from "react-router-dom"
// import { useAuth } from "../../context/authContext";



// const Setting = () => {
//     const navigate = useNavigate();
//     const {user} = useAuth();
//     const [setting, setSetting] = useState({
//         userId: user._id,
//         oldPassword: "",
//         newPassword:"",
//         confirmPassword: "",
//     });
//     const [error, setError] = useState(null);

//     const handleChange = (e) => {

//         const {name, value } = e.target;
//         setSetting({...setting, [name]: value});
//     }

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         if(setting.newPassword !== setting.confirmPassword){
//             setError ("password not matched")
//         } else {
//             try {
//                 const response = await axios.put("http://localhost:3000/api/setting/change-password",
//                     setting,
//                     {
//                         headers : {
//                             Authorization: `Bearer ${localStorage.getItem("token")}`,
//                         }
//                     }
//                 );
//                 if (response.data.success){
//                     navigate("/admin-dashboard/employees");
//                     setError("")
//                 }
                
//             } catch (error) {
//                 if (error.response && !error.response.data.success){
//                     setError(error.response.data.error)
//                 }
                
//             }
//         }
//     }
//     return (
//         <div className="flex flex-col items-center h-screen justify-center bg-gradient-to-b from-teal-600 from-50% to-gray-100 to-50% space-y-6">
//              <h2 className="font-pacific text-3xl text-white"> 
//                  Employee Management System
//              </h2>
 
//              <div className="border shadow p-6 w-80 bg-white rounded-lg">
//                  <h2 className="text-2xl font-bold mb-4 text-center">Login</h2>
//                  {error && <p className="text-red-500">{error}</p>}
 
//                  <form onSubmit={handleSubmit} >
                     

//                         {/* Password old */}
//                      <div className="mb-4">
//                          <label htmlFor="password" className="block text-gray-700">Old Password</label>
//                          <input 
//                              type="password" 
//                              name="oldPassword"
//                              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-teal-600"
//                              placeholder="change Password"
//                              onChange={handleChange}
//                              required
//                          />
//                      </div>


//                      {/* Password new */}
//                      <div className="mb-4">
//                          <label htmlFor="password" className="block text-gray-700">New Password</label>
//                          <input 
//                              type="password" 
//                              name="newPassword"
//                              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-teal-600"
//                              placeholder="New Password"
//                              onChange={handleChange}
//                              required
//                          />
//                      </div>
 
//                      {/* Password confirm */}

//                      <div className="mb-4">
//                          <label htmlFor="password" className="block text-gray-700">Confirm Password</label>
//                          <input 
//                              type="password" 
//                              name="confirmPassword"
//                              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-teal-600"
//                              placeholder="Confirm Password"
//                              onChange={handleChange}
//                              required
//                          />
//                      </div>

 
//                      {/* Login Button */}
//                      <div className="mb-4">
//                          <button 
//                              type="submit" 
//                              className="w-full bg-teal-600 text-white py-2 rounded-md hover:bg-teal-700 transition duration-300"
//                          >
//                              Change Password
//                          </button>
//                      </div>
//                  </form>
//              </div>
//         </div>
//      );
// }

// export default Setting


import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/authContext";

const Setting = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [setting, setSetting] = useState({
    userId: user._id,
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [error, setError] = useState(null);
  const [isUnauthorized, setIsUnauthorized] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSetting({ ...setting, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (setting.newPassword !== setting.confirmPassword) {
      setError("Passwords do not match");
    } else {
      try {
        const response = await axios.put(
          "https://employee-api-sepia.vercel.app/api/setting/change-password",
          setting,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );

        if (response.data.success) {
          navigate("/employee-dashboard");
          setError("");
        }
      } catch (error) {
        if (error.response && error.response.status === 401) {
          setIsUnauthorized(true);
          setError("You are not authorized to perform this action.");
        } else {
          setError(error.response?.data?.error || "An error occurred");
        }
      }
    }
  };

  return (
    <div className="flex flex-col items-center h-screen justify-center bg-gradient-to-b from-teal-600 from-50% to-gray-100 to-50% space-y-6">
      <h2 className="font-pacific text-3xl text-white">Employee Management System</h2>

      <div className="border shadow p-6 w-80 bg-white rounded-lg">
        <h2 className="text-2xl font-bold mb-4 text-center">Change Password</h2>
        {isUnauthorized && (
          <p className="text-red-500 mb-4">You are not authorized to perform this action.</p>
        )}
        {error && <p className="text-red-500">{error}</p>}

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="password" className="block text-gray-700">Old Password</label>
            <input
              type="password"
              name="oldPassword"
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-teal-600"
              placeholder="Change Password"
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="password" className="block text-gray-700">New Password</label>
            <input
              type="password"
              name="newPassword"
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-teal-600"
              placeholder="New Password"
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="password" className="block text-gray-700">Confirm Password</label>
            <input
              type="password"
              name="confirmPassword"
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-teal-600"
              placeholder="Confirm Password"
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-4">
            <button
              type="submit"
              className="w-full bg-teal-600 text-white py-2 rounded-md hover:bg-teal-700 transition duration-300"
            >
              Change Password
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Setting;

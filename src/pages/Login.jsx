import React, { useState } from "react";
import axios from 'axios'
import { useAuth } from "../context/authContext";
import { useNavigate } from "react-router-dom";


const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null)
    const {login} = useAuth()
    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const response = await axios.post(
                "http://localhost:3000/api/auth/login",
                {email, password,}
            );
            if (response.data.success) {
                login(response.data.user);
                localStorage.setItem("token", response.data.token);
                if (response.data.user.role === "admin") {
                    navigate('/admin-dashboard');  // Redirection vers le tableau de bord admin
                } else {
                    navigate('/employee-dashboard');  // Redirection vers le tableau de bord employé
                }
            }
        } catch (error) {
            if (error.response && error.response.data.success === false) {
                setError(error.response.data.error);
            } else {
                setError("Server Error");
            }
        }
    };


    //         if(response.data.success){
    //             login(response.data.user)
    //             console.log(response.data.user)
    //             localStorage.setItem("token", response.data.token)
    //             if (response.data.user.role === "admin"){
    //                 navigate('/admin-dashboard')     
    //             }else {
    //                 navigate('employee-dashboard')
    //             }
    //         }
            
    //     } catch (error) {
    //         if(error.response && error.response.data.success) {
    //             setError(error.response.data.error)

    //         } else {
    //            setError ("Server Error")
    //         }
            
    //     }

    // };


// import { useState } from "react";
// import axios from "axios"; // ✅ Ajout de l'import axios

// const Login = () => {
//     const [email, setEmail] = useState("");
//     const [password, setPassword] = useState("");
//     const [error, setError] = useState(null);

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         try {
//             const response = await axios.post("http://localhost:3000/api/auth/login", {
//                 email,
//                 password,
//             });

//             if (response.data.success) {
//                 alert("Successfully logged in!");
//                 setError(null); // ✅ Réinitialiser les erreurs en cas de succès
//             }
//         } catch (error) {
//             if (error.response && error.response.data) {
//                 setError(error.response.data.error || "Erreur inconnue");
//             } else {
//                 setError("Server Error");
//             }
//         }
//     };

    return (
       <div className="flex flex-col items-center h-screen justify-center bg-gradient-to-b from-teal-600 from-50% to-gray-100 to-50% space-y-6">
            <h2 className="font-pacific text-3xl text-white"> 
                Employee Management System
            </h2>

            <div className="border shadow p-6 w-80 bg-white rounded-lg">
                <h2 className="text-2xl font-bold mb-4 text-center">Login</h2>
                {error && <p className="text-red-500">{error}</p>}

                <form onSubmit={handleSubmit} >
                    {/* Email Input */}
                    <div className="mb-4">
                        <label htmlFor="email" className="block text-gray-700">Email</label>
                        <input 
                            type="email" 
                            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-teal-600"
                            placeholder='Enter Email'
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>

                    {/* Password Input */}
                    <div className="mb-4">
                        <label htmlFor="password" className="block text-gray-700">Password</label>
                        <input 
                            type="password" 
                            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-teal-600"
                            placeholder='*********' 
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>

                    {/* Remember Me & Forgot Password */}
                    <div className="mb-4 flex items-center justify-between">
                        <label className="inline-flex items-center">
                            <input type="checkbox" className="form-checkbox text-teal-600" />
                            <span className="ml-2 text-gray-700">Remember me</span>
                        </label>
                        <a href="#" className="text-teal-600 hover:underline">Forgot password?</a>
                    </div>

                    {/* Login Button */}
                    <div className="mb-4">
                        <button 
                            type="submit" 
                            className="w-full bg-teal-600 text-white py-2 rounded-md hover:bg-teal-700 transition duration-300"
                        >
                            Login
                        </button>
                    </div>
                </form>
            </div>
       </div>
    );
}

export default Login;

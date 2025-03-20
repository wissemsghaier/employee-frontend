import React from "react";
import { FaUser } from "react-icons/fa";
import { useAuth } from "../../context/authContext";


const Summary = () => {
    const {user } = useAuth()
    return (
        <div className="p-6"> 
        <div className="flex bg-white rounded-lg shadow-md w-[300px] p-2">
            <div className={`text-2xl flex justify-center items-center bg-teal-600 text-white px-3 py-1 rounded-l-lg`}>
                <FaUser />
            </div>
            <div className="pl-3 py-0 flex flex-col justify-center">
                <p className="text-sm font-semibold text-gray-700">Welcom Back</p>
                <p className="text-lg font-bold text-gray-900">{user.name}</p>
            </div>
        </div>
        </div>
    );
};

export default Summary;

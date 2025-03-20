import React from "react";
import { NavLink } from "react-router-dom";
import { FaBuilding, FaTachometerAlt, FaCogs, FaMoneyBillWave, FaUser, FaCalendarAlt } from "react-icons/fa";
import { useAuth } from "../../context/authContext";

const SideBar = () => {
    const {user} = useAuth ()
    return (
        <div className="bg-gray-800 text-white h-screen fixed left-0 top-0 buttom-0 space-y-2 w-64">
            <div className='bg-teal-600 h-12 flex items-center justify-center' >
                <h3 className='text-2xl text-center font-pacific'>Employee MS</h3>
            </div>
            <div className="px-4">
                <NavLink to="/employee-dashboard"
                    className={({isActive}) => `${isActive ? "bg-teal-500 " : " " } flex items-center space-x-4 block py-2.5 px-4 rounded`}
                    end
                    >
                    <FaTachometerAlt />
                    <span>Dashboard</span>
                </NavLink>
                <NavLink to={`/employee-dashboard/profile/${user._id}`}
                    className={({isActive}) => `${isActive ? "bg-teal-500 " : " " } flex items-center space-x-4 block py-2.5 px-4 rounded`}
                    >
                    <FaUser />
                    <span>My Profile</span>
                </NavLink>
                <NavLink to={`/employee-dashboard/leaves/${user._id}`}
                className={({isActive}) => `${isActive ? "bg-teal-500 " : " " } flex items-center space-x-4 block py-2.5 px-4 rounded`}>
                    {/* className="flex items-center space-x-4 block py-2.5 px-4 rounded"> */}
                    <FaBuilding />
                    <span>Leaves</span>
                </NavLink>
                <NavLink to={`/employee-dashboard/salary/${user._id}`}
                    className={({isActive}) => `${isActive ? "bg-teal-500 " : " " } flex items-center space-x-4 block py-2.5 px-4 rounded`}>
                    <FaCalendarAlt />
                    <span>Salary</span>
                </NavLink>
                
                <NavLink to="/employee-dashboard/setting"
                    className={({isActive}) => `${isActive ? "bg-teal-500 " : " " } flex items-center space-x-4 block py-2.5 px-4 rounded`}>
                    <FaCogs />
                    <span>Setting</span>
                </NavLink>
            </div>
        </div>
    );
};

export default SideBar;

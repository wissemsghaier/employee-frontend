// import React from "react";
// import { useAuth } from "../context/authContext";
// import {useNavigete} from 'react-router-dom'

// const AdminDashboard = () => {
//     const {user, loading}= useAuth()
//     const navigate = useNavigete()

//     if (loading){
//         return <div> Loading ....</div>
//     }
//     if(!user){
//         navigate('/login')

//     }
//     return (
//         <div>AdminDashboard {user && user.name}</div>
//     )
// }

// export default AdminDashboard 

import React from "react";
import { useAuth } from "../context/authContext";
import AdminSideBar from "../components/dashboard/AdminSideBar";
import NavBar from "../components/dashboard/NavBar";
import AdminSummary from "../components/dashboard/AdminSummary";
import { Outlet } from "react-router-dom";


const AdminDashboard = () => {
    const { user } = useAuth();
    

    return (
        <div className='flex'>
            <AdminSideBar/>
            <div className='flex-1 ml-64 bg-gray-100 h-screen'>
                
                <NavBar/>
                {/* <AdminSummary/> */}
                <Outlet></Outlet>
                

            </div>
            
        </div>
    )
}

export default AdminDashboard;

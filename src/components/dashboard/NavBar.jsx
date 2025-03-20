import React from "react"
import { useAuth } from "../../context/authContext";


const NavBar = () => {
    const { user, logout } = useAuth();
    return (
        <div className="flex items-center text-white justify-between h-12 bg-teal-500 px-4">
            <p>WelCome {user.name} </p>
            <button className="px-4 py-1 bg-teal-700 hover:bg-teal-80" onClick={logout}>Logout</button>
        </div>
    )
}
export default NavBar
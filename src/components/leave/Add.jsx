import React, { useState } from "react";
import { useAuth } from "../../context/authContext";
import { useNavigate } from "react-router-dom";
import axios from "axios"; // ✅ Ajout de l'import manquant

const Add = () => {
    const { user } = useAuth();
    const navigate = useNavigate();

    const [leave, setLeave] = useState({
        userId: user._id,
        leaveType: "",
        startDate: "",
        endDate: "",
        reason: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setLeave((prevState) => ({ ...prevState, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post("http://localhost:3000/api/leave/add", 
                leave, // ✅ Envoi des données dans le body
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                        "Content-Type": "application/json",
                    },
                }
            );

            console.log(response.data);
            if (response.data.success) {
                navigate("/employee-dashboard/leaves/");
            }
        } catch (error) {
            console.error("Error submitting leave request:", error);
            if (error.response && error.response.data.error) {
                alert(error.response.data.error);
            }
        }
    };

    return (
        <div className="max-w-3xl mx-auto bg-white shadow-lg rounded-lg p-8 mt-10">
            <h2 className="text-3xl font-bold text-gray-800 text-center mb-6">Request for Leave</h2>
            <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                
                {/* Leave Type */}
                <div className="sm:col-span-2">
                    <label className="block text-gray-700 font-medium mb-1">Leave Type</label>
                    <select
                        name="leaveType"
                        value={leave.leaveType} // ✅ Ajout de la valeur liée à l'état
                        onChange={handleChange}
                        className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                        required
                    >
                        <option value="">Select Leave</option>
                        <option value="Sick Leave">Sick Leave</option>
                        <option value="Casual Leave">Casual Leave</option>
                        <option value="Annual Leave">Annual Leave</option>
                    </select>
                </div>

                {/* From Date & To Date */}
                <div className="sm:col-span-2 flex flex-col sm:flex-row gap-4">
                    <div className="w-full">
                        <label className="block text-gray-700 font-medium mb-1">From Date</label>
                        <input
                            type="date"
                            name="startDate"
                            value={leave.startDate} // ✅ Liaison avec l'état
                            onChange={handleChange}
                            className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                            required
                        />
                    </div>

                    <div className="w-full">
                        <label className="block text-gray-700 font-medium mb-1">To Date</label>
                        <input
                            type="date"
                            name="endDate"
                            value={leave.endDate} // ✅ Liaison avec l'état
                            onChange={handleChange}
                            className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                            required
                        />
                    </div>
                </div>

                {/* Description */}
                <div className="sm:col-span-2">
                    <label className="block text-gray-700 font-medium mb-1">Description</label>
                    <textarea
                        name="reason"
                        placeholder="Enter reason for leave..."
                        value={leave.reason} // ✅ Liaison avec l'état
                        onChange={handleChange}
                        className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                        rows="4"
                        required
                    ></textarea>
                </div>

                {/* Submit Button */}
                <div className="sm:col-span-2">
                    <button
                        type="submit"
                        className="w-full bg-teal-600 text-white font-bold py-2 rounded-md hover:bg-teal-700 transition duration-300"
                    >
                        Submit Leave Request
                    </button>
                </div>
            </form>
        </div>
    );
};

export default Add;

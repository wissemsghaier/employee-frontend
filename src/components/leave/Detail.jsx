import axios from "axios";
import React, { useEffect, useState } from "react";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { FaUser, FaIdBadge, FaCalendarAlt, FaClipboardList, FaBuilding } from "react-icons/fa";

const Detail = () => {
    const { id } = useParams();
    const [leave, setLeave] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const navigate = useNavigate()

    useEffect(() => {
        const fetchLeave = async () => {
            setLoading(true);
            setError(null); // Reset error before fetching
            try {
                const response = await axios.get(`http://localhost:3000/api/leave/detail/${id}`, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`,
                    },
                });

                if (response.data.success) {
                    setLeave(response.data.leave);
                } else {
                    setError('Failed to fetch leave details.');
                }
            } catch (error) {
                setError("Error fetching leave details. Please try again.");
                console.error("Error fetching leave details:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchLeave();
    }, [id]);

    // const handleApprove = () => {
    //     console.log("Approve leave");
    //     // Add your approve logic here
    // };

    // const handleReject = () => {
    //     console.log("Reject leave");
    //     // Add your reject logic here
    // };


  const changeStatus = async (id, status) => {
    try {
      const response = await axios.put(`http://localhost:3000/api/leave/${id}`, {status},{
          headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
      });

      if (response.data.success) {
          navigate('/admin-dashboard/leaves')
      } else {
          setError('Failed to fetch leave details.');
      }
  } catch (error) {
      setError("Error fetching leave details. Please try again.");
      console.error("Error fetching leave details:", error);
  }
  }

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100">
            {loading ? (
                <p className="text-center text-gray-500 text-xl font-medium animate-pulse">Loading leave details...</p>
            ) : error ? (
                <p className="text-center text-red-500 text-xl font-medium">{error}</p>
            ) : leave ? (
                <div className="w-full max-w-2xl bg-white shadow-lg rounded-xl p-6 space-y-6 border border-gray-200">
                    <h2 className="text-3xl font-bold text-gray-800 text-center">Leave Details</h2>
                    <div className="space-y-4">
                        <DetailRow icon={<FaUser className="text-blue-600" />} label="Employee Name" value={leave.employeeId.userId?.name || "N/A"} />
                        <DetailRow icon={<FaIdBadge className="text-green-600" />} label="Employee ID" value={leave.employeeId.employeeId || "N/A"} />
                        <DetailRow icon={<FaClipboardList className="text-indigo-600" />} label="Leave Type" value={leave.leaveType} />
                        <DetailRow icon={<FaBuilding className="text-orange-600" />} label="Department" value={leave.employeeId.department?.dep_name || "N/A"} />
                        <DetailRow icon={<FaCalendarAlt className="text-red-600" />} label="Start Date" value={new Date(leave.startDate).toLocaleDateString()} />
                        <DetailRow icon={<FaCalendarAlt className="text-purple-600" />} label="End Date" value={new Date(leave.endDate).toLocaleDateString()} />
                        <DetailRow icon={<FaClipboardList className="text-gray-600" />} label="Reason" value={leave.reason} />
                        
                        <div className="flex items-center justify-between bg-gray-100 px-4 py-3 rounded-md">
                            <p className="text-lg font-semibold text-gray-700">
                              {leave.status === "Pending" ? "Action: " : "Status:"}
                            </p>
                            {leave.status === "Pending" ? (
                              <div className="space-x-4">
                                <button
                                  onClick={() => changeStatus(leave._id,"Approved" )}
                                  className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"

                                >
                                  Approve
                                </button>
                                <button
                                  onClick={() => changeStatus(leave._id,"Rejected" )}
                                  className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
                                >
                                  Reject
                                </button>
                              </div>
                            ) : (
                                <span className={`px-3 py-1 text-white font-semibold rounded-md ${
                                    leave.status === "Approved" ? "bg-green-500" : leave.status === "Rejected" ? "bg-red-500" : "bg-yellow-500"
                                }`}>
                                    {leave.status}
                                </span>
                            )}
                        </div>
                    </div>
                </div>
            ) : (
                <p className="text-center text-gray-500 font-semibold text-lg">No leave data found.</p>
            )}
        </div>
    );
};

const DetailRow = ({ icon, label, value }) => (
    <div className="flex items-center justify-between bg-gray-50 px-4 py-2 rounded-md">
        <div className="flex items-center space-x-3">
            {icon}
            <p className="text-lg font-medium text-gray-700">{label}:</p>
        </div>
        <p className="text-lg font-semibold text-gray-900">{value}</p>
    </div>
);

export default Detail;

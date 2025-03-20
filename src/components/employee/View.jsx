import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { FaUser, FaIdCard, FaBirthdayCake, FaTransgender, FaBuilding, FaHeart, FaCalendarAlt } from 'react-icons/fa';

const View = () => {
  const { id } = useParams();
  const [employee, setEmployee] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchEmployee = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`https://employee-api-sepia.vercel.app/api/employee/${id}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });
        
        if (response.data.success) {
          setEmployee(response.data.employee);
        }
      } catch (error) {
        if (error.response && error.response.data.error) {
          alert(error.response.data.error);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchEmployee();
  }, [id]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-50 to-indigo-200 p-8">
      {loading ? (
        <div className="flex justify-center items-center text-2xl text-indigo-600 animate-spin">
          <div className="w-16 h-16 border-t-4 border-blue-500 border-solid rounded-full"></div>
        </div>
      ) : employee ? (
        <div className="max-w-3xl mx-auto bg-white p-10 rounded-lg shadow-xl border border-indigo-300">
          <h2 className="text-3xl font-semibold text-indigo-800 mb-6 text-center">Employee Details</h2>

          <div className="space-y-6">
            {/* Name */}
            <div className="flex items-center space-x-4">
              <FaUser className="text-2xl text-indigo-600" />
              <div className="flex justify-between w-full">
                <span className="text-lg font-medium text-gray-700">Name:</span>
                <span className="text-lg text-gray-500">{employee.userId?.name || "N/A"}</span>
              </div>
            </div>

            {/* Employee ID */}
            <div className="flex items-center space-x-4">
              <FaIdCard className="text-2xl text-indigo-600" />
              <div className="flex justify-between w-full">
                <span className="text-lg font-medium text-gray-700">Employee ID:</span>
                <span className="text-lg text-gray-500">{employee.employeeId || "N/A"}</span>
              </div>
            </div>

            {/* Date of Birth */}
            <div className="flex items-center space-x-4">
              <FaBirthdayCake className="text-2xl text-indigo-600" />
              <div className="flex justify-between w-full">
                <span className="text-lg font-medium text-gray-700">Date of Birth:</span>
                <span className="text-lg text-gray-500">
                  {employee.dob ? new Date(employee.dob).toLocaleDateString() : "N/A"}
                </span>
              </div>
            </div>

            {/* Gender */}
            <div className="flex items-center space-x-4">
              <FaTransgender className="text-2xl text-indigo-600" />
              <div className="flex justify-between w-full">
                <span className="text-lg font-medium text-gray-700">Gender:</span>
                <span className="text-lg text-gray-500">{employee.gender || "N/A"}</span>
              </div>
            </div>

            {/* Department */}
            <div className="flex items-center space-x-4">
              <FaBuilding className="text-2xl text-indigo-600" />
              <div className="flex justify-between w-full">
                <span className="text-lg font-medium text-gray-700">Department:</span>
                <span className="text-lg text-gray-500">{employee.department?.dep_name || "N/A"}</span>
              </div>
            </div>

            {/* Marital Status */}
            <div className="flex items-center space-x-4">
              <FaHeart className="text-2xl text-indigo-600" />
              <div className="flex justify-between w-full">
                <span className="text-lg font-medium text-gray-700">Marital Status:</span>
                <span className="text-lg text-gray-500">{employee.maritalStatus || "N/A"}</span>
              </div>
            </div>

            {/* Recruitment Date */}
            <div className="flex items-center space-x-4">
              <FaCalendarAlt className="text-2xl text-indigo-600" />
              <div className="flex justify-between w-full">
                <span className="text-lg font-medium text-gray-700">Recruitment Date:</span>
                <span className="text-lg text-gray-500">
                  {employee.recruitmentDate ? new Date(employee.recruitmentDate).toLocaleDateString() : "N/A"}
                </span>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="text-center text-gray-500 font-semibold text-lg">No employee data found.</div>
      )}
    </div>
  );
};

export default View;

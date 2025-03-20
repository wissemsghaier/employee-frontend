import axios from "axios";
import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { columns, LeaveButtons } from "../../utils/LeaveHelper";

const Table = () => {
    const [leaves, setLeaves] = useState(null);
    const [filteredLeaves, setfilteredLeaves] = useState(null);

    const fetchLeaves = async () => {
        try {
            const response = await axios.get("https://employee-api-nu.vercel.app/api/leave", {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            });
    
            if (!response.data?.success || !Array.isArray(response.data.leaves)) {
                console.error("Invalid API response format:", response.data);
                return;
            }
    
            let sno = 1;
            const data = response.data.leaves.map((leave) => {
                const employee = leave.employeeId || {};
                
                // Use correct property names
                const startDate = new Date(leave.startDate);  // assuming `startDate` is correct
                const endDate = new Date(leave.endDate);      // assuming `endDate` is correct
                
                const isValidDates = !isNaN(startDate.getTime()) && !isNaN(endDate.getTime());
                const days = isValidDates ? (endDate - startDate) / (1000 * 3600 * 24) : 0;

                return {
                    _id: leave._id,
                    sno: sno++,
                    employeeId: employee.employeeId || "N/A",
                    name: employee.userId?.name || "N/A",
                    leaveType: leave.leaveType || "N/A",
                    department: employee.department?.dep_name || "N/A",  // Add null check for department
                    days: days,  // Corrected days calculation
                    status: leave.status || "N/A",
                    action: <LeaveButtons DepId={leave._id} />,
                };
            });
    
            setLeaves(data);
            setfilteredLeaves(data)
        } catch (error) {
            console.error("Error fetching employees:", error);
            alert(error.response?.data?.error || "Failed to fetch employees.");
        }
    };

    useEffect(() => {
        fetchLeaves();
    }, []);


    const filterByInput = (e) => {
        const data = leaves.filter(leave => leave.employeeId
            .toLowerCase()
            .includes(e.target.value.toLowerCase()
        )
        
    )
    setfilteredLeaves(data)

    }
    const filterByButton= (status) => {
        const data = leaves.filter(leave => leave.status
            .toLowerCase()
            .includes(status.toLowerCase()
        )
        
    )
    setfilteredLeaves(data)

    }

    // const handleFilter = (e) => {
    //     setSearchTerm(e.target.value);
    // };

    return (
        <div className="max-w-4xl mx-auto mt-8 bg-white shadow-lg rounded-lg p-6">
            {filteredLeaves ? (
                <>
                    <h3 className="text-2xl font-bold text-gray-800 text-center mb-6">
                        Manage Leave
                    </h3>
                    <div className="flex flex-col sm:flex-row justify-between items-center mb-4">
                        <input
                            type="text"
                            placeholder="Search by Employee ID..."
                            className="w-full sm:max-w-md px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
                            onChange={filterByInput}

                        />
                        <div className="flex space-x-2 mt-4 sm:mt-0">
                            <button className="px-4 py-2 bg-yellow-500 text-white rounded-lg shadow hover:bg-yellow-600 transition"
                            onClick={() => filterByButton("Pending")}
                            >
                                Pending
                            </button>
                            <button className="px-4 py-2 bg-green-500 text-white rounded-lg shadow hover:bg-green-600 transition"
                            onClick={() => filterByButton("Approved")}
                            >
                                Approved
                            </button>
                            <button className="px-4 py-2 bg-red-500 text-white rounded-lg shadow hover:bg-red-600 transition"
                            onClick={() => filterByButton("Rejected")}
                            >
                                Rejected
                            </button>
                        </div>
                    </div>

                    <DataTable columns={columns} data={filteredLeaves} pagination />
                </>
            ) : (
                <div className="flex justify-center items-center h-64">
                    <div className="text-center">
                        <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-teal-500 mx-auto"></div>
                        <p className="mt-4 text-gray-600">Loading data...</p>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Table;

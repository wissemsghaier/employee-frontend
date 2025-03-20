import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { columns, EmployeeButtons } from "../../utils/EmployeeHelper";
import DataTable from "react-data-table-component";
import axios from "axios";

const List = () => {
    const [employees, setEmployees] = useState([]);
    const [emploading, setEmploading] = useState(false);
    const [filtrendEmployee, setFiltrendEmployees] = useState([])

    useEffect(() => {
        const fetchEmployees = async () => {
            setEmploading(true);
            try {
                const response = await axios.get("https://employee-api-nu.vercel.app/api/employee", {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                });

                console.log("Employees API Response:", response.data); // Debugging

                if (!response.data?.success || !Array.isArray(response.data.employee)) {
                    console.error("Invalid API response format:", response.data);
                    return;
                }
                
                let sno = 1;
                const data = response.data.employee.map((emp) => ({
                    _id: emp._id,
                    sno: sno++,
                    dep_name: emp.department?.dep_name || "N/A",
                    name: emp.userId?.name || "N/A",
                    dob: emp.dob ? new Date(emp.dob).toLocaleDateString("en-US", { 
                        year: "numeric", 
                        month: "numeric", 
                        day: "numeric" 
                    }) : "N/A",
                    recruitmentDate: emp.recruitmentDate ? new Date(emp.recruitmentDate).toDateString() : "N/A",
                    action: <EmployeeButtons DepId={emp._id} />,
                }));
                
                setEmployees(data);
                setFiltrendEmployees(data)
                
            } catch (error) {
                console.error("Error fetching employees:", error);
                if (error.response) {
                    console.error("API Error Response:", error.response.data);
                    alert(error.response.data.error || "Failed to fetch employees.");
                } else {
                    alert("Server error. Please try again later.");
                }
            } finally {
                setEmploading(false);
            }
        };

        fetchEmployees();
    }, []);

    const handlefilter = (e) => {
        const records = employees.filter((emp) => (
           emp.name.toLowerCase().includes(e.target.value.toLowerCase())
        ))
        setFiltrendEmployees(records)
    }

    return (
        <div className="max-w-full sm:max-w-3xl mx-auto bg-white shadow-lg rounded-lg p-6">
            <div className="text-center mb-6">
                <h3 className="text-3xl font-bold text-gray-800">Manage Employees</h3>
            </div>
            <div className="flex flex-col sm:flex-row justify-between items-center mb-4">
                <input
                    type="text"
                    placeholder="Search by department name..."
                    className="w-full sm:max-w-md px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
                    onChange={handlefilter}
                />
                <Link
                    to="/admin-dashboard/add-employee"
                    className="mt-4 sm:mt-0 sm:ml-4 px-5 py-2 bg-teal-600 text-white font-semibold rounded-lg shadow-md hover:bg-teal-700 transition duration-300"
                >
                    + Add Employee
                </Link>
            </div>
            <div className="mt-6">
                <DataTable columns={columns} data={filtrendEmployee} progressPending={emploading} pagination />
            </div>
        </div>
    );
};   

export default List;

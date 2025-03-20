import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FaEye, FaEdit, FaMoneyBillAlt, FaCalendarAlt } from 'react-icons/fa';

export const columns = [
    {
        name: "S No", 
        selector: (row) => row.sno,
        width:"40px"
    },
    {
        name: "Name", 
        selector: (row) => row.name,
        sortable: true,
        width:"120px",
    },
    {
        name: "Recruitment Date", 
        selector: (row) => row.recruitmentDate,
        sortable: true,
        width:"150px",
    },
    {
        name: "Department", 
        selector: (row) => row.dep_name,
        sortable: true,
        width:"140px",
    },
    {
        name: "DOB", 
        selector: (row) => row.dob,
        sortable: true,
        width:"100px",
    },
    {
        name: "Action", 
        selector: (row) => row.action
    },
];

export const fetchDepartments = async () => {
    let departments;

    try {
        const response = await axios.get('http://localhost:3000/api/department', {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
            }, 
        });
        if (response.data.success) {
            departments = response.data.departments;
        }
    } catch (error) {
        if (error.response && error.response.data.error) {
            alert(error.response.data.error);
        }
    }
    return departments;
};


// employees for salary from 

export const getEmployees = async (id) => {
    let employees;

    try {
        const response = await axios.get(`http://localhost:3000/api/employee/department/${id}`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
            }, 
        });
        if (response.data.success) {
            employees = response.data.employees;
        }
    } catch (error) {
        if (error.response && error.response.data.error) {
            alert(error.response.data.error);
        }
    }
    return employees;
};



export const EmployeeButtons = ({ DepId }) => {
    const navigate = useNavigate();

    return (
        <div className="flex space-x-3">
            {/* View Button */}
            <button 
                className="flex items-center px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-md shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition transform hover:scale-105"
                onClick={() => navigate(`/admin-dashboard/employees/${DepId}`)}
            >
                <FaEye className="mr-1 text-lg" />
                View
            </button>

            {/* Edit Button */}
            <button 
                className="flex items-center px-4 py-2 bg-yellow-500 text-white text-sm font-medium rounded-md shadow-md hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:ring-offset-2 transition transform hover:scale-105"
                onClick={() => navigate(`/admin-dashboard/employees/edit/${DepId}`)}
            >
                <FaEdit className="mr-1 text-lg" />
                Edit
            </button>

            {/* Salary Button */}
            <button 
                className="flex items-center px-4 py-2 bg-green-600 text-white text-sm font-medium rounded-md shadow-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition transform hover:scale-105"
                onClick={() => navigate(`/admin-dashboard/employees/salary/${DepId}`)}
            >
                <FaMoneyBillAlt className="mr-1 text-lg" />
                Salary
            </button>

            {/* Leave Button */}
            <button 
                className="flex items-center px-4 py-2 bg-red-600 text-white text-sm font-medium rounded-md shadow-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition transform hover:scale-105"
                onClick={() => navigate(`/admin-dashboard/employees/leaves/${DepId}`)}
            >
                <FaCalendarAlt className="mr-1 text-lg" />
                Leave
            </button>
        </div>
    );
};

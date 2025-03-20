



import React, { useEffect, useState } from "react";
import { fetchDepartments } from "../../utils/EmployeeHelper";
import axios from "axios";
import { useNavigate,useParams } from "react-router-dom";

const Edit = () => {
    const [employee, setEmployee] = useState({
        name: '',
        maritalStatus: '',
        designation:'',
        department:'',
        salary:0,
        recruitmentDate:''



    });
    const [departments, setDepartments] = useState(null)
    const [loading, setLoading] = useState(false); // <-- Add this line
    const {id} = useParams()
    const navigate = useNavigate();

    useEffect(() => {
            const getDepartments = async () => {
                const departments = await fetchDepartments();
                setDepartments(departments);
            };
            getDepartments();
        }, []);

    useEffect(() => {
        const fetchEmployee = async () => {
            setLoading(true);  // Set loading to true when fetching data
            try {
                const responnse = await axios.get(`https://employee-api-azure.vercel.app/api/employee/${id}`, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`,
                    },
                });
                console.log(responnse.data)

                if (responnse.data.success) {
                    const employee = responnse.data.employee
                    setEmployee((prev => ({...prev, 
                        name: employee.userId.name, 
                        maritalStatus: employee.maritalStatus, 
                        designation: employee.designation,
                        department: employee.department,
                        salary: employee.salary,
                        recruitmentDate: employee.recruitmentDate

                       })));
                }
            } catch (error) {
                if (error.response && error.response.data.error) {
                    alert(error.response.data.error);
                }
            } finally {
                setLoading(false);  // Set loading to false after data is fetched
            }
        };

        fetchEmployee();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setEmployee((prevData) => ({ ...prevData, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.put(`https://employee-api-azure.vercel.app/api/employee/${id}`, employee, {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${localStorage.getItem('token')}`
                }
            });

            if (response.data.success) {
                navigate("/admin-dashboard/employees");
            }
        } catch (error) {
            console.error("Error adding employee:", error);
            alert(error.response?.data?.error || "An error occurred while adding the employee.");
        }
    };

    return (
        <>{departments && employee ? (
        <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-6 mt-10">
            <h2 className="text-3xl font-bold text-gray-800 text-center mb-6">Edit Employee</h2>
            <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">
                {/* Name and Email */}
                <div>
                    <label className="block text-gray-700 font-medium">Name</label>
                    <input 
                        type="text" 
                        name="name"
                        value={employee.name}
                        onChange={handleChange}
                        placeholder="Insert Name" 
                        className="w-full p-2 border rounded-md"
                        required 
                    />
                </div>
                


                
        

            
                <div>
                    <label className="block text-gray-700 font-medium">Marital Status</label>
                    <select 
                        name="maritalStatus"
                        onChange={handleChange}
                        value={employee.maritalStatus}
                        className="w-full p-2 border rounded-md"
                        required
                    >
                        <option value="">Select Status</option>
                        <option value="single">Single</option>
                        <option value="married">Married</option>
                    </select>
                </div>

                {/* Designation and Department */}
                <div>
                    <label className="block text-gray-700 font-medium">Designation</label>
                    <input 
                        type="text" 
                        name="designation"
                        onChange={handleChange}
                        value={employee.designation}
                        placeholder="Designation" 
                        className="w-full p-2 border rounded-md" 
                        required
                    />
                </div>
                <div>
                    <label className="block text-gray-700 font-medium">Department</label>
                    <select
                        name="department"                      
                        value={employee.department}
                        onChange={handleChange}
                        className="w-full p-2 border rounded-md"
                        required
                    >
                        <option value="">Select Department</option>
                        {departments.map(dep => (
                          <option key={dep._id} value={dep._id}>{dep.dep_name}</option>  
                        ))}
                    </select>
                </div>

                {/* Salary and Password */}
                <div>
                    <label className="block text-gray-700 font-medium">Salary</label>
                    <input 
                        type="number" 
                        name="salary"
                        onChange={handleChange}
                        value={employee.salary}
                        placeholder="Salary" 
                        className="w-full p-2 border rounded-md" 
                        required
                    />
                </div>
            

                {/* Role and Recruitment Date */}
                
                <div>
                    <label className="block text-gray-700 font-medium">Recruitment Date</label>
                    <input 
                        type="date" 
                        name="recruitmentDate"
                        onChange={handleChange}
                        value={employee.recruitmentDate ? employee.recruitmentDate.split('T')[0] : ''}  
                        className="w-full p-2 border rounded-md" 
                        required
                    />
                </div>

                {/* Submit Button */}
                <div className="col-span-2">
                    <button type="submit" className="w-full bg-blue-600 text-white font-bold py-2 rounded-md hover:bg-blue-700 transition duration-300">
                        Edit Employee
                    </button>
                </div>
            </form>
        </div>
        ) : <div>Loading...</div>}</>
    );
};

export default Edit;




import React, { useEffect, useState } from "react";
import { fetchDepartments, getEmployees } from "../../utils/EmployeeHelper";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const Add = () => {
    const [salary, setSalary] = useState({
        employeeId: null,
        basicSalary: 0,
        allowances:0,
        deductions:0,
        salary:0,
        payDate: null,



    });
    const [departments, setDepartments] = useState(null);
    const [employees, setEmployees] = useState([]);
    const [loading, setLoading] = useState(false); // <-- Add this line
    // const {id} = useParams()
    const navigate = useNavigate();

    useEffect(() => {
            const getDepartments = async () => {
                const departments = await fetchDepartments();
                setDepartments(departments);
            };
            getDepartments();
        }, []);

        const handleDepartment = async (e) => {
            const emps = await getEmployees(e.target.value)
            setEmployees(emps)
        }  

    // useEffect(() => {
    //     const fetchEmployee = async () => {
    //         setLoading(true);  // Set loading to true when fetching data
    //         try {
    //             const responnse = await axios.get(`http://localhost:3000/api/employee/${id}`, {
    //                 headers: {
    //                     Authorization: `Bearer ${localStorage.getItem('token')}`,
    //                 },
    //             });
    //             console.log(responnse.data)

    //             if (responnse.data.success) {
    //                 const employee = responnse.data.employee
    //                 setEmployee((prev => ({...prev, 
    //                     name: employee.userId.name, 
    //                     maritalStatus: employee.maritalStatus, 
    //                     designation: employee.designation,
    //                     department: employee.department,
    //                     salary: employee.salary,
    //                     recruitmentDate: employee.recruitmentDate

    //                    })));
    //             }
    //         } catch (error) {
    //             if (error.response && error.response.data.error) {
    //                 alert(error.response.data.error);
    //             }
    //         } finally {
    //             setLoading(false);  // Set loading to false after data is fetched
    //         }
    //     };

    //     fetchEmployee();
    // }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setSalary((prevData) => ({ ...prevData, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post(`https://employee-api-nu.vercel.app/api/salary/add`, salary, {
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
        <>{departments ? (
        <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-6 mt-10">
            <h2 className="text-3xl font-bold text-gray-800 text-center mb-6">Add Salary</h2>
            <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">
                {/* Department */}
                <div>
                    <label className="block text-gray-700 font-medium">Department</label>
                    <select
                        name="department"                      
                        onChange={handleDepartment}
                        className="w-full p-2 border rounded-md"
                        required
                    >
                        <option value="">Select Department</option>
                        {departments.map(dep => (
                          <option key={dep._id} value={dep._id}>{dep.dep_name}</option>  
                        ))}
                    </select>
                </div>

                        {/* employee*/}
                <div>
                    <label className="block text-gray-700 font-medium">Employee</label>
                    <select
                        name="employeeId"                      
                        onChange={handleChange}
                        className="w-full p-2 border rounded-md"
                        required
                    >
                        <option value="">Select Employee</option>
                        {employees.map(emp => (
                          <option key={emp._id} value={emp._id}>{emp.employeeId}</option>  
                        ))}
                    </select>
                </div>
                


        

                {/* Designation and Department */}

                <div>
                    <label className="block text-gray-700 font-medium">Basic Salary</label>
                    <input 
                        type="number" 
                        name="basicSalary"
                        onChange={handleChange}
                        placeholder="basicSalary" 
                        className="w-full p-2 border rounded-md" 
                        required
                    />
                </div>
                

                {/* Salary and Password */}
                <div>
                    <label className="block text-gray-700 font-medium">Allowances</label>
                    <input 
                        type="number" 
                        name="allowances"
                        onChange={handleChange}
                        placeholder="allowances" 
                        className="w-full p-2 border rounded-md" 
                        required
                    />
                </div>
                <div>
                    <label className="block text-gray-700 font-medium">Deductions</label>
                    <input 
                        type="number" 
                        name="deductions"
                        onChange={handleChange}
                        placeholder="deductions" 
                        className="w-full p-2 border rounded-md" 
                        required
                    />
                </div>
                <div>
                    <label className="block text-gray-700 font-medium">Pay Date</label>
                    <input 
                        type="date" 
                        name="payDate"
                        onChange={handleChange}
                        className="w-full p-2 border rounded-md" 
                        required
                    />
                </div>
            

                

                {/* Submit Button */}
                <div className="col-span-2">
                    <button type="submit" className="w-full bg-blue-600 text-white font-bold py-2 rounded-md hover:bg-blue-700 transition duration-300">
                        Add Salary
                    </button>
                </div>
            </form>
        </div>
        ) : <div>Loading...</div>}</>
    );
};

export default Add;
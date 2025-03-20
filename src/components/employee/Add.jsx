// import React, { useEffect, useState } from "react";
// import { fetchDepartments } from "../../utils/EmployeeHelper";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";

// const Add = () => {
//     const [departments, setDepartments]= useState([])
//     const [formData, setFormData] = useState ({})
//     const navigate = useNavigate()


//     useEffect(() => {
//         const getDepartments = async () => {
//             const departments= await fetchDepartments()
//             setDepartments(departments)
//         }
//         getDepartments();

//     }, []);

//     const handleChange = (e)=> {
//         const {name, value, files } = e.target;
//         if (name === "image"){
//             setFormData((prevData) => ({...prevData, [name] : files[0]}))
//         }else {
//             setFormData ((prevData) => ({...prevData, [name] : value}))
//         }
//     }

//     const handleSubmit = async (e ) => {
//         e.preventDefault()

//         const formDataObj = new FormData()
//         Object.keys(formData).forEach((key) => {
//             formDataObj.append(key, formData[key])
//         } )

//         try {
//             const response = await axios.post("http://localhost:3000/api/employee/add", formDataObj, {
//                 headers: {
//                     // "Authorization": `Bearer ${localStorage.getItem('token')}`
//                     "Authorization": `Bearer ${localStorage.getItem('token')}`


                    
//                 }
//             });
//             if (response.data.success) {
//                 navigate("/admin-dashboard/employees");
//             }
//         } catch (error) {
//             if (error.response && error.response.data.error) {
//                 alert(error.response.data.error);
//             } else {
//                 alert("An error occurred while adding the department.");
//             }
//         }
//     }

//     return (
//         <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-6 mt-10">
//             <h2 className="text-3xl font-bold text-gray-800 text-center mb-6">Add Employee</h2>
//             <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">
//                 {/* Name and Email */}
//                 <div>
//                     <label className="block text-gray-700 font-medium">Name</label>
//                     <input 
//                         type="text" 
//                         name="name"
//                         onChange={handleChange}
//                         placeholder="Insert Name" 
//                         className="w-full p-2 border rounded-md"
//                         required 
//                     />
//                 </div>
//                 <div>
//                     <label className="block text-gray-700 font-medium">Email</label>
//                     <input 
//                         type="email" 
//                         name="email"
//                         onChange={handleChange}
//                         placeholder="Insert Email" 
//                         className="w-full p-2 border rounded-md" 
//                         required
//                     />
//                 </div>

//                 {/* Employee ID and Date of Birth */}
//                 <div>
//                     <label className="block text-gray-700 font-medium">Employee ID</label>
//                     <input 
//                         type="text" 
//                         name="employeeId"
//                         onChange={handleChange}
//                         placeholder="Employee ID" 
//                         className="w-full p-2 border rounded-md" 
//                     />
//                 </div>
//                 <div>
//                     <label className="block text-gray-700 font-medium">Date of Birth</label>
//                     <input 
//                         type="date" 
//                         name="dob"
//                         onChange={handleChange}
//                         placeholder="DOB"
//                         className="w-full p-2 border rounded-md" 
//                     />
//                 </div>

//                 {/* Gender and Marital Status */}
//                 <div>
//                     <label className="block text-gray-700 font-medium">Gender</label>
//                     <select 
//                         name="gender"
//                         onChange={handleChange}
//                         className="w-full p-2 border rounded-md"
//                         required
//                     >
//                         <option value="">Select Gender</option>
//                         <option value="male">Male</option>
//                         <option value="female">Female</option>
//                     </select>
//                 </div>
//                 <div>
//                     <label className="block text-gray-700 font-medium">Marital Status</label>
//                     <select 
//                         name="maritalStatus"
//                         onChange={handleChange}
//                         placeholder="Matrital Status"
//                         className="w-full p-2 border rounded-md"
//                         required
//                     >
//                         <option value="">Select Status</option>
//                         <option value="single">Single</option>
//                         <option value="married">Married</option>
//                     </select>
//                 </div>

//                 {/* Designation and Department */}
//                 <div>
//                     <label className="block text-gray-700 font-medium">Designation</label>
//                     <input 
//                         type="text" 
//                         name="designation"
//                         onChange={handleChange}
//                         placeholder="Designation" 
//                         className="w-full p-2 border rounded-md" 
//                         required
//                     />
//                 </div>
//                 <div>
//                     <label className="block text-gray-700 font-medium">Department</label>
//                     <select
//                     name="department" 
//                     onChange={handleChange}
//                     className="w-full p-2 border rounded-md"
//                     required
//                     >
//                         <option value="">Select Department</option>
//                         {departments.map(dep => (
//                           <option key={dep._id} value={dep._id}>{dep.dep_name}</option>  
//                         ))}
//                     </select>
//                 </div>

//                 {/* Salary and Password */}
//                 <div>
//                     <label className="block text-gray-700 font-medium">Salary</label>
//                     <input 
//                         type="number" 
//                         name="salary"
//                         onChange={handleChange}
//                         placeholder="Salary" 
//                         className="w-full p-2 border rounded-md" 
//                     />
//                 </div>
//                 <div>
//                     <label className="block text-gray-700 font-medium">Password</label>
//                     <input 
//                         type="password" 
//                         name="password"
//                         onChange={handleChange}
//                         placeholder="********" 
//                         className="w-full p-2 border rounded-md" 
//                         required
//                     />
//                 </div>

//                 {/* Role and Upload Image */}
//                 <div>
//                     <label className="block text-gray-700 font-medium">Role</label>
//                     <select 
//                         name="role"
//                         onChange={handleChange}
//                         className="w-full p-2 border rounded-md"
//                         required
//                     >
//                         <option value="">Select Role</option>
//                         <option value="employee">Employee</option>
//                         <option value="admin">Admin</option>
//                     </select>
//                 </div>
//                 <div>
//                     <label className="block text-gray-700 font-medium">Date de Recrutement</label>
//                     <input 
//                         type="date" 
//                         name="recruitmentDate"  // Le nom du champ ici
//                         onChange={handleChange}
//                         placeholder="Sélectionner la Date de Recrutement"
//                         className="w-full p-2 border rounded-md" 
//                     />
//                 </div>

//                 {/* Submit Button */}
//                 <div className="col-span-2">
//                     <button className="w-full bg-blue-600 text-white font-bold py-2 rounded-md hover:bg-blue-700 transition duration-300">
//                         Add Employee
//                     </button>
//                 </div>
//             </form>
//         </div>
//     );
// };

// export default Add;



import React, { useEffect, useState } from "react";
import { fetchDepartments } from "../../utils/EmployeeHelper";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Add = () => {
    const [departments, setDepartments] = useState([]);
    const [formData, setFormData] = useState({});
    const navigate = useNavigate();

    useEffect(() => {
        const getDepartments = async () => {
            const departments = await fetchDepartments();
            setDepartments(departments);
        };
        getDepartments();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post("https://employee-api-nu.vercel.app/api/employee/add", formData, {
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
        <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-6 mt-10">
            <h2 className="text-3xl font-bold text-gray-800 text-center mb-6">Add Employee</h2>
            <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">
                {/* Name and Email */}
                <div>
                    <label className="block text-gray-700 font-medium">Name</label>
                    <input 
                        type="text" 
                        name="name"
                        onChange={handleChange}
                        placeholder="Insert Name" 
                        className="w-full p-2 border rounded-md"
                        required 
                    />
                </div>
                <div>
                    <label className="block text-gray-700 font-medium">Email</label>
                    <input 
                        type="email" 
                        name="email"
                        onChange={handleChange}
                        placeholder="Insert Email" 
                        className="w-full p-2 border rounded-md" 
                        required
                    />
                </div>

                {/* Employee ID and Date of Birth */}
                <div>
                    <label className="block text-gray-700 font-medium">Employee ID</label>
                    <input 
                        type="text" 
                        name="employeeId"
                        onChange={handleChange}
                        placeholder="Employee ID" 
                        className="w-full p-2 border rounded-md" 
                    />
                </div>
                <div>
                    <label className="block text-gray-700 font-medium">Date of Birth</label>
                    <input 
                        type="date" 
                        name="dob"
                        onChange={handleChange}
                        className="w-full p-2 border rounded-md" 
                    />
                </div>

                {/* Gender and Marital Status */}
                <div>
                    <label className="block text-gray-700 font-medium">Gender</label>
                    <select 
                        name="gender"
                        onChange={handleChange}
                        className="w-full p-2 border rounded-md"
                        required
                    >
                        <option value="">Select Gender</option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                    </select>
                </div>
                <div>
                    <label className="block text-gray-700 font-medium">Marital Status</label>
                    <select 
                        name="maritalStatus"
                        onChange={handleChange}
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
                        placeholder="Designation" 
                        className="w-full p-2 border rounded-md" 
                        required
                    />
                </div>
                <div>
                    <label className="block text-gray-700 font-medium">Department</label>
                    <select
                        name="department" 
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
                        placeholder="Salary" 
                        className="w-full p-2 border rounded-md" 
                        required
                    />
                </div>
                <div>
                    <label className="block text-gray-700 font-medium">Password</label>
                    <input 
                        type="password" 
                        name="password"
                        onChange={handleChange}
                        placeholder="********" 
                        className="w-full p-2 border rounded-md" 
                        required
                    />
                </div>

                {/* Role and Recruitment Date */}
                <div>
                    <label className="block text-gray-700 font-medium">Role</label>
                    <select 
                        name="role"
                        onChange={handleChange}
                        className="w-full p-2 border rounded-md"
                        required
                    >
                        <option value="">Select Role</option>
                        <option value="employee">Employee</option>
                        <option value="admin">Admin</option>
                    </select>
                </div>
                <div>
                    <label className="block text-gray-700 font-medium">Recruitment Date</label>
                    <input 
                        type="date" 
                        name="recruitmentDate"
                        onChange={handleChange}
                        className="w-full p-2 border rounded-md" 
                        required
                    />
                </div>

                {/* Submit Button */}
                <div className="col-span-2">
                    <button type="submit" className="w-full bg-blue-600 text-white font-bold py-2 rounded-md hover:bg-blue-700 transition duration-300">
                        Add Employee
                    </button>
                </div>
            </form>
        </div>
    );
};

export default Add;
// import React from "react";

// const AddDepartment = () => {
//     return (
//         <div>
//             <div>
//                 <h3>Add Department</h3>
//                 <from>
//                     <div> 
//                         <label htmlFor="dep_name">Department Name </label>
//                         <input type="text" placeholder="Enter Dep Name"></input>
//                     </div>
//                     <div>
//                         <label htmlFor="description">Description </label>
//                         <textarea name="description" placeholder="Description"></textarea>
//                     </div>
//                     <button> Add Department</button>
//                 </from>
//             </div>
//         </div>
//     )
// }

// export default AddDepartment





import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const AddDepartment = () => {
    const [departmentName, setDepartmentName] = useState({
        dep_name: '',
        description: ''
    });
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setDepartmentName({ ...departmentName, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post("https://employee-api-sepia.vercel.app/api/department/add", departmentName, {
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem('token')}`
                }
            });
            if (response.data.success) {
                navigate("/admin-dashboard/departments");
            }
        } catch (error) {
            if (error.response && error.response.data.error) {
                alert(error.response.data.error);
            } else {
                alert("An error occurred while adding the department.");
            }
        }
    };

    return (
        <div className="max-w-lg mx-auto bg-white shadow-lg rounded-lg p-6 mt-10">
            <h3 className="text-3xl font-bold text-center text-gray-800 mb-6">
                Add Department
            </h3>
            <form onSubmit={handleSubmit} className="space-y-4">
                {/* Department Name */}
                <div>
                    <label htmlFor="dep_name" className="block text-gray-700 font-semibold mb-1">
                        Department Name
                    </label>
                    <input
                        type="text"
                        id="dep_name"
                        name="dep_name"
                        placeholder="Enter department name"
                        value={departmentName.dep_name}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
                        required
                    />
                </div>

                {/* Description */}
                <div>
                    <label htmlFor="description" className="block text-gray-700 font-semibold mb-1">
                        Description
                    </label>
                    <textarea
                        id="description"
                        name="description"
                        placeholder="Enter department description"
                        value={departmentName.description}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
                        rows="4"
                        required
                    />
                </div>

                {/* Submit Button */}
                <button
                    type="submit"
                    className="w-full bg-teal-600 text-white font-semibold py-2 rounded-lg shadow-md hover:bg-teal-700 transition duration-300"
                >
                    + Add Department
                </button>
            </form>
        </div>
    );
};

export default AddDepartment;


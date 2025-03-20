import React, { useEffect, useState } from "react";
import {useNavigate, useParams} from 'react-router-dom'
import axios from 'axios'

const EditDepartment = () => {
    const {id}= useParams()
    const [department, setDepartment] = useState([]);
    const [depLoading, setDeploading ] = useState(false);
    const navigate = useNavigate()

    useEffect(() => {
        const fetchDepartments = async () => {
            setDeploading(true)
            try {
                const responnse = await axios.get(`http://localhost:3000/api/department/${id}`,{
                  headers: {
                    Authorization : `Bearer ${localStorage.getItem('token')}`
                  }  
                })
                if(responnse.data.success){
                    setDepartment(responnse.data.department)
                
                }
            } catch(error) {
                if (error.response && error.response.data.error) {
                    alert(error.response.data.error);
                }
            } finally{
                setDeploading(false)
            }
        };
        fetchDepartments();

    }, []);
    const handleChange = (e) => {
        const { name, value } = e.target;
        setDepartment({ ...department, [name]: value });
    };


    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.put(`http://localhost:3000/api/department/${id}`, department, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
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
        <>{depLoading ? <div>Loading ... </div> :  
        <div className="max-w-lg mx-auto bg-white shadow-lg rounded-lg p-6 mt-10">
            <h3 className="text-3xl font-bold text-center text-gray-800 mb-6">
                Edit Department
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
                        value={department.dep_name}
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
                        value={department.description}
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
                    + Edit Department
                </button>
            </form>
        </div>
        }</>
    )
}

export default EditDepartment  
import React, { useEffect, useState } from "react";

import { Link } from "react-router-dom";
import DataTable from "react-data-table-component"
import { columns, DepartmentButtons } from "../../utils/DepartmentHelper";
import axios from "axios";


// const DepartmentList = () => {
//     return (
//         <div>
//             <div className="text-center">
//                 <h3 className="text-2x1 font-bold"> Manage Departments </h3>
//             </div>
//             <div className="flex justify-between items-center">
//                 <input type="text" placeholder="Search By Dep Name" className="px-4 py-0.5" />
//                 <Link to="/admin-dashboard/add-department" className="px-4 py-1 bg-teal-600">Add-New-Department</Link>
//             </div>
//         </div>
//     )
// }
// export default DepartmentList


const DepartmentList = () => {
    const [departments, setDepartments] = useState([]);
    const [deploading, setDeploading] = useState(false)
    const [filteredDepartments, setFilteredDepartments]= useState([])


    // const onDepartmentDelete = async (id) => {
    //     const data=  departments.filter(dep => dep._id !== id)
    //     setDepartments(data)
    // };
    const onDepartmentDelete = async (id) => {
        setDepartments(prev => prev.filter(dep => dep._id !== id));
        setFilteredDepartments(prev => prev.filter(dep => dep._id !== id)); 
    };
    

    useEffect(() => {
        const fetchDepartments = async () => {
            setDeploading(true)
            try {
                const responnse = await axios.get('https://employee-api-nu.vercel.app/api/department',{
                  headers: {
                    "Authorization" : `Bearer ${localStorage.getItem('token')}`
                  }  
                })
                if(responnse.data.success){
                  let sno = 1;   
                //   console.log(responnse.data)
                    const data = await responnse.data.departments.map((dep) => (
                        {
                        _id: dep._id,
                        sno: sno++,
                        dep_name: dep.dep_name,
                        action: (<DepartmentButtons DepId= {dep._id} onDepartmentDelete= {onDepartmentDelete} />),
                        }
                    ));
                    setDepartments(data);
                    setFilteredDepartments(data);
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

   const filterDepartments = (e) => {
    const records = departments.filter((dep) => 
        dep.dep_name.toLowerCase().includes(e.target.value.toLowerCase()))
        setFilteredDepartments(records)


    
   }


    return (
        <>{deploading ? <div> Loading ...</div> : 
        <div className="max-w-3xl mx-auto bg-white shadow-lg rounded-lg p-6">
            <div className="text-center mb-6">
                <h3 className="text-3xl font-bold text-gray-800">Manage Departments</h3>
            </div>
            <div className="flex justify-between items-center mb-4">
                <input 
                    type="text" 
                    placeholder="Search by department name..." 
                    className="w-full max-w-md px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
                    onChange={filterDepartments}
                />
                <Link 
                    to="/admin-dashboard/add-department" 
                    className="ml-4 px-5 py-2 bg-teal-600 text-white font-semibold rounded-lg shadow-md hover:bg-teal-700 transition duration-300"
                >
                    + Add Department
                </Link>
            </div>
            <div className="mt-8 mx-auto max-w-6xl bg-white shadow-lg rounded-lg p-6">
                {/* Titre de la table */}
                <h2 className="text-2xl font-bold text-gray-800 mb-4">Department List</h2>

                {/* Table Container */}
                <div className="overflow-x-auto rounded-lg border border-gray-200 shadow-sm">
                    <DataTable 
                        columns={columns} 
                        data={filteredDepartments.length > 0 ? filteredDepartments : departments} 
                        pagination 
                        className="w-full text-gray-700"
                    />
                </div>
            </div>
        </div>
        }</>
    );
};

export default DepartmentList;

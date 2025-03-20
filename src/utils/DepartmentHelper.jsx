// import { useNavigate } from "react-router-dom";
// import axios from "axios";



// export const columns = [
//     {
//         name: "S No", 
//         selector: (row) => row.sno
//     },
//     {
//         name: "Department Name ", 
//         selector: (row) => row.dep_name
//     },
//     {
//         name: "Action", 
//         selector: (row) => row.action
//     },
// ]

// export const DepartmentButtons = ({DepId , onDepartmentDelete}) => {
//     const navigate = useNavigate()

//     const handleDelete = async (id) => {
//         const confirm = window.confirm("Do you want to delete");
//         if (confirm){
//         try {
            

            
//             const responnse = await axios.delete(`http://localhost:3000/api/department/${id}`,{
//               headers: {
//                 "Authorization" : `Bearer ${localStorage.getItem('token')}`
//               }  
//             });
            
//             if(responnse.data.success){
//                 onDepartmentDelete(id)
//                 // setDepartment(responnse.data.department)
            
//             }
//         } catch(error) {
//             if (error.response && error.response.data.error) {
//                 alert(error.response.data.error);
//             }
//         }
//     }

//     };
    
//     return (
//         <div className="flex space-x-4">
//             {/* Edit Button */}
//             <button className="px-4 py-2 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition duration-300"
//             onClick={() => navigate(`/admin-dashboard/department/${DepId}`)}
//             >
//                 ✏️ Edit
//             </button>

//             {/* Delete Button */}
//             <button className="px-4 py-2 bg-red-600 text-white font-semibold rounded-lg shadow-md hover:bg-red-700 transition duration-300"
//             onClick={() => handleDelete(DepId)}
//             >
//                 🗑️ Delete
//             </button>
//         </div>
//     );
// };

import { useNavigate } from "react-router-dom";
import axios from "axios"; // Ensure axios is imported

export const columns = [
    {
        name: "S No", 
        selector: (row) => row.sno
    },
    {
        name: "Department Name ", 
        selector: (row) => row.dep_name,
        sortable: true 
    },
    {
        name: "Action", 
        selector: (row) => row.action
    },
];

export const DepartmentButtons = ({ DepId, onDepartmentDelete }) => {
    const navigate = useNavigate();

    const handleDelete = async (id) => {
        const confirm = window.confirm("Do You Want To Delete")
        if(confirm){
        try {

            const responnse = await axios.delete(`http://localhost:3000/api/department/${id}`,{
              headers: {
                // Authorization : `Bearer ${localStorage.getItem('token')}`
                "Authorization": `Bearer ${localStorage.getItem('token')}`

              }  
            });
            if (responnse.status === 200 && responnse.data.success) {
                onDepartmentDelete(id);
            }
            }catch(error) {
                if (error.response && error.response.data.error) {
                alert(error.response.data.error);
                }
            }

        }
    };
    

    return (
        <div className="flex space-x-4">
            {/* Edit Button */}
            <button 
                className="px-4 py-2 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition duration-300"
                onClick={() => navigate(`/admin-dashboard/department/${DepId}`)}
            >
                ✏️ Edit
            </button>

            {/* Delete Button */}
            <button 
                className="px-4 py-2 bg-red-600 text-white font-semibold rounded-lg shadow-md hover:bg-red-700 transition duration-300"
                onClick={() => handleDelete(DepId)} // Fixed the undefined `Id` issue
            >
                🗑️ Delete
            </button>
        </div>
    );
};

// import React, { useState, useEffect } from "react";
// import { Link, useParams } from "react-router-dom";
// import axios from "axios";
// import { useAuth } from "../../context/authContext";

// const List = () => {
//     const { user } = useAuth();
//     const [leaves, setLeaves] = useState([]);
//     const [searchTerm, setSearchTerm] = useState("");
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState(null);
//     const { id } = useParams();

//     useEffect(() => {
//         const fetchLeaves = async () => {
//             if (!user || !user._id) return;
    
//             try {
//                 setLoading(true);
//                 setError(null);
    
//                 const token = localStorage.getItem("token");
//                 if (!token) throw new Error("Token not found. Please log in again.");
    
//                 // For employees: Fetch their own leave data
//                 const response = await axios.get(
//                     user.role === "employee"
//                         ? `http://localhost:3000/api/leave/${user._id}`  // Employee-specific
//                         : `http://localhost:3000/api/leave/`,         // Admin gets all leaves
//                     {
//                         headers: { Authorization: `Bearer ${token}` },
//                     }
//                 );
    
//                 console.log("API Response:", response.data); // ✅ Verify if status is returned correctly
//                 setLeaves(response.data.success ? response.data.leaves || [] : []);
//             } catch (error) {
//                 console.error("Error fetching leaves:", error);
//                 setError("Failed to fetch leaves. Please try again.");
//             } finally {
//                 setLoading(false);
//             }
//         };
    
//         if (user && user._id) fetchLeaves();
//     }, [user, id]); // Add `id` in dependencies if necessary

//     const handleFilter = (event) => setSearchTerm(event.target.value);
//     const formatDate = (date) => (date ? new Date(date).toLocaleDateString() : "N/A");

//     const filteredLeaves = leaves.filter((leave) =>
//         leave.leaveType?.toLowerCase().includes(searchTerm.toLowerCase())
//     );
//     if(!leaves) {
//         return <div>Loading </div>
//     }

//     return (
//         <div className="max-w-5xl mx-auto bg-white shadow-md rounded-lg p-6 mt-6">
//             <h2 className="text-2xl font-semibold text-center text-gray-800 mb-6">Manage Leaves</h2>

//             <div className="flex flex-col sm:flex-row justify-between items-center mb-4 gap-4">
//                 <input
//                     type="text"
//                     placeholder="Search by leave type..."
//                     className="w-full sm:w-96 px-4 py-2 border rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500"
//                     onChange={handleFilter}
//                     value={searchTerm}
//                 />
//                 {user.role === "employee" && (
//                     <Link
//                         to="/employee-dashboard/add-leave"
//                         className="px-5 py-2 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 transition"
//                     >
//                         + Add Leave
//                     </Link>
//                 )}
//             </div>

//             {error && <p className="text-center text-red-500">{error}</p>}

//             {loading ? (
//                 <p className="text-center text-gray-500">Loading leaves...</p>
//             ) : leaves.length === 0 ? (
//                 <p className="text-center text-gray-500">No leaves found.</p>
//             ) : (
//                 <div className="overflow-x-auto">
//                     <table className="w-full border-collapse bg-white shadow rounded-lg">
//                         <thead className="bg-gray-100 border-b">
//                             <tr>
//                                 {["#", "Type", "From", "To", "Reason", "Applied", "Status"].map((header) => (
//                                     <th key={header} className="px-4 py-3 text-left font-semibold">{header}</th>
//                                 ))}
//                             </tr>
//                         </thead>
//                         <tbody>
//                             {filteredLeaves.map((leave, index) => {
//                                 console.log("Leave Object:", leave); // ✅ Vérifiez si leave.status est bien défini
//                                 return (
//                                     <tr key={leave._id} className="border-b hover:bg-gray-50">
//                                         <td className="px-4 py-3">{index + 1}</td>
//                                         <td className="px-4 py-3">{leave.leaveType || "N/A"}</td>
//                                         <td className="px-4 py-3">{formatDate(leave.startDate)}</td>
//                                         <td className="px-4 py-3">{formatDate(leave.endDate)}</td>
//                                         <td className="px-4 py-3 truncate max-w-xs">{leave.reason || "N/A"}</td>
//                                         <td className="px-4 py-3">{formatDate(leave.appliedDate)}</td>
//                                         <td className={`px-4 py-3 font-semibold ${leave.status === "Approved" ? "text-green-600" : leave.status === "Pending" ? "text-yellow-600" : "text-red-600"}`}>
//                                             {leave.status || "Pending"} {/* ✅ Valeur par défaut */}
//                                         </td>
//                                     </tr>
//                                 );
//                             })}
//                         </tbody>
//                     </table>
//                 </div>
//             )}
//         </div>
//     );
// };

// export default List;








import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../../context/authContext";

const List = () => {
    const { user } = useAuth();
    const { id } = useParams(); // Récupère l'ID de l'employé dans l'URL (utile pour admin)
    const [leaves, setLeaves] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchLeaves = async () => {
            if (!user || !user._id) return;

            try {
                setLoading(true);
                setError(null);

                const token = localStorage.getItem("token");
                if (!token) throw new Error("Token non trouvé. Veuillez vous reconnecter.");

                // Déterminer l'URL correcte en fonction du rôle et du contexte
                let url;
                if (user.role === "employee") {
                    url = `https://employee-api-nu.vercel.app/api/leave/${user._id}`; // Employé : ses propres congés
                } else if (user.role === "admin" && id) {
                    url = `https://employee-api-nu.vercel.app/api/leave/${id}`; // Admin : congés d'un employé spécifique
                } else {
                    url = "https://employee-api-nu.vercel.app/api/leave/"; // Admin : tous les congés
                }

                const response = await axios.get(url, {
                    headers: { Authorization: `Bearer ${token}` },
                });

                setLeaves(response.data.success ? response.data.leaves || [] : []);
            } catch (error) {
                console.error("Erreur lors de la récupération des congés:", error);
                setError("Échec de récupération des congés. Réessayez.");
            } finally {
                setLoading(false);
            }
        };

        fetchLeaves();
    }, [user, id]); // Ajout de `id` pour refetch en cas de changement

    const handleFilter = (event) => setSearchTerm(event.target.value);
    const formatDate = (date) => (date ? new Date(date).toLocaleDateString() : "N/A");

    const filteredLeaves = leaves.filter((leave) =>
        leave.leaveType?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="max-w-5xl mx-auto bg-white shadow-md rounded-lg p-6 mt-6">
            <h2 className="text-2xl font-semibold text-center text-gray-800 mb-6">
                {user?.role === "admin" && id ? "Leaves of Employee" : "Manage Leaves"}
            </h2>

            <div className="flex flex-col sm:flex-row justify-between items-center mb-4 gap-4">
                <input
                    type="text"
                    placeholder="Search by leave type..."
                    className="w-full sm:w-96 px-4 py-2 border rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500"
                    onChange={handleFilter}
                    value={searchTerm}
                />
                {user?.role === "employee" && (
                    <Link
                        to="/employee-dashboard/add-leave"
                        className="px-5 py-2 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 transition"
                    >
                        + Add Leave
                    </Link>
                )}
            </div>

            {error && <p className="text-center text-red-500">{error}</p>}

            {loading ? (
                <p className="text-center text-gray-500">Loading leaves...</p>
            ) : leaves.length === 0 ? (
                <p className="text-center text-gray-500">No leaves found.</p>
            ) : (
                <div className="overflow-x-auto">
                    <table className="w-full border-collapse bg-white shadow rounded-lg">
                        <thead className="bg-gray-100 border-b">
                            <tr>
                                {["#", "Type", "From", "To", "Reason", "Applied", "Status"].map((header) => (
                                    <th key={header} className="px-4 py-3 text-left font-semibold">{header}</th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {filteredLeaves.map((leave, index) => (
                                <tr key={leave._id} className="border-b hover:bg-gray-50">
                                    <td className="px-4 py-3">{index + 1}</td>
                                    <td className="px-4 py-3">{leave.leaveType || "N/A"}</td>
                                    <td className="px-4 py-3">{formatDate(leave.startDate)}</td>
                                    <td className="px-4 py-3">{formatDate(leave.endDate)}</td>
                                    <td className="px-4 py-3 truncate max-w-xs">{leave.reason || "N/A"}</td>
                                    <td className="px-4 py-3">{formatDate(leave.appliedDate)}</td>
                                    <td className={`px-4 py-3 font-semibold ${
                                        leave.status === "Approved" ? "text-green-600" :
                                        leave.status === "Pending" ? "text-yellow-600" : "text-red-600"
                                    }`}>
                                        {leave.status || "Pending"}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default List;


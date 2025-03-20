import axios from "axios";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const View = () => {
  const [salaries, setSalaries] = useState([]);
  const [filteredSalaries, setFilteredSalaries] = useState([]);
  const [loading, setLoading] = useState(true);
  const { id } = useParams();

  const fetchSalaries = async () => {
    if (!id) {
      console.error("Erreur: ID invalide.");
      return;
    }

    try {
      console.log(`Fetching salaries for ID: ${id}`);
      const token = localStorage.getItem("token");

      if (!token) {
        throw new Error("Token non trouvé. Veuillez vous reconnecter.");
      }

      const response = await axios.get(`https://employee-api-azure.vercel.app/api/salary/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (response.data.success) {
        setSalaries(response.data.salary);
        setFilteredSalaries(response.data.salary);
      } else {
        throw new Error("Données non disponibles.");
      }
    } catch (error) {
      console.error("Erreur lors de la récupération des salaires:", error);
      alert(error.response?.data?.message || error.message || "Erreur inconnue");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (id) fetchSalaries();
  }, [id]);

  const handleFilterSalaries = (q) => {
    if (!q) {
      setFilteredSalaries(salaries);
      return;
    }

    const filteredRecords = salaries.filter((salary) =>
      salary.employeeId?.toString().toLowerCase().includes(q.toLowerCase())
    );

    setFilteredSalaries(filteredRecords);
  };

  return (
    <div className="max-w-5xl mx-auto p-6 bg-white shadow-lg rounded-lg">
      {/* Titre */}
      <div className="text-center mb-6">
        <h2 className="text-3xl font-bold text-gray-700 border-b-2 border-blue-500 inline-block pb-1">
        Salary History
        </h2>
      </div>

      {/* Barre de recherche */}
      <div className="flex justify-end mb-4">
        <input
          type="text"
          placeholder="Rechercher par ID employé..."
          className="border rounded-lg py-2 px-4 w-80 shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
          onChange={(e) => handleFilterSalaries(e.target.value)}
        />
      </div>

      {/* Affichage du chargement */}
      {loading ? (
        <div className="flex justify-center items-center">
          <svg className="animate-spin h-8 w-8 text-blue-600" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"></path>
          </svg>
        </div>
      ) : filteredSalaries.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="w-full border-collapse bg-white shadow-md rounded-lg">
            <thead className="text-xs text-gray-700 uppercase bg-blue-100 border-b">
              <tr>
                {["#", "Emp ID", "Salaire", "Indemnités", "Déductions", "Total", "Date de Paiement"].map((header) => (
                  <th key={header} className="px-6 py-3 text-left font-semibold">{header}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filteredSalaries.map((salary, index) => (
                <tr key={salary._id} className="border-b hover:bg-gray-50 transition duration-200">
                  <td className="px-6 py-3">{index + 1}</td>
                  <td className="px-6 py-3">{salary.employeeId.employeeId}</td>
                  <td className="px-6 py-3">{salary.basicSalary} €</td>
                  <td className="px-6 py-3">{salary.allowances} €</td>
                  <td className="px-6 py-3">{salary.deductions} €</td>
                  <td className="px-6 py-3 font-bold text-green-600">{salary.netSalary} €</td>
                  <td className="px-6 py-3">{salary.payDate ? new Date(salary.payDate).toLocaleDateString() : "N/A"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="text-center text-gray-500">No salary found.</div>
      )}
    </div>
  );
};

export default View;

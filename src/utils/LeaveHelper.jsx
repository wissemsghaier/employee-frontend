import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FaEye, } from "react-icons/fa";

export const columns = [
    {
        name: "S No", 
        selector: (row) => row.sno,
        width:"40px"
    },
    {
        name: "Emp ID", 
        selector: (row) => row.employeeId,
        sortable: true,
        width:"130px",
    },
    {
        name: "Name", 
        selector: (row) => row.name,
        sortable: true,
        width:"150px",
    },
    {
        name: "Leave Type", 
        selector: (row) => row.leaveType,
        sortable: true,
        width:"130px",
    },
    {
        name: "Department", 
        selector: (row) => row.department,
        sortable: true,
        width:"140px",
    },
    {
        name: "Days", 
        selector: (row) => row.days,
        sortable: true,
        width:"90px",
    },
    {
        name: "Status", 
        selector: (row) => row.status,
        sortable: true,
        width:"100px",
    },
    {
        name: "Action", 
        selector: (row) => <LeaveButtons id={row._id} /> // Ensure `_id` is the correct field name
    },
];

export const LeaveButtons = ({ id }) => {  // Use `id` instead of `Id`
    const navigate = useNavigate();
    const handleView = () => {
        navigate(`/admin-dashboard/leaves/${id}`);
    };

    return (
        <div className="d-flex justify-content-around">
            <button variant="primary" size="sm" onClick={handleView}>
                <FaEye /> View
            </button>
        </div>
    );
};
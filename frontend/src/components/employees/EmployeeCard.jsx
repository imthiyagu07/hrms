import useEmployeeStore from "../../store/employeeStore"
import EditEmployeeModal from "./EditEmployeeModal";
import { useState } from "react";

const EmployeeCard = ({employee}) => {
  const {deleteEmployee} = useEmployeeStore();
  const [showEdit, setShowEdit] = useState(false);
  const handleDelete = () => {
    if (!confirm("Delete employee?")) return;
    deleteEmployee(employee.id);
  };
  return (
    <div className="bg-neutral-800 p-4 max-w-sm rounded-xl border border-neutral-700">
      {showEdit && (<EditEmployeeModal employee={employee} onClose={() => setShowEdit(false)} />)}
      <h2 className="text-xl font-bold">{employee.firstName} {employee.lastName}</h2>
      <p className="text-neutral-400">{employee.email}</p>
      <p className="text-neutral-400">{employee.phone || "No phone"}</p>
      <div className="mt-4 flex gap-3">
        <button onClick={() => setShowEdit(true)} className="bg-yellow-500 cursor-pointer px-3 py-1 rounded text-black">Edit</button>
        <button onClick={handleDelete} className="bg-red-600 cursor-pointer px-3 py-1 rounded text-white">Delete</button>
      </div>
    </div>
  )
}

export default EmployeeCard
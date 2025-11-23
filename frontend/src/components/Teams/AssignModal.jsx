import { useEffect, useState, useMemo } from "react";
import useEmployeeStore from "../../store/employeeStore";
import useTeamStore from "../../store/teamStore";

const AssignModal = ({ team, close }) => {
  const { employees, fetchEmployees } = useEmployeeStore();
  const { assignEmployee, unassignEmployee } = useTeamStore();

  useEffect(() => {
    fetchEmployees();
  }, [fetchEmployees]);

  const initialSelected = useMemo(() => {
    return team.Employees?.map((e) => e.id) || [];
  }, [team]);
  
  const [selected, setSelected] = useState(initialSelected);
  const toggleEmployee = (empId) => {
    const isSelected = selected.includes(empId);
    if (isSelected) {
      unassignEmployee(team.id, empId);
      setSelected(selected.filter((id) => id !== empId));
    } else {
      assignEmployee(team.id, empId);
      setSelected([...selected, empId]);
    }
  };
  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center p-4">
      <div className="bg-neutral-900 text-white p-6 rounded-xl w-[450px]">
        <h2 className="text-2xl mb-4">Assign Employees — <span className="text-blue-400">{team.name}</span></h2>
        <div className="max-h-60 overflow-y-auto space-y-3 bg-neutral-800 p-3 rounded">
          {employees.map((emp) => (
            <label
              key={emp.id}
              className="flex items-center gap-2 cursor-pointer"
            >
              <input
                type="checkbox"
                className="w-4 h-4"
                checked={selected.includes(emp.id)}
                onChange={() => toggleEmployee(emp.id)}
              />
              {emp.firstName} {emp.lastName}
            </label>
          ))}
        </div>
        <button onClick={close} className="mt-4 w-full bg-blue-600 hover:bg-blue-700 py-2 rounded"
        >
          Close
        </button>
      </div>
    </div>
  );
};
export default AssignModal;

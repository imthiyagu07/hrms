import { useEffect, useState } from "react";
import useEmployeeStore from "../store/employeeStore";
import EmployeeCard from "../components/employees/EmployeeCard";
import PageLoader from "../components/PageLoader";
import EmployeeModel from "../components/employees/EmployeeModel";

const EmployeesPage = () => {
  const { employees, isLoading, fetchEmployees, error } = useEmployeeStore();
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    fetchEmployees();
  }, [fetchEmployees]);

  if (isLoading) return <PageLoader />

  return (
    <main className="text-white">
      {showModal && <EmployeeModel onClose={() => setShowModal(false)} />}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-semibold">Employees</h1>
        <button onClick={() => setShowModal(true)} className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded">+ Add Employee</button>
      </div>
      {error && <p className="text-red-600 bg-neutral-900 border border-neutral-700 text-center py-1.5 rounded-md mb-5">{error}</p>}
      {employees.length > 0 ? (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {employees.map((emp) => (
            <EmployeeCard key={emp.id} employee={emp} />
          ))}
        </div>
      ) : (
        <div className="text-center mt-20">
          <h1 className="text-neutral-400 text-2xl">No employees found</h1>
        </div>
      )}
    </main>
  );
};

export default EmployeesPage;

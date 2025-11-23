import useEmployeeStore from "../../store/employeeStore";
import { useState } from "react";

const EmployeeModel = ({ onClose }) => {
  const { createEmployee } = useEmployeeStore();
  const [formData, setFormData] = useState({firstName: "",lastName: "",email: "",phone: ""});
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    createEmployee(formData);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
      <div className="bg-neutral-900 p-6 rounded-xl w-[400px] text-white">
        <h2 className="text-2xl mb-4 font-semibold">Add Employee</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            name="firstName"
            placeholder="First Name"
            value={formData.firstName}
            className="w-full p-2 rounded bg-neutral-800 outline-none"
            onChange={handleChange}
          />
          <input
            name="lastName"
            placeholder="Last Name"
            value={formData.lastName}
            className="w-full p-2 rounded bg-neutral-800 outline-none"
            onChange={handleChange}
          />
          <input
            name="email"
            placeholder="Email"
            value={formData.email}
            className="w-full p-2 rounded bg-neutral-800 outline-none"
            onChange={handleChange}
          />
          <input
            name="phone"
            placeholder="Phone (Optional)"
            value={formData.phone}
            className="w-full p-2 rounded bg-neutral-800 outline-none"
            onChange={handleChange}
          />
          <button type="submit" className="w-full cursor-pointer bg-blue-600 hover:bg-blue-700 py-2 rounded mt-4">Create</button>
          <button type="button" onClick={onClose} className="w-full cursor-pointer bg-neutral-700 hover:bg-neutral-600 py-2 rounded mt-2">Cancel</button>
        </form>
      </div>
    </div>
  );
};

export default EmployeeModel;

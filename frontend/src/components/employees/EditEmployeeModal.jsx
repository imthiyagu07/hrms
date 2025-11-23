import { useState } from "react";
import useEmployeeStore from "../../store/employeeStore";

const EditEmployeeModal = ({ employee, onClose }) => {
  const { updateEmployee } = useEmployeeStore();
  const [formData, setFormData] = useState({
    firstName: employee.firstName,
    lastName: employee.lastName,
    email: employee.email,
    phone: employee.phone || "",
  });
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    updateEmployee(employee.id, formData);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
      <div className="bg-neutral-900 p-6 rounded-xl w-[400px] text-white">
        <h2 className="text-2xl mb-4 font-semibold">Edit Employee</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            name="firstName"
            placeholder="First Name"
            value={formData.firstName}
            onChange={handleChange}
            className="w-full p-2 rounded bg-neutral-800 outline-none"
          />
          <input
            name="lastName"
            placeholder="Last Name"
            value={formData.lastName}
            onChange={handleChange}
            className="w-full p-2 rounded bg-neutral-800 outline-none"
          />
          <input
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            className="w-full p-2 rounded bg-neutral-800 outline-none"
          />
          <input
            name="phone"
            placeholder="Phone (Optional)"
            value={formData.phone}
            onChange={handleChange}
            className="w-full p-2 rounded bg-neutral-800 outline-none"
          />
          <button type="submit" className="w-full cursor-pointer bg-yellow-600 hover:bg-yellow-700 py-2 rounded mt-4">Save Changes</button>
          <button type="button" onClick={onClose} className="w-full cursor-pointer bg-neutral-700 hover:bg-neutral-600 py-2 rounded mt-2">Cancel</button>
        </form>
      </div>
    </div>
  );
};

export default EditEmployeeModal;

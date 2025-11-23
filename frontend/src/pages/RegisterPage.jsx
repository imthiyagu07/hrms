import useAuthStore from "../store/authStore";
import { useState } from "react";

const RegisterPage = () => {
    const [formData, setFormData] = useState({ orgName: "", name: "", email: "", password: "" });
    const {register, isRegsiter, error} = useAuthStore();
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        register(formData);
    };
    return (
    <div className="min-h-screen flex items-center justify-center bg-black">
      <div className="w-full max-w-sm p-8 bg-neutral-800 border border-neutral-700 text-white rounded-lg">
        <h2 className="text-3xl font-bold mb-2">Register Organisation</h2>
        <p className="mb-5">Create a new account</p>

        {error && <p className="text-red-600 bg-neutral-900 border border-neutral-700 text-center py-1.5 rounded-md mb-5">{error}</p>}

        <form onSubmit={handleSubmit} className="space-y-5">
          <input
            type="text"
            name="orgName"
            placeholder="Organisation Name"
            className="w-full p-2 text-[15px] rounded outline-none bg-neutral-700"
            value={formData.orgName}
            onChange={handleChange}
            required
          />

          <input
            type="text"
            name="name"
            placeholder="Your Name"
            className="w-full p-2 text-[15px] rounded outline-none bg-neutral-700"
            value={formData.name}
            onChange={handleChange}
            required
          />

          <input
            type="email"
            name="email"
            placeholder="Email"
            className="w-full p-2 text-[15px] rounded outline-none bg-neutral-700"
            value={formData.email}
            onChange={handleChange}
            required
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            className="w-full p-2 text-[15px] rounded outline-none bg-neutral-700"
            value={formData.password}
            onChange={handleChange}
            required
          /> 
          {/* todo: hide and show password */}

          <button className="w-full p-2 bg-black/50 hover:bg-black cursor-pointer text-white font-bold rounded" disabled={isRegsiter}>
            {isRegsiter ? "Please wait..." : "Register"}
          </button>
        </form>

        <p className="text-center mt-5 text-neutral-400">
          Already have an account?{" "}
          <a href="/login" className="text-white">
            Login
          </a>
        </p>
      </div>
    </div>
  );
}

export default RegisterPage
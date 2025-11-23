import useAuthStore from "../store/authStore";
import { useState } from "react";

const LoginPage = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const { login, isLogin, error } = useAuthStore();

  const handleSubmit = (e) => {
    e.preventDefault();
    login(formData);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black">
      <div className="w-full max-w-sm p-8 bg-neutral-800 border border-neutral-700 text-white rounded-lg">
        <h2 className="text-3xl font-bold mb-2">Welcome Back</h2>
        <p className="mb-7">Login to access your account</p>

        {error && <p className="text-red-600 bg-neutral-900 border border-neutral-700 text-center py-1.5 rounded-md mb-5">{error}</p>}

        <form onSubmit={handleSubmit} className="space-y-7">
          <input
            type="email"
            placeholder="Email"
            className="w-full p-2 text-[15px] rounded outline-none bg-neutral-700"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            required
          />

          <input
            type="password"
            placeholder="Password"
            className="w-full p-2 text-[15px] rounded outline-none bg-neutral-700"
            value={formData.password}
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            required
          />
          {/* todo: hide and show password */}

          <button className="w-full p-2 bg-white/50 hover:bg-white cursor-pointer text-black font-bold rounded" disabled={isLogin}>
            {isLogin ? "Please wait..." : "Login"}
          </button>
        </form>

        <p className="text-center mt-5 text-neutral-400">
          Don’t have an account?{" "}
          <a href="/register" className="text-white">
            Register
          </a>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;

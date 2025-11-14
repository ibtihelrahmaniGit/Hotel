import React, { useState } from "react";
import axios from "axios";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/authContext";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [visible, setVisible] = useState(false);
  const [error, setError] = useState(null);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:5000/api/auth/login", {
        email,
        password,
      });

      if (response.data.success) {
        login(response.data.user);
        localStorage.setItem("token", response.data.token);
        navigate("/admin-dashboard");
      }
    } catch (error) {
      setError(error.response?.data?.error || "Server Error");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-6 bg-white shadow-md rounded-lg">
        <h1 className="text-3xl font-bold text-center text-gray-900">Connexion</h1>
        <h2 className="text-2xl font-semibold text-center text-gray-700">Login</h2>
        {error && <p className="text-red-500 text-center">{error}</p>}
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="email"
              className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-md focus:ring-[6A5ACD] focus:border-[6A5ACD]"
              placeholder="Enter Email"
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <div className="relative">
              <input
                type={visible ? "text" : "password"}
                id="password"
                name="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="current-password"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-[6A5ACD] focus:border-[6A5ACD]"
                placeholder="******"
              />
              <button
                type="button"
                className="absolute right-3 top-3 text-gray-500 focus:outline-none"
                onClick={() => setVisible(!visible)}
              >
                {visible ? <AiOutlineEye size={20} /> : <AiOutlineEyeInvisible size={20} />}
              </button>
            </div>
          </div>
          <button
            type="submit"
            className="w-full px-4 py-2 text-white rounded-md"
            style={{ backgroundColor: "#6A5ACD" }}
            onMouseOver={(e) => (e.currentTarget.style.backgroundColor = "#5B4FCF")}
            onMouseOut={(e) => (e.currentTarget.style.backgroundColor = "#6A5ACD")}
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;

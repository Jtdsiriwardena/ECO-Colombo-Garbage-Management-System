import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import login_back from '../assets/images/login_back.jpg';

const UserLogin = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post("http://localhost:5000/api/users/login", formData);
      localStorage.setItem("token", data.token); // Save JWT
      navigate("/dashboard");
    } catch (err) {
      setError(err.response?.data?.message || "Invalid credentials");
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* Left side: Login Form */}
      <div className="w-1/2 flex justify-center items-center bg-green-100">
        <form
          onSubmit={handleSubmit}
          className="bg-green-50 p-6 rounded-lg shadow-lg w-96 border border-green-300"
        >
          <h2 className="text-2xl font-bold text-center mb-4 text-green-600">Login</h2>
          {error && <p className="text-red-500 mb-4">{error}</p>}
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            className="w-full p-2 mb-3 border border-green-500 focus:border-green-700 focus:ring focus:ring-green-200 rounded outline-none"
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            className="w-full p-2 mb-4 border border-green-500 focus:border-green-700 focus:ring focus:ring-green-200 rounded outline-none"
            required
          />
          <button
            type="submit"
            className="bg-gradient-to-r from-green-400 to-green-600 text-white px-4 py-2 rounded w-full shadow-md hover:from-green-500 hover:to-green-700 transition-all"
          >
            Login
          </button>
          {/* New User Signup Link */}
      <div className="text-center mt-4">
        <p className="text-sm text-gray-600">New User? <a href="/signup" className="text-green-600 hover:text-green-800">Signup here</a></p>
      </div>
        </form>
      </div>

      {/* Right side: Image */}
      <div
        className="w-1/2 bg-cover bg-center"
        style={{ backgroundImage: `url(${login_back})` }}
      ></div>
    </div>

  );
};

export default UserLogin;

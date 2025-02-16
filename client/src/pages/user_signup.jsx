import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import signup_back from '../assets/images/signup_back.jpg';


const UserSignup = () => {
  const [formData, setFormData] = useState({ username: "", email: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {

      await axios.post("http://localhost:5000/api/users/signup", formData);
      navigate("/login");
    } catch (err) {
      setError(err.response?.data?.message || "An error occurred");
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* Left side: Image */}
      <div
        className="w-1/2 bg-cover bg-center"
        style={{ backgroundImage: `url(${signup_back})` }}
      ></div>

      {/* Right side: Signup Form */}
      <div className="w-1/2 flex justify-center items-center bg-green-100">
        <form
          onSubmit={handleSubmit}
          className="bg-green-50 p-6 rounded-lg shadow-lg w-96 border border-green-300"
        >
          <h2 className="text-2xl text-center font-bold mb-4 text-green-600">Signup</h2>
          {error && <p className="text-red-500 mb-4">{error}</p>}
          <input
            type="text"
            name="username"
            placeholder="Username"
            value={formData.username}
            onChange={handleChange}
            className="w-full p-2 mb-3 border border-green-500 focus:border-green-700 focus:ring focus:ring-green-200 rounded outline-none"
            required
          />
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
            Signup
          </button>
        </form>
      </div>

    </div>

  );
};



export default UserSignup;

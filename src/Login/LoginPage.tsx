import React, { useState } from "react";
import { FaUser, FaLock } from "react-icons/fa";

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Logging in with", email, password);
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-2xl shadow-xl w-96">
        <h2 className="text-2xl font-semibold text-center text-green-600 mb-6">
          HealthCare Login
        </h2>
        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <label className="block mb-2 text-gray-600">Email</label>
            <div className="flex items-center border rounded-lg p-2 bg-gray-50">
              <FaUser className="text-gray-400 mr-2" />
              <input
                type="email"
                placeholder="Enter your email"
                className="outline-none bg-transparent w-full"
                value={email}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setEmail(e.target.value)
                }
                required
              />
            </div>
          </div>
          <div className="mb-4">
            <label className="block mb-2 text-gray-600">Password</label>
            <div className="flex items-center border rounded-lg p-2 bg-gray-50">
              <FaLock className="text-gray-400 mr-2" />
              <input
                type="password"
                placeholder="Enter your password"
                className="outline-none bg-transparent w-full"
                value={password}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setPassword(e.target.value)
                }
                required
              />
            </div>
          </div>
          <div className="flex justify-between items-center mb-4">
            <label className="flex items-center text-gray-600">
              <input type="checkbox" className="mr-2" /> Remember me
            </label>
            <a href="#" className="text-green-600 text-sm hover:underline">
              Forgot password?
            </a>
          </div>
          <button
            type="submit"
            className="w-full bg-green-500 text-white p-3 rounded-lg hover:bg-green-600 transition"
          >
            Login
          </button>
        </form>
        <p className="text-center text-gray-600 mt-4">
          New to HealthCare?{" "}
          <a href="#" className="text-green-600 hover:underline">
            Sign up
          </a>
        </p>
        <div className="mt-6 text-center">
          <p className="text-gray-500 text-sm">Stay healthy, stay happy!</p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;

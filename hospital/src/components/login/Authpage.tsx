"use client"
import { usePathname } from "next/navigation";
import { FaUser, FaLock, FaEnvelope } from "react-icons/fa";

export default function AuthPage() {
  const pathname = usePathname();
  const isSignUp = pathname.includes("sign-up");

  return (
    <div className="flex items-center justify-center   bg-gray-900">
      <div className="w-[86vw] h-[90vh] mb-10 mt-10 flex shadow-lg rounded-4xl ">
        {/* Left Side Image */}
        <div className="w-1/2 bg-cover bg-center" style={{ backgroundImage: "url('Doctor.png')" }}></div>
        
        {/* Right Side Form */}
        <div className="w-1/2 bg-gray-800 p-10 flex flex-col justify-center">
          <h2 className="text-3xl font-bold text-white mb-6 text-center">
            {isSignUp ? "Create an Account" : "Welcome Back"}
          </h2>
          <form className="space-y-4">
            {isSignUp && (
              <div className="flex items-center bg-gray-700 p-3 rounded-lg">
                <FaUser className="text-white mr-3" />
                <input type="text" placeholder="Full Name" className="w-full bg-transparent focus:outline-none text-white" />
              </div>
            )}
            <div className="flex items-center bg-gray-700 p-3 rounded-lg">
              <FaEnvelope className="text-white mr-3" />
              <input type="email" placeholder="Email" className="w-full bg-transparent focus:outline-none text-white" />
            </div>
            <div className="flex items-center bg-gray-700 p-3 rounded-lg">
              <FaLock className="text-white mr-3" />
              <input type="password" placeholder="Password" className="w-full bg-transparent focus:outline-none text-white" />
            </div>
            <button className="w-full bg-blue-500 hover:bg-blue-600 text-white py-3 rounded-lg font-semibold transition-all">
              {isSignUp ? "Sign Up" : "Login"}
            </button>
          </form>
          <p className="text-center text-gray-400 mt-4">
            {isSignUp ? "Already have an account? " : "Don't have an account? "}
            <a href={isSignUp ? "/sign-in" : "/sign-up"} className="text-blue-400 hover:underline">
              {isSignUp ? "Sign In" : "Sign Up"}
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}

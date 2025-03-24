"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
// import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

interface User {
  name: string;
  role: "ADMIN" | "DOCTOR" | "PATIENT" | "LAB_ASSISTANT" | "GUEST";
}

const Navbar = () => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    // Simulating user authentication (Replace this with actual auth logic)
    setUser({
      name: "Alice Johnson",
      role: "PATIENT", // Change this to test different roles
    });
  }, []);

  return (
    <nav className="w-full sticky top-0 z-50 bg-gray-900 text-white shadow-md">
      <div className="container mx-auto flex items-center justify-between px-6 py-4">
              {/* Left Navigation */}
              {user?.role === "PATIENT" && (
                <div className="flex space-x-6">
                <Link href="/services" className="hover:text-blue-400">
                 Home
               </Link>
               <Link href="/doctors" className="hover:text-blue-400">
                  Doctors
                 </Link>
                       <Link href="/doctors" className="hover:text-blue-400">
                 About us
                       </Link>
                       <Link href="/doctors" className="hover:text-blue-400">
                 Contact us
                      </Link>
                      </div>
)}
        <div className="flex space-x-6">
          
                  
                  
          {user?.role === "ADMIN" && (
            <Link href="/admin" className="hover:text-blue-400">
              Admin Dashboard
            </Link>
          )}
          {user?.role === "DOCTOR" && (
            <Link href="/appointments" className="hover:text-blue-400">
              My Appointments
            </Link>
          )}
        </div>

        {/* Logo */}
        <div className="text-2xl font-bold mr-[470px] text-blue-400">MedicoHub</div>

        {/* Right Section */}
        <div className="flex items-center space-x-4">
          
          <Avatar>
            <AvatarFallback>{user?.name?.charAt(0) || "G"}</AvatarFallback>
          </Avatar>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

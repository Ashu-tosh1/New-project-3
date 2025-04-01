"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useSignIn } from "@clerk/nextjs";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Toaster, toast } from "sonner";
// import Image from "next/image";

export default function LoginPage() {
  const router = useRouter();
  const { signIn, isLoaded } = useSignIn();
  const [formData, setFormData] = useState({ email: "", password: "" });
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!isLoaded) return;
    
    try {
      await signIn.create({ identifier: formData.email, password: formData.password });
      toast.success("Login successful! Redirecting...");
      setTimeout(() => router.push("/dashboard"), 500);
    } catch (error) {
        toast.error("Invalid credentials. Please try again.");
        console.log(error)
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-700">
      <Toaster />
      <div className="w-[80vw] h-[90vh] flex shadow-lg rounded-2xl overflow-hidden bg-white">
        {/* Left Side - Image */}
        <div
          className="w-1/2 bg-cover bg-center flex flex-col justify-center items-center p-6"
          style={{ backgroundImage: "url('/Doctor.png')" }}
        ></div>

        {/* Right Side - Form */}
        <div className="w-1/2 flex flex-col items-center justify-center p-10 bg-gray-500">
          <h1 className="text-3xl font-bold text-center text-black drop-shadow-lg">Welcome Back to MedicoHub</h1>
          <p className="text-center text-black text-lg mt-2 drop-shadow-md">Login to continue</p>
          
          <Card className="w-full max-w-md p-6 shadow-2xl bg-white mt-8">
            <CardHeader>
              <CardTitle className="text-center text-2xl font-semibold text-gray-800">Login</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    name="email"
                    placeholder="Enter your email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    type="password"
                    name="password"
                    placeholder="Enter your password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                  />
                </div>
                <Button type="submit" className="mt-4 w-full bg-blue-600 hover:bg-blue-700 text-white">
                  Login
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Link to Register */}
          <div className="mt-4 text-center">
            <p className="text-sm font-bold text-black">
              Don’t have an account? {" "}
              <a href="/sign-up" className="text-blue-600 hover:underline">
                Register
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

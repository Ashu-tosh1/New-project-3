"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useRegister } from "@/lib/api/register";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Toaster, toast } from "sonner";
import axios from "axios";


export default function AuthPage() {
  const router = useRouter();
  const { mutate, isPending } = useRegister();
  const [formData, setFormData] = useState({ email: "", username: "", password: "" });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    mutate(formData, {
      onSuccess: () => {
        toast.success("Registration successful! Redirecting...");
        setTimeout(() => router.push("/"), 500);
      },
      onError: (error) => {
        if (axios.isAxiosError(error)) {
          const errorMessage = error.response?.data?.error || "Registration failed. Try again.";
          toast.error(errorMessage);
        } else {
          toast.error("An unexpected error occurred.");
        }
      },
    });
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-700">
      <Toaster />
      <div className="w-[80vw] h-[90vh] flex shadow-lg rounded-2xl overflow-hidden bg-white">
        {/* Left Side - Image */}
        <div
          className="w-1/2 bg-cover bg-center flex flex-col justify-center items-center p-6"
          style={{ backgroundImage: "url('/Doctor.png')" }}
        >
          {/* Image content if needed */}
        </div>

        {/* Right Side - Form */}
        <div className="w-1/2 flex flex-col items-center justify-center p-10 bg-gray-500">
          <h1 className="text-3xl font-bold text-center text-black drop-shadow-lg">Welcome to MedicoHub</h1>
          <p className="text-center text-black text-lg mt-2 drop-shadow-md">Your trust is our pride</p>
          
          <Card className="w-full max-w-md p-6 shadow-2xl bg-white mt-8">
            <CardHeader>
              <CardTitle className="text-center text-2xl font-semibold text-gray-800">Register</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <div>
                  <Label htmlFor="username">Username</Label>
                  <Input className="gap-2 mt-2"
                    id="username"
                    type="text"
                    name="username"
                    placeholder="Enter your username"
                    value={formData.username}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div>
                  <Label className="gap-2" htmlFor="email">Email</Label>
                  <Input className="gap-2 mt-2"
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
                  <Input className="gap-2 mt-2"
                    id="password"
                    type="password"
                    name="password"
                    placeholder="Enter your password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                  />
                </div>
                <Button type="submit" disabled={isPending} className="mt-4 w-full bg-blue-600 hover:bg-blue-700 text-white">
                  {isPending ? "Registering..." : "Register"}
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Link to Login */}
          <div className="mt-4 text-center">
            <p className="text-sm font-bold text-black">
              Already have an account ?{" "}
              <a href="/sign-in" className="text-blue-600  hover:underline">
                Login
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

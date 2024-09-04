"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { sessionAtom } from "@/store";
import { useRecoilValue } from "recoil";
import { useRouter } from "next/navigation";

export default function Component() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const session = useRecoilValue(sessionAtom);
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Login attempted with:", email, password);
    if (email === session.email && password === session.password) {
      router.push("/dashboard");
    } else {
      alert("Invalid email or password");
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-gray-900 to-gray-800 p-4">
      <div className="w-full max-w-md">
        <div className="relative overflow-hidden rounded-2xl bg-gray-800 p-8 shadow-lg">
          <svg
            className="absolute inset-0 z-0 opacity-10"
            viewBox="0 0 200 200"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill="#9333EA"
              d="M42.7,-62.9C50.9,-52.8,50.1,-34.4,51.7,-19.2C53.4,-4,57.4,8,54.4,18.7C51.4,29.4,41.4,38.8,30.2,45.9C19,52.9,6.7,57.5,-7.1,59.7C-20.9,61.9,-41.7,61.6,-54.4,52.1C-67.1,42.6,-71.7,23.9,-69.9,7.2C-68.2,-9.5,-60.1,-24.1,-49.4,-34.8C-38.7,-45.5,-25.4,-52.2,-11.1,-56.7C3.3,-61.2,18.6,-63.5,31.4,-62.1C44.2,-60.7,54.5,-55.5,42.7,-62.9Z"
              transform="translate(100 100)"
            />
          </svg>

          <div className="relative z-10">
            <h2 className="mb-6 text-center text-3xl font-bold text-white">
              Welcome Back
            </h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-white">
                  Email
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="johndoe@gmail.com"
                  value={email}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setEmail(e.target.value)
                  }
                  className="border-gray-600 bg-gray-700 text-white placeholder-gray-400 transition-all duration-300 focus:border-purple-500 focus:ring-purple-500"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password" className="text-white">
                  Password
                </Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setPassword(e.target.value)
                  }
                  className="border-gray-600 bg-gray-700 text-white placeholder-gray-400 transition-all duration-300 focus:border-purple-500 focus:ring-purple-500"
                  required
                />
              </div>
              <Button
                type="submit"
                className="w-full transform rounded-lg bg-purple-600 py-3 font-semibold text-white transition-all duration-300 hover:scale-105 hover:bg-purple-700"
              >
                Login
              </Button>
            </form>
            <div className="mt-6 text-center">
              <a className="cursor-pointer text-purple-400 transition-colors duration-300 hover:text-purple-300">
                Forgot password?
              </a>
            </div>
            <div className="mt-8 text-center">
              <p className="text-gray-400">Don&apos;t have an account?</p>
              <a className="cursor-pointer font-semibold text-purple-400 transition-colors duration-300 hover:text-purple-300">
                Sign up now
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

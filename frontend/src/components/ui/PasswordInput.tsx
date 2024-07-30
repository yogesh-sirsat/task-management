"use client";
import { Eye, EyeOff } from "lucide-react";
import Input from "./Input";
import { useState } from "react";

export default function PasswordInput() {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  return (
    <div className="relative flex">
      <Input
        name="Password"
        placeholder="Password"
        type={isPasswordVisible ? "text" : "password"}
      />
      {isPasswordVisible ? (
        <EyeOff
          className="absolute right-3 top-3"
          onClick={() => setIsPasswordVisible(false)}
        />
      ) : (
        <Eye
          className="absolute right-3 top-3"
          onClick={() => setIsPasswordVisible(true)}
        />
      )}
    </div>
  );
}

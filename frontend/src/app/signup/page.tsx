"use client";
import Input from "@/components/ui/Input";
import PasswordInput from "@/components/ui/PasswordInput";
import { FormEvent, useState } from "react";

export default function SignUp() {
  const backendURL = process.env.NEXT_PUBLIC_BACKEND_URL;
  const [error, setError] = useState<string | null>(null);
  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    try {
      const form = e.target as HTMLFormElement;
      const response = await fetch(`${backendURL}/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          fullName: form.fullname.value,
          email: form.email.value,
          password: form.password.value,
        }),
      });
      if (!response.ok) {
        throw new Error("Response not ok");
      }
      const data = await response.json();
    } catch (e) {
      setError("Oops! Error while signing up!");
      console.error(e);
    }
  };
  return (
    <main className="min-w-screen min-h-screen bg-gradient-to-b from-white to-[#AFA3FF] flex justify-center text-xl">
      <section className="flex flex-col gap-8 h-fit bg-gradient-to-b from-[#F7F7F7] to-[#F0F0F0] p-12 2xl:p-16 mt-10 2xl:mt-24 rounded-2xl border border-[#CECECE]">
        <h1 className="text-5xl font-semibold text-center text-zinc-800">
          Welcome to <span className="text-[#4534AC]">Workflo</span>!
        </h1>
        <form onSubmit={onSubmit} className="flex flex-col gap-6 w-full">
          {error ? (
            <div className="bg-red-500 text-white p-2">{error}</div>
          ) : null}
          <Input name="fullname" placeholder="Full name" type="text" />
          <Input name="email" placeholder="Your email" type="email" />
          <PasswordInput />
          <button
            type="submit"
            className="p-2 text-white rounded-lg bg-gradient-to-t from-[#4B36CC] to-[#9C93D4]"
          >
            Sign up
          </button>
        </form>
        <div className="flex text-zinc-600 gap-1 text-center self-center">
          <p className="">Already have an account?</p>
          <a href="#" className="text-[#0054A1]">
            Log in
            <span>.</span>
          </a>
        </div>
      </section>
    </main>
  );
}

"use client";
import Input from "@/components/ui/Input";
import PasswordInput from "@/components/ui/PasswordInput";
import { useAppDispatch } from "@/store/hooks";
import { login } from "@/store/features/userSlice";
import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";

export default function LogIn() {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const backendURL = process.env.NEXT_PUBLIC_BACKEND_URL;
  const [error, setError] = useState<string | null>(null);
  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    try {
      const form = e.target as HTMLFormElement;
      const response = await fetch(`${backendURL}/login`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: form.email.value,
          password: form.password.value,
        }),
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data?.message || "Oops! Error while logging up!");
      }
      dispatch(login(data));
      router.push("/");
    } catch (e: any) {
      setError(e.message);
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
          <Input name="email" placeholder="Your email" type="email" />
          <PasswordInput />
          <button
            type="submit"
            className="p-2 text-white rounded-lg bg-gradient-to-t from-[#4B36CC] to-[#9C93D4]"
          >
            Log in
          </button>
        </form>
        <div className="flex text-zinc-600 gap-1 text-center self-center">
          <p>Don&apos;t have an account? Create a</p>
          <a href="/signup" className="text-[#0054A1]">
            new account.
            <span>.</span>
          </a>
        </div>
      </section>
    </main>
  );
}

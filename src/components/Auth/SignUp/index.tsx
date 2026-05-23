"use client";

import { useState } from "react";

type Props = {
  signUpOpen?: (value: boolean) => void;
};

const SignUp = ({ signUpOpen }: Props) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // sementara dummy register
    console.log("REGISTER:", { name, email, password });

    if (signUpOpen) signUpOpen(false);
  };

  return (
    <div className="w-full">
      <h2 className="text-xl font-semibold mb-6">Sign Up</h2>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">

        <input
          type="text"
          placeholder="Full Name"
          className="border p-3 rounded-lg outline-none"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input
          type="email"
          placeholder="Email"
          className="border p-3 rounded-lg outline-none"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          className="border p-3 rounded-lg outline-none"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          type="submit"
          className="bg-black text-white py-2 rounded-lg hover:bg-gray-800"
        >
          Create Account
        </button>

      </form>
    </div>
  );
};

export default SignUp;
"use client";

import { useState } from "react";

type Props = {
  signInOpen?: (value: boolean) => void;
};

const Signin = ({ signInOpen }: Props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // sementara dummy login
    console.log("LOGIN:", { email, password });

    if (signInOpen) signInOpen(false);
  };

  return (
    <div className="w-full">
      <h2 className="text-xl font-semibold mb-6">Sign In</h2>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">

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
          Login
        </button>

      </form>
    </div>
  );
};

export default Signin;
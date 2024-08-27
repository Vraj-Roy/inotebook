"use client";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

const Login = () => {
  const router = useRouter();
  const [data, setData] = useState({ email: "", password: "" });
  const onChange = async (e: any) => {
    e.preventDefault();
    if (e.target.name === "email") {
      setData({ ...data, email: e.target.value });
    }
    if (e.target.name === "password") {
      setData({ ...data, password: e.target.value });
    }
  };
  const onSubmit = async (e: any) => {
    e.preventDefault();
    const res = await fetch("/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    let response = await res.json();
    router.push("/");
  };
  return (
    <div className="w-fit  m-auto mt-40">
      <div className="bg-blue-200 rounded text-lg p-4 mb-4 text-center">
        Login to i NoteBook
      </div>
      <div>
        <input
          placeholder="email"
          name="email"
          onChange={onChange}
          value={data.email}
          className="input-lg"
          type="email"
        />
      </div>
      <div>
        <input
          placeholder="password"
          name="password"
          onChange={onChange}
          value={data.password}
          className="input-lg"
          type="password"
        />
      </div>
      <div
        onClick={onSubmit}
        className=" btn w-fit mx-auto flex my-4 bg-blue-200"
      >
        Submit
      </div>
    </div>
  );
};

export default Login;

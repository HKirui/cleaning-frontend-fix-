import React, { useState } from "react";
import api from "../services/api";
import { useNavigate } from "react-router-dom";

function Register() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    role: "customer"
  });

  const register = async (e) => {
    e.preventDefault();

    try {
      const res = await api.post("/auth/register", form);
      alert("Registration successful! Please subscribe.");
      navigate("/subscribe");
    } catch (err) {
      alert(err.response?.data?.error || "Registration error");
    }
  };

  return (
    <form onSubmit={register}>
      <input
        type="text"
        placeholder="Full Name"
        value={form.name}
        onChange={(e) => setForm({ ...form, name: e.target.value })}
      />

      <input
        type="email"
        placeholder="Email"
        value={form.email}
        onChange={(e) => setForm({ ...form, email: e.target.value })}
      />

      <input
        type="tel"
        placeholder="Phone"
        value={form.phone}
        onChange={(e) => setForm({ ...form, phone: e.target.value })}
      />

      <input
        type="password"
        placeholder="Password"
        value={form.password}
        onChange={(e) => setForm({ ...form, password: e.target.value })}
      />

      <select
        value={form.role}
        onChange={(e) => setForm({ ...form, role: e.target.value })}
      >
        <option value="customer">Customer</option>
        <option value="cleaner">Cleaner</option>
      </select>

      <button type="submit">Register</button>
    </form>
  );
}

export default Register;

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

export default function Register() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    first_name: "",
    last_name: "",
    email: "",
    phone: "",
    password: "",
    role: "customer",
  });

  const handle = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

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
    <div style={styles.container}>
      <div style={styles.card}>
        <h2>Create Account</h2>

        <form onSubmit={register} style={styles.form}>

          <input 
            name="first_name" 
            placeholder="First Name" 
            onChange={handle} required 
          />

          <input 
            name="last_name" 
            placeholder="Last Name" 
            onChange={handle} required 
          />

          <input 
            type="email"
            name="email"
            placeholder="Email"
            onChange={handle} required 
          />

          <input 
            name="phone"
            placeholder="Phone Number"
            onChange={handle} required 
          />

          <input 
            type="password"
            name="password"
            placeholder="Password"
            onChange={handle} required 
          />

          <select name="role" onChange={handle}>
            <option value="customer">Customer</option>
            <option value="cleaner">Cleaner</option>
          </select>

          <button style={styles.button}>Register</button>
        </form>

        <p>Already have an account?  
          <a href="/login"> Login</a>
        </p>
      </div>
    </div>
  );
}

const styles = {
  container: {
    height: "100vh",
    background: "#f3f6ff",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  card: {
    width: "90%",
    maxWidth: "400px",
    padding: "25px",
    background: "white",
    borderRadius: "15px",
    boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
    textAlign: "center",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "15px",
  },
  button: {
    padding: "10px",
    background: "#ff69b4",
    color: "white",
    border: "none",
    borderRadius: "12px",
    cursor: "pointer",
  },
};

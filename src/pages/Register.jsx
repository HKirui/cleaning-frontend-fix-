import React, { useState } from 'react';
import api from '../axios';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    phone: "",
    user_type: "customer"
  });

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

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
          <input placeholder="First Name" name="first_name" onChange={handleChange} required />
          <input placeholder="Last Name" name="last_name" onChange={handleChange} required />
          <input placeholder="Email" name="email" type="email" onChange={handleChange} required />
          <input placeholder="Phone Number" name="phone" onChange={handleChange} required />
          <input placeholder="Password" name="password" type="password" onChange={handleChange} required />

          <select name="user_type" onChange={handleChange}>
            <option value="customer">Customer</option>
            <option value="cleaner">Cleaner</option>
          </select>

          <button style={styles.button}>Register</button>
        </form>

        <p>Already have an account? <a href="/login">Login</a></p>
      </div>
    </div>
  );
};

const styles = {
  container: {
    height: "100vh",
    background: "#f3f6ff",
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  },
  card: {
    width: "90%",
    maxWidth: "400px",
    padding: "25px",
    background: "white",
    borderRadius: "15px",
    boxShadow: "0 4px 12px rgba(249, 140, 234, 0.1)",
    textAlign: "center"
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "15px"
  },
  button: {
    padding: "10px",
    background: "#4a6cf7",
    color: "white",
    border: "none",
    borderRadius: "10px",
    cursor: "pointer"
  }
};

export default Register;

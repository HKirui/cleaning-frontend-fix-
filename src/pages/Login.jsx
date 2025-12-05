import React, { useState } from 'react';
import api from '../axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });

  const handle = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const login = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post("/auth/login", form);

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));

      alert("Login successful!");
      navigate("/pages");

    } catch (err) {
      alert(err.response?.data?.error || "Login error");
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2>Welcome Back!</h2>

        <form onSubmit={login} style={styles.form}>
          <input placeholder="Email" name="email" type="email" onChange={handle} required />
          <input placeholder="Password" name="password" type="password" onChange={handle} required />
          <button style={styles.button}>Login</button>
        </form>

        <p>No account? <a href="/register">Register</a></p>
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
    boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
    textAlign: "center"
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "15px"
  },
  button: {
    padding: "10px",
    background: "#ff69b4",
    color: "white",
    border: "none",
    borderRadius: "12px",
    cursor: "pointer"
  }
};

export default Login;

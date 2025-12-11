import React, { useState, useEffect, useRef } from "react";
import api from "../axios";
import { useNavigate } from "react-router-dom";

const Subscribe = () => {
  const [phone, setPhone] = useState("");
  const [waiting, setWaiting] = useState(false); // waiting for payment
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const pollRef = useRef(null);

  // helper: simple phone validation (Kenyan format example)
  const validPhone = (p) => {
    if (!p) return false;
    const cleaned = p.replace(/\s|-/g, "");
    // Accept formats like 07XXXXXXXX or 2547XXXXXXXX or +2547XXXXXXXX
    return /^(\+254|254|0)?7\d{8}$/.test(cleaned);
  };

  const subscribe = async () => {
    setError(null);

    if (!validPhone(phone)) {
      setError("Enter a valid MPesa phone number (e.g. 07XXXXXXXX).");
      return;
    }

    try {
      setWaiting(true);

      const token = localStorage.getItem("token");
      if (!token) throw new Error("No auth token found.");

      await api.post(
        "/payments/subscribe",
        { phone },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      // start polling for subscription status
      startPolling();
      alert("STK Push sent! Complete payment on your phone.");
    } catch (err) {
      console.error("Subscribe error:", err);
      setError("Subscription payment error. Check console for details.");
      setWaiting(false);
    }
  };

  const startPolling = () => {
    // avoid double polling
    if (pollRef.current) return;

    const token = localStorage.getItem("token");
    if (!token) {
      setError("Missing auth token for status checks.");
      setWaiting(false);
      return;
    }

    pollRef.current = setInterval(async () => {
      try {
        const res = await api.get("/payments/status", {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (res.data && res.data.subscribed) {
          clearInterval(pollRef.current);
          pollRef.current = null;
          alert("Payment successful! Redirecting to dashboard...");
          navigate("/dashboard");
        }
      } catch (err) {
        console.error("Status check error:", err);
        // keep trying — but you can choose to stop polling after N attempts
      }
    }, 3000);
  };

  // cleanup on unmount
  useEffect(() => {
    return () => {
      if (pollRef.current) {
        clearInterval(pollRef.current);
        pollRef.current = null;
      }
    };
  }, []);

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h3>Subscription Required</h3>
        <p>Please pay <b>KES 100</b> to access the platform.</p>

        <input
          placeholder="Enter MPesa Number (e.g. 07XXXXXXXX)"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          style={styles.input}
          disabled={waiting}
        />

        <button
          onClick={subscribe}
          style={{ ...styles.button, opacity: waiting ? 0.7 : 1 }}
          disabled={waiting}
        >
          {waiting ? "Waiting for payment..." : "Pay with Mpesa"}
        </button>

        {error && <p style={{ color: "crimson", marginTop: 12 }}>{error}</p>}

        <p style={{ marginTop: 12 }}>
          <a href="/login">Back to Login</a>
        </p>
      </div>
    </div>
  );
};

const styles = {
  container: {
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "#eaf2ff",
  },
  card: {
    width: "350px",
    background: "white",
    borderRadius: "12px",
    padding: "25px",
    boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
    textAlign: "center",
  },
  input: {
    padding: "10px",
    width: "100%",
    borderRadius: "10px",
    border: "1px solid #ccc",
    marginBottom: "15px",
  },
  button: {
    background: "#4a6cf7",
    color: "white",
    width: "100%",
    padding: "10px",
    borderRadius: "10px",
    border: "none",
    cursor: "pointer",
  },
};

export default Subscribe;

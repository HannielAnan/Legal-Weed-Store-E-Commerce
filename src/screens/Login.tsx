import React, { useState } from "react";
import { Header } from "../components/Header";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebaseConfig";
import { useNavigate } from "react-router-dom"; // Import useNavigate from react-router-dom

const Login: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate(); // Initialize useNavigate

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null); // Clear previous errors

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      console.log("Logged in successfully:", userCredential.user);

      // Redirect admin123@gmail.com to the dashboard
      if (email === "admin123@gmail.com") {
        navigate("/dashboard");
      } else {
        navigate("/home"); // Redirect other users to a default page, if needed
      }
    } catch (err: any) {
      setError("Failed to log in. Please check your email and password.");
      console.error("Login error:", err.message);
    }
  };

  return (
    <>
      <Header title="Login" burger={false} basket={false} line={false} />
      <div style={styles.container}>
        <h2>Login</h2>
        {error && <p style={styles.error}>{error}</p>}
        <form onSubmit={handleLogin} style={styles.form}>
          <label style={styles.label}>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={styles.input}
          />
          <label style={styles.label}>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={styles.input}
          />
          <button type="submit" style={styles.button}>Login</button>
        </form>
      </div>
    </>
  );
};

const styles: { [key: string]: React.CSSProperties } = {
  container: {
    maxWidth: "400px",
    margin: "auto",
    padding: "20px",
  },
  form: {
    display: "flex",
    flexDirection: "column",
  },
  label: {
    margin: "10px 0 5px",
  },
  input: {
    padding: "8px",
    marginBottom: "15px",
    fontSize: "16px",
  },
  button: {
    padding: "10px",
    fontSize: "16px",
    cursor: "pointer",
  },
  error: {
    color: "red",
    marginBottom: "10px",
  },
};

export default Login;

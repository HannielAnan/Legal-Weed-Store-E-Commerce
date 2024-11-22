import React, { useState } from "react";
import { Header } from "../components/Header"; // Adjust the path if necessary
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebaseConfig"; // Ensure this is properly configured

const SignUp: React.FC = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null); // Clear any previous errors

    try {
      // Sign up the user using Firebase Authentication
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      console.log("Signed up successfully:", userCredential.user);

      // You can add additional actions here, like saving the user's name to Firestore
    } catch (err: any) {
      // Handle Firebase-specific errors
      if (err.code === "auth/email-already-in-use") {
        setError("This email is already registered. Please try logging in.");
      } else if (err.code === "auth/weak-password") {
        setError("Password is too weak. Please choose a stronger password.");
      } else if (err.code === "auth/invalid-email") {
        setError("Invalid email format. Please enter a valid email address.");
      } else {
        setError("Failed to sign up. Please try again later.");
      }
      console.error("Sign-up error:", err.message);
    }
  };

  return (
    <>
      <Header title="Sign Up" burger={true} basket={true} line={true} />
      <div style={styles.container}>
        <h2>Sign Up</h2>
        {error && <p style={styles.error}>{error}</p>}
        <form onSubmit={handleSignUp} style={styles.form}>
          <label style={styles.label}>Name:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            style={styles.input}
          />

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

          <button type="submit" style={styles.button}>Sign Up</button>
        </form>
        <p style={styles.redirect}>
          Already have an account? <a href="/login" style={styles.link}>Log in</a>
        </p>
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
  redirect: {
    marginTop: "10px",
    textAlign: "center",
  },
  link: {
    color: "blue",
    textDecoration: "underline",
    cursor: "pointer",
  },
};

export default SignUp;

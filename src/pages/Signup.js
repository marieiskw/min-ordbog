import { useState } from "react";
import { supabase } from "../supabase";

export default function Signup({ onBackToLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleSignup(e) {
    e.preventDefault();
    const { error } = await supabase.auth.signup({ email, password });

    if (error) {
      alert(error.message);
    } else {
      alert("Completed!");
      onBackToLogin();
    }

    return;
  }

  return (
    <form onSubmit={handleSignup} className="loginForm">
      <label className="loginTitle">Create an account</label>
      <input
        type="email"
        value={email}
        placeholder="email"
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        value={password}
        placeholder="password"
        onChange={(e) => setPassword(e.target.value)}
      />
      <div>
        <button type="submit" className="loginButton">
          Sign up
        </button>
        <p onClick={onBackToLogin} className="loginControlLink">
          Back to Login
        </p>
      </div>
    </form>
  );
}

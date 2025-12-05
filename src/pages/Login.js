import { useState } from "react";
import { supabase } from "../supabase";

export default function Login({ onLogin, onSignup }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleLogin(e) {
    e.preventDefault();
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      alert(error.message);
      return;
    }

    onLogin();
  }

  return (
    <form onSubmit={handleLogin} className="loginForm">
      <label className="loginTitle">Log in</label>
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
          Log in
        </button>
        <p onClick={onSignup} className="loginControlLink">
          Create an account
        </p>
      </div>
    </form>
  );
}

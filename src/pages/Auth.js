import { useState } from "react";

export default function Auth({ mode, onSubmit, onChangeMode }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    onSubmit({ email, password });
  }

  return (
    <form className="loginForm" onSubmit={handleSubmit}>
      <label className="loginTitle">
        {mode === "login" ? "Log in" : "Sign up"}
      </label>
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
          {mode === "login" ? "Log in" : "Sign up"}
        </button>
        <p onClick={onChangeMode} className="loginControlLink">
          {mode === "login" ? "Create an account" : "Back to Login"}
        </p>
      </div>
    </form>
  );
}

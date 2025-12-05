import { useEffect, useState } from "react";

import Auth from "./pages/Auth";
import Home from "./pages/Home";
import { supabase } from "./supabase";

import "./styles.css";

export default function App() {
  const [view, setView] = useState("home");
  const [user, setUser] = useState(null);

  useEffect(() => {
    async function getSession() {
      const { data } = await supabase.auth.getUser();
      setUser(data.user);

      if (data.user) setView("home");
      else setView("login");
    }

    getSession();
  }, []);

  async function handleLogin({ email, password }) {
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      alert(error.message);
      return;
    }
    setView("home");
  }

  async function handleSignup({ email, password }) {
    const { error } = await supabase.auth.signup({ email, password });

    if (error) {
      alert(error.message);
      return;
    }

    alert("Completed!");
    setView("login");
  }

  function handleLogout() {
    setView("login");
    setUser(null);
  }

  if (view === "login") {
    return (
      <Auth
        mode={"login"}
        onSubmit={handleLogin}
        onChangeMode={() => setView("signup")}
      />
    );
  }

  if (view === "signup") {
    return (
      <Auth
        mode={"signup"}
        onSubmit={handleSignup}
        onChangeMode={() => setView("login")}
      />
    );
  }

  return <Home onLogout={handleLogout} />;
}

import { useEffect, useState } from "react";

import Signup from "./pages/Signup";
import Login from "./pages/Login";
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

  function handleLogout() {
    setView("login");
    setUser(null);
  }

  if (view === "login")
    return (
      <Login
        onSignup={() => setView("signup")}
        onLogin={() => setView("home")}
      />
    );

  if (view === "signup")
    return <Signup onBackToLogin={() => setView("login")} />;
  return <Home onLogout={handleLogout} />;
}

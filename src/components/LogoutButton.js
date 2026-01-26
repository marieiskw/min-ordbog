import { supabase } from "../supabase";

export default function LogoutButton({ onLogout }) {
  async function handleLogout() {
    await supabase.auth.signOut();

    onLogout();
  }
  return (
    <>
      <button className="logOutButton" onClick={handleLogout}>
        Logout
      </button>
    </>
  );
}

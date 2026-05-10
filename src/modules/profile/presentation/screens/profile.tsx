import React from "react";
import Profile from "../components/profile";
import { useProfile } from "../hooks/useProfile";

export default function ProfileScreen() {
  const { logout, user } = useProfile();

  return <Profile user={user} onLogout={logout} />;
}

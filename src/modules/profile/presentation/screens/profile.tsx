import React, { lazy, Suspense } from "react";
import { useProfile } from "../hooks/useProfile";
import { Loading } from "@/src/components/shared/loading";

const Profile = lazy(() => import("../components/profile"));

export default function ProfileScreen() {
  const { logout, user } = useProfile();

  return (
    <Suspense fallback={<Loading />}>
      <Profile user={user} onLogout={logout} />
    </Suspense>
  );
}

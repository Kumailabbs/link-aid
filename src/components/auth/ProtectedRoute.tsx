import { Navigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { JSX } from "react";

export default function ProtectedRoute({
  children,
  allowedRoles,
}: {
  children: JSX.Element;
  allowedRoles: string[];
}) {
  const { currentUser, userData, loading } = useAuth();

  if (loading) return <div>Loading...</div>;

  if (!currentUser) return <Navigate to="/signin" />;

  if (!allowedRoles.includes(userData?.role))
    // return <Navigate to="/unauthorized" />;
return null;

  return children;
}

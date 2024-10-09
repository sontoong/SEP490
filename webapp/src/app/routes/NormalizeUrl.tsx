import { Navigate, useLocation } from "react-router-dom";

export const NormalizeUrl = ({ children }: { children: React.ReactNode }) => {
  const location = useLocation();

  // Normalize multiple slashes in the pathname
  const normalizedPath = location.pathname.replace(/\/{2,}/g, "/");

  // Ensure the normalized path is valid
  if (!normalizedPath || normalizedPath === "/..") {
    return <Navigate to="/" />;
  }

  // If the pathname is different from the normalized one, redirect
  if (location.pathname !== normalizedPath) {
    console.log("Redirecting to:", normalizedPath);
    return <Navigate to={normalizedPath} />;
  }

  return <>{children}</>;
};

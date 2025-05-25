import { Navigate, Outlet } from "react-router-dom";
import { useWhoamiQuery } from "../../../entities/auth/api/authApi";
import { AppRoutes } from "./routes";
import { CircularProgress } from "@mui/material";

export const ProtectedRoute = () => {
  const { data: user, isLoading, isError } = useWhoamiQuery();

  if (isLoading) {
    return <CircularProgress sx={{ margin: "auto" }} />;
  }

  if (isError || !user) {
    return <Navigate to={AppRoutes.LOGIN} replace />;
  }

  return <Outlet />;
}; 
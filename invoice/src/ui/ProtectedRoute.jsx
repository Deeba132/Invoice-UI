/* eslint-disable react/prop-types */

import { Navigate } from "react-router-dom";
import Loader from "../Components/Loader";
import { useEffect, useState } from "react";

export default function ProtectedRoute({ children }) {
  const [isLoading, setLoading] = useState(true);
  const [isAuthenticated, setAuthenticated] = useState(false);
  useEffect(() => {
    const times = localStorage.getItem("expiry");
    if (times && Date.now() > Number(times)) {
      localStorage.removeItem("token");
      localStorage.removeItem("expiry");
    }
    setTimeout(() => {
      setAuthenticated(!!localStorage.getItem("token"));
      setLoading(false);
    }, 5000);
  }, []);
  // Or use your auth context / state
  if (isLoading) {
    return <Loader />;
  }
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return children;
}

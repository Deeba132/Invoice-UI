import "./index.css";

import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import ProtectedRoute from "./ui/ProtectedRoute";
import Homepage from "./Pages/Homepage";
import Register from "./Pages/Register";
import { useState } from "react";
import PageNotFound from "./Pages/PageNotFound";
import Customer from "./Pages/Customer";
import Invoice from "./Pages/Invoice";
import Login from "./Pages/Login";
import DefaultTable from "./Pages/inventory";
export default function App() {
  const [smalld, setsmalld] = useState(false);
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Homepage smalld={smalld} />
            </ProtectedRoute>
          }
        >
          <Route index element={<Navigate replace to="inventory" />} />
          <Route path="inventory" element={<DefaultTable />} />
          <Route path="customer" element={<Customer />} />
          <Route path="invoice" element={<Invoice />} />
        </Route>
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route
          path="*"
          element={<PageNotFound smalld={() => setsmalld(true)} />}
        />
      </Routes>
    </BrowserRouter>
  );
}

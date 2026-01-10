import { Routes, Route } from "react-router-dom";

import AdminLayout from "../Admin/layouts/AdminLayout";
import ClientLayout from "../Client/layouts/ClientLayout";
import AdminRoute from "./AdminRoute";

import Dashboard from "../Admin/pages/Dashboard";
import ProductsAdmin from "../Admin/pages/Products";

import Home from "../Client/pages/Home";
import ProductList from "../Client/pages/Products/List";
import Cart from "../Client/pages/Cart";

import Login from "../Auth/Login";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />

      {/* CLIENT */}
      <Route element={<ClientLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<ProductList />} />
        <Route path="/cart" element={<Cart />} />
      </Route>

      {/* ADMIN */}
      <Route
        path="/admin"
        element={
          <AdminRoute>
            <AdminLayout />
          </AdminRoute>
        }
      >
        <Route index element={<Dashboard />} />
        <Route path="products" element={<ProductsAdmin />} />
      </Route>
    </Routes>
  );
}

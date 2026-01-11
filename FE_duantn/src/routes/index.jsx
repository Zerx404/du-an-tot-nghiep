import { Routes, Route } from "react-router-dom";

/* ADMIN */
import AdminLayout from "../Admin/layouts/AdminLayout";
import Dashboard from "../Admin/pages/Dashboard";
import Categories from "../Admin/pages/Categories";
import Products from "../Admin/pages/Products";
import ProductCreate from "../Admin/pages/Products/Create";
import ProductEdit from "../Admin/pages/Products/Edit";
import ProductVariants from "../Admin/pages/ProductVariants";
import Orders from "../Admin/pages/Orders";
import ShippingProviders from "../Admin/pages/ShippingProviders";
import Payments from "../Admin/pages/Payments";
import PaymentLogs from "../Admin/pages/PaymentLogs";
import Users from "../Admin/pages/Users";
import UserAddresses from "../Admin/pages/UserAddresses";

/* CLIENT */
import ClientLayout from "../Client/layouts/ClientLayout";
import Home from "../Client/pages/Home";
import ProductList from "../Client/pages/Products/List";
import Cart from "../Client/pages/Cart";

/* AUTH */
import Login from "../Auth/Login";

/* GUARD */
import AdminRoute from "./AdminRoute";

export default function AppRoutes() {
  return (
    <Routes>
      {/* AUTH */}
      <Route path="/login" element={<Login />} />

      {/* CLIENT */}
      <Route element={<ClientLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<ProductList />} />
        <Route path="/cart" element={<Cart />} />
      </Route>

      {/* ADMIN */}
      <Route element={<AdminRoute />}>
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<Dashboard />} />

          <Route path="categories" element={<Categories />} />
          <Route path="products" element={<Products />} />
          <Route path="products/create" element={<ProductCreate />} />
          <Route path="products/:id/edit" element={<ProductEdit />} />
          <Route path="product-variants" element={<ProductVariants />} />

          <Route path="orders" element={<Orders />} />
          <Route path="shipping-providers" element={<ShippingProviders />} />

          <Route path="payments" element={<Payments />} />
          <Route path="payment-logs" element={<PaymentLogs />} />

          <Route path="users" element={<Users />} />
          <Route path="user-addresses" element={<UserAddresses />} />
        </Route>
      </Route>
    </Routes>
  );
}

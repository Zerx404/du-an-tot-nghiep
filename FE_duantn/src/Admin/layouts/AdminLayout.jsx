import { Link, Outlet } from "react-router-dom";

export default function AdminLayout() {
  return (
    <div style={{ display: "flex", minHeight: "100vh" }}>
      {/* SIDEBAR */}
      <aside
        style={{
          width: 220,
          background: "#111827",
          color: "#fff",
          padding: 20,
        }}
      >
        <h2 style={{ marginBottom: 24 }}>ADMIN</h2>

        <nav style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          <Link style={linkStyle} to="/admin">
            Dashboard
          </Link>

          <Link style={linkStyle} to="/admin/products">
            Products
          </Link>

          <Link style={linkStyle} to="/admin/categories">
            Categories
          </Link>

          <Link style={linkStyle} to="/admin/orders">
            Orders
          </Link>

          <Link style={linkStyle} to="/admin/payments">
            Payments
          </Link>

          <Link style={linkStyle} to="/admin/users">
            Users
          </Link>
        </nav>
      </aside>

      {/* CONTENT */}
      <main style={{ flex: 1, padding: 24, background: "#f9fafb" }}>
        <Outlet />
      </main>
    </div>
  );
}

const linkStyle = {
  color: "#a78bfa",
  textDecoration: "none",
  fontSize: 16,
};

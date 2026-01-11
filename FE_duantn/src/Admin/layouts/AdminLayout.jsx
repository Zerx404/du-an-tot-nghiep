import { NavLink, Outlet } from "react-router-dom";
import { useState, useEffect } from "react";
import logo from "../../assets/images/logo/logo.png";

export default function AdminLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(window.innerWidth >= 1200);

  // Responsive: tự đóng sidebar khi màn hình nhỏ
  useEffect(() => {
    const handleResize = () => {
      setSidebarOpen(window.innerWidth >= 1200);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div id="app">
      {/* SIDEBAR */}
      <div id="sidebar" className={sidebarOpen ? "active" : ""}>
        <div className="sidebar-wrapper active">
          <div className="sidebar-header">
            <div className="d-flex justify-content-between">
              <div className="logo">
                <NavLink to="/admin">
                  <img src={logo} alt="Logo" />
                </NavLink>
              </div>

              {/* nút đóng sidebar (mobile) */}
              <button
                className="sidebar-hide d-xl-none d-block"
                onClick={() => setSidebarOpen(false)}
              >
                <i className="bi bi-x bi-middle"></i>
              </button>
            </div>
          </div>

          <div className="sidebar-menu">
            <ul className="menu">
              <li className="sidebar-title">Danh mục</li>

              {[
                { to: "/admin", icon: "bi-grid-fill", label: "Bảng điều khiển" },
                { to: "/admin/products", icon: "bi-box-seam", label: "Sản phẩm" },
                { to: "/admin/categories", icon: "bi-tags-fill", label: "Danh mục sản phẩm" },
                { to: "/admin/orders", icon: "bi-cart-check-fill", label: "Đơn hàng" },
                { to: "/admin/users", icon: "bi-people-fill", label: "Người dùng" },
              ].map((item) => (
                <li className="sidebar-item" key={item.to}>
                  <NavLink
                    to={item.to}
                    className={({ isActive }) =>
                      "sidebar-link" + (isActive ? " active" : "")
                    }
                  >
                    <i className={`bi ${item.icon}`}></i>
                    <span>{item.label}</span>
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* MAIN */}
      <div id="main">
        <header className="mb-3">
          {/* nút mở sidebar (mobile) */}
          <button
            className="burger-btn d-block d-xl-none"
            onClick={() => setSidebarOpen(!sidebarOpen)}
          >
            <i className="bi bi-justify fs-3"></i>
          </button>
        </header>

        <div className="page-content">
          <Outlet />
        </div>

        <footer>
          <div className="footer clearfix mb-0 text-muted">
            <div className="float-start">
              <p>2026 © Quản trị hệ thống</p>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}

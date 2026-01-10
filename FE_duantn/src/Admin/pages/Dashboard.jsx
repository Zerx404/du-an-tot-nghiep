import { useNavigate } from "react-router-dom";
import { products } from "../../mock/products.mock";

export default function Dashboard() {
  const navigate = useNavigate();

  return (
    <div>
      <h1>Dashboard</h1>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(4,1fr)",
          gap: 16,
          marginTop: 24,
        }}
      >
        <Stat
          title="Sản phẩm"
          value={products.length}
          onClick={() => navigate("/admin/products")}
        />

        <Stat
          title="Đơn hàng"
          value="24"
          onClick={() => navigate("/admin/orders")}
        />

        <Stat
          title="Doanh thu"
          value="120,000,000 đ"
          onClick={() => navigate("/admin/payments")}
        />

        <Stat
          title="Người dùng"
          value="18"
          onClick={() => navigate("/admin/users")}
        />
      </div>
    </div>
  );
}

function Stat({ title, value, onClick }) {
  return (
    <div
      onClick={onClick}
      style={{
        background: "#f9fafb",
        padding: 20,
        borderRadius: 10,
        border: "1px solid #e5e7eb",
        cursor: "pointer",
      }}
    >
      <h4>{title}</h4>
      <p style={{ fontSize: 20, fontWeight: "bold" }}>{value}</p>
      <small>Xem chi tiết →</small>
    </div>
  );
}

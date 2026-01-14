// src/Admin/pages/Products/index.jsx
import { Link } from "react-router-dom";
import { useState } from "react";
import { products } from "../../../mock/products.mock";
import { categories } from "../../../mock/categories.mock";
import { productVariants } from "../../../mock/productVariants.mock";

export default function Products() {
  const [keyword, setKeyword] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const getCategoryName = (id) => categories.find((c) => c.id === id)?.name || "—";

  const getTotalStock = (productId) =>
    productVariants.filter((v) => v.product_id === productId).reduce((sum, v) => sum + v.stock, 0);

  const getMinPrice = (productId, defaultPrice) => {
    const variants = productVariants.filter((v) => v.product_id === productId);
    return variants.length ? Math.min(...variants.map((v) => v.price)) : defaultPrice;
  };

  const filteredProducts = products.filter((p) => {
    const matchName = p.name.toLowerCase().includes(keyword.toLowerCase());
    const matchCategory = !categoryId || p.category_id === Number(categoryId);
    return matchName && matchCategory;
  });

  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const paginatedProducts = filteredProducts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Hàm xóa sản phẩm (đã thêm)
  const handleDelete = (id) => {
    if (confirm(`Bạn chắc chắn muốn xóa sản phẩm ID ${id}?`)) {
      const index = products.findIndex((p) => p.id === id);
      if (index !== -1) {
        products.splice(index, 1);
        // Xóa variant liên quan (nếu có)
        const variantIndex = productVariants.findIndex((v) => v.product_id === id);
        if (variantIndex !== -1) {
          productVariants.splice(variantIndex, 1);
        }

        // Nếu trang hiện tại trống sau xóa → chuyển về trang trước
        if (paginatedProducts.length === 1 && currentPage > 1) {
          setCurrentPage(currentPage - 1);
        }

        alert("Xóa sản phẩm thành công!");
      }
    }
  };

  return (
    <div className="card shadow-sm border-0">
      <div className="card-body p-4">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h4 className="mb-0 fw-bold">Danh sách sản phẩm</h4>
          <Link to="/admin/products/create" className="btn btn-primary px-4">
            + Thêm sản phẩm
          </Link>
        </div>

        {/* Bộ lọc */}
        <div className="row g-3 mb-4">
          <div className="col-md-6">
            <input
              className="form-control"
              placeholder="Tìm theo tên sản phẩm..."
              value={keyword}
              onChange={(e) => {
                setKeyword(e.target.value);
                setCurrentPage(1);
              }}
            />
          </div>
          <div className="col-md-4">
            <select
              className="form-select"
              value={categoryId}
              onChange={(e) => {
                setCategoryId(e.target.value);
                setCurrentPage(1);
              }}
            >
              <option value="">-- Tất cả danh mục --</option>
              {categories.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name}
                </option>
              ))}
            </select>
          </div>
          <div className="col-md-2">
            <button
              className="btn btn-outline-secondary w-100"
              onClick={() => {
                setKeyword("");
                setCategoryId("");
                setCurrentPage(1);
              }}
            >
              Reset
            </button>
          </div>
        </div>

        {/* Bảng sản phẩm */}
        <div className="table-responsive">
          <table className="table table-hover table-bordered align-middle">
            <thead className="table-light">
              <tr>
                <th>ID</th>
                <th>Ảnh</th>
                <th>Tên sản phẩm</th>
                <th>Danh mục</th>
                <th>Giá từ</th>
                <th>Tồn kho</th>
                <th>Trạng thái</th>
                <th>Hành động</th>
              </tr>
            </thead>
            <tbody>
              {paginatedProducts.map((p) => {
                const totalStock = getTotalStock(p.id);
                const minPrice = getMinPrice(p.id, p.price || 0);

                return (
                  <tr key={p.id}>
                    <td>{p.id}</td>
                    <td>
                      {p.thumbnail ? (
                        <img
                          src={p.thumbnail}
                          alt={p.name}
                          width="60"
                          height="60"
                          style={{ objectFit: "cover", borderRadius: "6px" }}
                        />
                      ) : (
                        <div
                          className="bg-light text-center"
                          style={{ width: 60, height: 60, borderRadius: 6 }}
                        >
                          No img
                        </div>
                      )}
                    </td>
                    <td className="fw-medium">{p.name}</td>
                    <td>{getCategoryName(p.category_id)}</td>
                    <td className="text-danger fw-bold">
                      {minPrice.toLocaleString("vi-VN")} ₫
                    </td>
                    <td>
                      {totalStock > 0 ? (
                        <span className="badge bg-success">{totalStock}</span>
                      ) : (
                        <span className="badge bg-danger">Hết hàng</span>
                      )}
                    </td>
                    <td>
                      {p.status === 1 ? (
                        <span className="badge bg-success">Hoạt động</span>
                      ) : (
                        <span className="badge bg-secondary">Ẩn</span>
                      )}
                    </td>
                    <td>
                      <Link
                        to={`/admin/products/${p.id}/edit`}
                        className="btn btn-sm btn-warning me-2 px-3"
                      >
                        Sửa
                      </Link>
                      <Link
                        to={`/admin/products/${p.id}/variants`}
                        className="btn btn-sm btn-info me-2 px-3"
                      >
                        Variant
                      </Link>
                      <button
                        className="btn btn-sm btn-danger px-3"
                        onClick={() => handleDelete(p.id)} // Gọi hàm đã định nghĩa
                      >
                        Xóa
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Phân trang */}
        {totalPages > 1 && (
          <nav className="d-flex justify-content-center mt-4">
            <ul className="pagination mb-0">
              <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
                <button
                  className="page-link"
                  onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                >
                  Trước
                </button>
              </li>
              {[...Array(totalPages)].map((_, i) => (
                <li
                  key={i}
                  className={`page-item ${currentPage === i + 1 ? "active" : ""}`}
                >
                  <button className="page-link" onClick={() => setCurrentPage(i + 1)}>
                    {i + 1}
                  </button>
                </li>
              ))}
              <li
                className={`page-item ${currentPage === totalPages ? "disabled" : ""}`}
              >
                <button
                  className="page-link"
                  onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                >
                  Sau
                </button>
              </li>
            </ul>
          </nav>
        )}
      </div>
    </div>
  );
}
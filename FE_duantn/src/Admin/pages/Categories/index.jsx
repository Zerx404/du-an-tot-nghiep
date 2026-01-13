// src/Admin/pages/Categories/index.jsx
import { useState } from "react";
import { categories as initialCategories } from "../../../mock/categories.mock";

export default function Categories() {
  const [categories, setCategories] = useState(initialCategories);
  const [name, setName] = useState("");
  const [parentId, setParentId] = useState(""); // Danh mục cha (null nếu cấp 1)
  const [editingId, setEditingId] = useState(null); // ID đang sửa

  // Hàm thêm hoặc sửa danh mục
  const handleSave = () => {
    if (!name.trim()) {
      alert("Vui lòng nhập tên danh mục!");
      return;
    }

    if (editingId) {
      // Sửa danh mục
      setCategories(
        categories.map((c) =>
          c.id === editingId ? { ...c, name: name.trim(), parent_id: parentId ? Number(parentId) : null } : c
        )
      );
      alert("Cập nhật danh mục thành công!");
    } else {
      // Thêm mới
      const newCategory = {
        id: Date.now(),
        name: name.trim(),
        parent_id: parentId ? Number(parentId) : null,
      };
      setCategories([...categories, newCategory]);
      alert("Thêm danh mục thành công!");
    }

    // Reset form
    setName("");
    setParentId("");
    setEditingId(null);
  };

  // Hàm xóa danh mục (có kiểm tra con)
  const handleDelete = (id) => {
    const hasChildren = categories.some((c) => c.parent_id === id);
    if (hasChildren) {
      alert("Danh mục này đang có danh mục con! Không thể xóa.");
      return;
    }

    if (confirm("Bạn chắc chắn muốn xóa danh mục này?")) {
      setCategories(categories.filter((c) => c.id !== id));
      alert("Xóa danh mục thành công!");
    }
  };

  // Hàm bắt đầu sửa danh mục
  const handleEdit = (category) => {
    setName(category.name);
    setParentId(category.parent_id || "");
    setEditingId(category.id);
  };

  // Lấy tên danh mục cha
  const getParentName = (parentId) => {
    if (!parentId) return "— (Cấp 1)";
    const parent = categories.find((c) => c.id === parentId);
    return parent ? parent.name : "Không xác định";
  };

  return (
    <div className="page-heading">
      <h3 className="mb-4 fw-bold">Quản lý danh mục sản phẩm</h3>

      <div className="card shadow-sm border-0 mb-4">
        <div className="card-body p-4">
          <h5 className="mb-3">{editingId ? "Sửa danh mục" : "Thêm danh mục mới"}</h5>

          <div className="row g-3">
            <div className="col-md-6">
              <label className="form-label">Tên danh mục *</label>
              <input
                className="form-control"
                placeholder="Nhập tên danh mục"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>

            <div className="col-md-6">
              <label className="form-label">Danh mục cha (tùy chọn)</label>
              <select
                className="form-select"
                value={parentId}
                onChange={(e) => setParentId(e.target.value)}
              >
                <option value="">— Không có (Cấp 1) —</option>
                {categories
                  .filter((c) => c.id !== editingId) // Không cho chọn chính nó làm cha
                  .map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.name}
                    </option>
                  ))}
              </select>
            </div>

            <div className="col-12 mt-3">
              <button className="btn btn-primary me-2 px-4" onClick={handleSave}>
                {editingId ? "Cập nhật" : "Thêm mới"}
              </button>
              {editingId && (
                <button
                  className="btn btn-outline-secondary px-4"
                  onClick={() => {
                    setName("");
                    setParentId("");
                    setEditingId(null);
                  }}
                >
                  Hủy sửa
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Bảng danh sách */}
      <div className="card shadow-sm border-0">
        <div className="card-body p-4">
          <h5 className="mb-3">Danh sách danh mục</h5>

          {categories.length === 0 ? (
            <div className="alert alert-info text-center py-5">
              Chưa có danh mục nào. Hãy thêm danh mục mới!
            </div>
          ) : (
            <div className="table-responsive">
              <table className="table table-hover table-bordered align-middle">
                <thead className="table-light">
                  <tr>
                    <th>ID</th>
                    <th>Tên danh mục</th>
                    <th>Danh mục cha</th>
                    <th>Hành động</th>
                  </tr>
                </thead>
                <tbody>
                  {categories.map((c) => (
                    <tr key={c.id}>
                      <td className="fw-medium">{c.id}</td>
                      <td>{c.name}</td>
                      <td>{getParentName(c.parent_id)}</td>
                      <td>
                        <button
                          className="btn btn-sm btn-warning me-2 px-3"
                          onClick={() => handleEdit(c)}
                        >
                          Sửa
                        </button>
                        <button
                          className="btn btn-sm btn-danger px-3"
                          onClick={() => handleDelete(c.id)}
                        >
                          Xóa
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
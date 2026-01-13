// src/Admin/pages/Products/Create.jsx
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { products } from "../../../mock/products.mock";
import { categories } from "../../../mock/categories.mock";

export default function ProductCreate() {
  const navigate = useNavigate();
  const [preview, setPreview] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    slug: "",
    category_id: "",
    description: "",
    price: "",
    old_price: "",
    stock: "",
    status: "1",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));

    // Tự động tạo slug từ tên
    if (name === "name") {
      const slug = value
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/đ/g, "d")
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)/g, "");
      setFormData(prev => ({ ...prev, slug }));
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newProduct = {
      id: Date.now(),
      name: formData.name.trim(),
      slug: formData.slug || formData.name.toLowerCase().replace(/\s+/g, "-"),
      category_id: Number(formData.category_id),
      brand_id: 1, // Có thể thêm select brand sau
      description: formData.description.trim(),
      thumbnail: preview, // Trong thực tế sẽ upload lên server
      price: Number(formData.price),
      old_price: formData.old_price ? Number(formData.old_price) : null,
      stock: Number(formData.stock),
      status: Number(formData.status),
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };

    products.push(newProduct);
    alert("Thêm sản phẩm thành công!");
    navigate("/admin/products");
  };

  return (
    <div className="card shadow-sm border-0">
      <div className="card-body p-4">
        <h4 className="mb-4 fw-bold">Thêm sản phẩm mới</h4>

        <form onSubmit={handleSubmit}>
          <div className="row g-3">
            <div className="col-md-6">
              <label className="form-label">Tên sản phẩm *</label>
              <input
                name="name"
                className="form-control"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>

            <div className="col-md-6">
              <label className="form-label">Slug</label>
              <input
                name="slug"
                className="form-control"
                value={formData.slug}
                onChange={handleChange}
                placeholder="Tự động tạo từ tên"
              />
            </div>

            <div className="col-md-6">
              <label className="form-label">Danh mục *</label>
              <select
                name="category_id"
                className="form-select"
                value={formData.category_id}
                onChange={handleChange}
                required
              >
                <option value="">-- Chọn danh mục --</option>
                {categories.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="col-md-3">
              <label className="form-label">Giá bán *</label>
              <input
                name="price"
                type="number"
                className="form-control"
                value={formData.price}
                onChange={handleChange}
                required
              />
            </div>

            <div className="col-md-3">
              <label className="form-label">Giá cũ (nếu có)</label>
              <input
                name="old_price"
                type="number"
                className="form-control"
                value={formData.old_price}
                onChange={handleChange}
              />
            </div>

            <div className="col-md-3">
              <label className="form-label">Tồn kho *</label>
              <input
                name="stock"
                type="number"
                className="form-control"
                value={formData.stock}
                onChange={handleChange}
                required
              />
            </div>

            <div className="col-md-3">
              <label className="form-label">Trạng thái</label>
              <select
                name="status"
                className="form-select"
                value={formData.status}
                onChange={handleChange}
              >
                <option value="1">Còn hàng</option>
                <option value="0">Hết hàng</option>
              </select>
            </div>

            <div className="col-md-12">
              <label className="form-label">Ảnh đại diện</label>
              <input
                type="file"
                name="thumbnail"
                className="form-control"
                accept="image/*"
                onChange={handleFileChange}
              />
              {preview && (
                <img
                  src={preview}
                  alt="Preview"
                  className="mt-3 img-thumbnail"
                  style={{ maxWidth: "200px", borderRadius: "8px" }}
                />
              )}
            </div>

            <div className="col-md-12">
              <label className="form-label">Mô tả sản phẩm</label>
              <textarea
                name="description"
                rows="5"
                className="form-control"
                value={formData.description}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="mt-4">
            <button type="submit" className="btn btn-primary me-2 px-4">
              Lưu sản phẩm
            </button>
            <button
              type="button"
              className="btn btn-secondary px-4"
              onClick={() => navigate("/admin/products")}
            >
              Hủy
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
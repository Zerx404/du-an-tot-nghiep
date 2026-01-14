// src/Admin/pages/Products/Edit.jsx
import { useNavigate, useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { products, getProductById } from "../../../mock/products.mock";
import { categories } from "../../../mock/categories.mock";

export default function ProductEdit() {
  const navigate = useNavigate();
  const { id } = useParams();
  const product = getProductById(id);

  const [formData, setFormData] = useState({
    name: product?.name || "",
    slug: product?.slug || "",
    category_id: product?.category_id || "",
    description: product?.description || "",
    price: product?.price || "",
    old_price: product?.old_price || "",
    stock: product?.stock || "",
    status: product?.status || "1",
  });
  const [preview, setPreview] = useState(product?.thumbnail || "");

  useEffect(() => {
    if (!product) {
      navigate("/admin/products");
    }
  }, [product, navigate]);

  if (!product) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));

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

    const index = products.findIndex(p => p.id === Number(id));
    if (index === -1) return;

    products[index] = {
      ...products[index],
      name: formData.name.trim(),
      slug: formData.slug,
      category_id: Number(formData.category_id),
      description: formData.description.trim(),
      thumbnail: preview,
      price: Number(formData.price),
      old_price: formData.old_price ? Number(formData.old_price) : null,
      stock: Number(formData.stock),
      status: Number(formData.status),
      updated_at: new Date().toISOString(),
    };

    alert("Cập nhật sản phẩm thành công!");
    navigate("/admin/products");
  };

  return (
    <div className="card shadow-sm border-0">
      <div className="card-body p-4">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h4 className="mb-0 fw-bold">Sửa sản phẩm #{product.id}</h4>
          <Link to="/admin/products" className="btn btn-secondary">
            Quay lại danh sách
          </Link>
        </div>

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
              <label className="form-label">Giá cũ</label>
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
              Cập nhật
            </button>
            <Link to="/admin/products" className="btn btn-secondary px-4">
              Hủy
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
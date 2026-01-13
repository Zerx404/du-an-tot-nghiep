// src/Admin/pages/Products/Variants/Edit.jsx
import { useNavigate, useParams } from "react-router-dom";
import { useState } from "react";

export default function VariantEdit() {
  const navigate = useNavigate();
  const { id, variantId } = useParams();

  // Dữ liệu variant hiện tại (giả lập từ DB/mock)
  const [formData, setFormData] = useState({
    sku: "XPS13-I7-16GB-512GB",
    price: "28990000",
    stock: "5",
    description: "Biến thể cao cấp, RAM 16GB, SSD 512GB",
  });

  // Ảnh hiện có (lấy từ DB, chỉ hiển thị, không cần state setter nếu chưa xóa ảnh)
  const existingImages = [
    "https://images.unsplash.com/photo-1593640408182-31c70c826ce1?w=600",
    "https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?w=600",
  ];

  // Ảnh mới upload (preview)
  const [newImagePreviews, setNewImagePreviews] = useState([]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    if (files.length > 0) {
      const previews = files.map(file => URL.createObjectURL(file));
      setNewImagePreviews(previews);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Cập nhật biến thể ID ${variantId} cho sản phẩm ${id} thành công!`);
    navigate(`/admin/products/${id}/variants`);
  };

  return (
    <div className="card shadow-sm border-0">
      <div className="card-body p-4">
        <h4 className="mb-4 fw-bold">Sửa biến thể ID: {variantId}</h4>

        <form onSubmit={handleSubmit}>
          <div className="row g-3">
            {/* Các trường input khác giữ nguyên */}
            <div className="col-md-6">
              <label className="form-label">SKU *</label>
              <input
                name="sku"
                className="form-control"
                value={formData.sku}
                onChange={handleChange}
                required
              />
            </div>

            <div className="col-md-6">
              <label className="form-label">Giá *</label>
              <input
                name="price"
                type="number"
                className="form-control"
                value={formData.price}
                onChange={handleChange}
                required
              />
            </div>

            <div className="col-md-6">
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

            <div className="col-md-6">
              <label className="form-label">Mô tả biến thể</label>
              <textarea
                name="description"
                rows="2"
                className="form-control"
                value={formData.description}
                onChange={handleChange}
              />
            </div>

            {/* Ảnh hiện có - chỉ hiển thị, không cần state setter */}
            <div className="col-md-12">
              <label className="form-label">Ảnh hiện có</label>
              <div className="d-flex flex-wrap gap-3 mb-3">
                {existingImages.map((src, index) => (
                  <img
                    key={index}
                    src={src}
                    alt={`Ảnh hiện có ${index + 1}`}
                    width="100"
                    height="100"
                    style={{ objectFit: "cover", borderRadius: "8px", border: "1px solid #dee2e6" }}
                  />
                ))}
              </div>

              <label className="form-label">Thêm ảnh mới (có thể chọn nhiều)</label>
              <input
                type="file"
                name="images"
                className="form-control"
                accept="image/*"
                multiple
                onChange={handleImageChange}
              />

              {newImagePreviews.length > 0 && (
                <div className="mt-3 d-flex flex-wrap gap-3">
                  {newImagePreviews.map((src, index) => (
                    <img
                      key={index}
                      src={src}
                      alt={`Ảnh mới ${index + 1}`}
                      width="100"
                      height="100"
                      style={{ objectFit: "cover", borderRadius: "8px" }}
                    />
                  ))}
                </div>
              )}
            </div>

            <div className="col-12 mt-4">
              <button type="submit" className="btn btn-primary me-3 px-4">
                Cập nhật biến thể
              </button>
              <button
                type="button"
                className="btn btn-secondary px-4"
                onClick={() => navigate(`/admin/products/${id}/variants`)}
              >
                Hủy
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
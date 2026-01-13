// src/Admin/pages/Products/Variants/Create.jsx
import { useNavigate, useParams } from "react-router-dom";
import { useState } from "react";

export default function VariantCreate() {
  const navigate = useNavigate();
  const { id } = useParams(); // ID của sản phẩm cha

  const [formData, setFormData] = useState({
    sku: "",
    price: "",
    stock: "",
    description: "",
  });

  const [previewImages, setPreviewImages] = useState([]); // Chỉ dùng để preview tạm thời

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      const previews = Array.from(files).map((file) => URL.createObjectURL(file));
      setPreviewImages(previews);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Lấy file thật trực tiếp từ input (không cần state)
    const fileInput = e.target.images;
    // const files = fileInput.files; 

    // Đây là FileList thật để gửi lên server


    alert(`Thêm biến thể mới cho sản phẩm ID ${id} thành công!`);

    // Reset form
    setFormData({
      sku: "",
      price: "",
      stock: "",
      description: "",
    });
    setPreviewImages([]);
    fileInput.value = ""; // Reset input file

    navigate(`/admin/products/${id}/variants`);
  };

  return (
    <div className="card shadow-sm border-0">
      <div className="card-body p-4">
        <h4 className="mb-4 fw-bold">Thêm biến thể mới cho sản phẩm ID: {id}</h4>

        <form onSubmit={handleSubmit}>
          <div className="row g-3">
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
              <label className="form-label">Mô tả biến thể (tùy chọn)</label>
              <textarea
                name="description"
                rows="2"
                className="form-control"
                value={formData.description}
                onChange={handleChange}
              />
            </div>

            <div className="col-md-12">
              <label className="form-label">Ảnh biến thể (có thể chọn nhiều ảnh)</label>
              <input
                type="file"
                name="images"
                className="form-control"
                accept="image/*"
                multiple
                onChange={handleImageChange}
              />

              {/* Preview ảnh */}
              {previewImages.length > 0 && (
                <div className="mt-3 d-flex flex-wrap gap-3">
                  {previewImages.map((src, index) => (
                    <img
                      key={index}
                      src={src}
                      alt={`Preview ${index + 1}`}
                      width="100"
                      height="100"
                      style={{ objectFit: "cover", borderRadius: "8px", border: "1px solid #dee2e6" }}
                    />
                  ))}
                </div>
              )}
            </div>

            <div className="col-12 mt-4">
              <button type="submit" className="btn btn-primary me-3 px-4">
                Lưu biến thể
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
<!DOCTYPE html>
<html lang="vi">
<head>
    <meta charset="UTF-8">
    <title>Test CRUD Categories</title>
    <style>
        body { font-family: Arial; }
        input, button { margin: 4px; }
        li { margin: 6px 0; }
    </style>
</head>
<body>

<h2>THÊM / SỬA DANH MỤC</h2>

<input type="hidden" id="category-id">

<input type="text" id="name" placeholder="Tên danh mục">
<input type="number" id="parent_id" placeholder="Parent ID (có thể để trống)">
<button onclick="saveCategory()">Lưu</button>
<button onclick="resetForm()">Reset</button>

<hr>

<h2>DANH SÁCH DANH MỤC</h2>
<ul id="category-list"></ul>

<script>
const API_URL = 'http://127.0.0.1:8000/api/categories';

// ==================== LOAD LIST ====================
function loadCategories() {
    fetch(API_URL)
        .then(res => res.json())
        .then(data => {
            const ul = document.getElementById('category-list');
            ul.innerHTML = '';

            data.forEach(item => {
                const li = document.createElement('li');

                li.innerHTML = `
                    ${item.id} - ${item.name} (parent_id: ${item.parent_id})
                    <button onclick="editCategory(${item.id}, '${item.name}', ${item.parent_id})">Sửa</button>
                    <button onclick="deleteCategory(${item.id})">Xóa</button>
                `;

                ul.appendChild(li);
            });
        });
}

// ==================== CREATE / UPDATE ====================
function saveCategory() {
    const id = document.getElementById('category-id').value;
    const name = document.getElementById('name').value;
    const parentId = document.getElementById('parent_id').value || null;

    const data = {
        name: name,
        parent_id: parentId
    };

    let url = API_URL;
    let method = 'POST';

    if (id) {
        url = `${API_URL}/${id}`;
        method = 'PUT';
    }

    fetch(url, {
        method: method,
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then(res => res.json())
    .then(() => {
        resetForm();
        loadCategories();
    });
}

// ==================== EDIT ====================
function editCategory(id, name, parentId) {
    document.getElementById('category-id').value = id;
    document.getElementById('name').value = name;
    document.getElementById('parent_id').value = parentId ?? '';
}

// ==================== DELETE ====================
function deleteCategory(id) {
    if (!confirm('Xóa danh mục này?')) return;

    fetch(`${API_URL}/${id}`, {
        method: 'DELETE',
        headers: {
            'Accept': 'application/json'
        }
    })
    .then(() => loadCategories());
}

// ==================== RESET ====================
function resetForm() {
    document.getElementById('category-id').value = '';
    document.getElementById('name').value = '';
    document.getElementById('parent_id').value = '';
}

// Load khi mở trang
loadCategories();
</script>

</body>
</html>

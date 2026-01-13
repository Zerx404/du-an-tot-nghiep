<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Category;
use Illuminate\Http\Request;

class CategoryController extends Controller
{
    // GET /api/categories
    public function index()
    {
        return Category::all();
    }

    // POST /api/categories
    public function store(Request $request)
    {
        $request->validate([
            // cái max100 là giới hạn độ dài tên danh mục, tránh gây lỗi khi mình lưu vào db nhiều hơn số varchar đã đặt
            'name' => 'required|max:100',
            'parent_id' => 'nullable|exists:categories,id'
        ]);

        return Category::create($request->only('name', 'parent_id'));
    }

    // GET /api/categories/{id}
    public function show($id)
    {
        return Category::findOrFail($id);
    }

    // PUT /api/categories/{id}
    public function update(Request $request, $id)
    {
        $category = Category::findOrFail($id);

        $request->validate([
            'name' => 'required|max:100',
            'parent_id' => 'nullable|exists:categories,id'
        ]);

        $category->update($request->only('name', 'parent_id'));

        return $category;
    }

    // DELETE /api/categories/{id}
    public function destroy($id)
    {
        Category::findOrFail($id)->delete();

        return response()->json(['message' => 'Deleted']);
    }
}

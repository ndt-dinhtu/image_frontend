import { useState, useEffect } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const UpdateCategoryModal = ({ category, onClose, onUpdateSuccess }) => {
  const [updatedCategory, setUpdatedCategory] = useState({
    name: category.name,
    description: category.description,
  });

  const updateCategory = async () => {
    try {
      await axios.put(
        `http://localhost:5000/api/categories/${category._id}`,
        updatedCategory
      );
      toast.success("Category updated successfully!");
      onUpdateSuccess(); // Cập nhật lại danh sách category
      onClose(); // Đóng modal
    } catch (err) {
      console.error("Error updating category", err);
      toast.error("Failed to update category.");
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-5 rounded shadow-lg w-1/2">
        <h2 className="text-2xl font-bold mb-4">Update Category</h2>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">Name</label>
          <input
            type="text"
            className="border p-2 w-full"
            value={updatedCategory.name}
            onChange={(e) =>
              setUpdatedCategory({ ...updatedCategory, name: e.target.value })
            }
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">Description</label>
          <input
            type="text"
            className="border p-2 w-full"
            value={updatedCategory.description}
            onChange={(e) =>
              setUpdatedCategory({
                ...updatedCategory,
                description: e.target.value,
              })
            }
          />
        </div>
        <div className="flex justify-end">
          <button
            className="bg-gray-500 text-white px-4 py-2 rounded mr-2"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded"
            onClick={updateCategory}
          >
            Update
          </button>
        </div>
      </div>
    </div>
  );
};

const Admin = () => {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [images, setImages] = useState([]);
  const [isCategoryView, setIsCategoryView] = useState(true);
  const [newCategory, setNewCategory] = useState({ name: "", description: "" });
  const [newImage, setNewImage] = useState({
    name: "",
    descriptionLink: "",
    categoryName: "",
  });

  const fetchCategories = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/categories");
      setCategories(res.data);
    } catch (err) {
      console.error("Error fetching categories", err);
      toast.error("Failed to fetch categories.");
    }
  };

  const fetchImages = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/images");
      setImages(res.data);
    } catch (err) {
      console.error("Error fetching images", err);
      toast.error("Failed to fetch images.");
    }
  };

  const deleteCategory = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/categories/${id}`);
      fetchCategories();
      toast.success("Category deleted successfully!");
    } catch (err) {
      console.error("Error deleting category", err);
      toast.error("Failed to delete category.");
    }
  };

  const deleteImage = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/images/${id}`);
      fetchImages();
      toast.success("Image deleted successfully!");
    } catch (err) {
      console.error("Error deleting image", err);
      toast.error("Failed to delete image.");
    }
  };

  const createCategory = async () => {
    try {
      await axios.post("http://localhost:5000/api/categories", newCategory);
      fetchCategories();
      toast.success("Category created successfully!");
    } catch (err) {
      console.error("Error creating category", err);
      toast.error("Failed to create category.");
    }
  };

  const createImage = async () => {
    try {
      await axios.post("http://localhost:5000/api/images", newImage);
      fetchImages();
      toast.success("Image created successfully!");
    } catch (err) {
      console.error("Error creating image", err);
      toast.error("Failed to create image.");
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  useEffect(() => {
    fetchImages();
  }, []);

  return (
    <div className="p-5">
      <h1 className="text-3xl font-bold mb-5">Admin Dashboard</h1>

      <div className="mb-5">
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded mr-2"
          onClick={() => setIsCategoryView(true)}
        >
          View Categories
        </button>
        <button
          className="bg-green-500 text-white px-4 py-2 rounded"
          onClick={() => setIsCategoryView(false)}
        >
          View Images
        </button>
      </div>

      {isCategoryView ? (
        <>
          <div className="mb-5">
            <h2 className="text-2xl font-semibold">Create Category</h2>
            <input
              type="text"
              className="border p-2 mr-2"
              placeholder="Category Name"
              value={newCategory.name}
              onChange={(e) =>
                setNewCategory({ ...newCategory, name: e.target.value })
              }
            />
            <input
              type="text"
              className="border p-2 mr-2"
              placeholder="Description"
              value={newCategory.description}
              onChange={(e) =>
                setNewCategory({ ...newCategory, description: e.target.value })
              }
            />
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded"
              onClick={createCategory}
            >
              Add Category
            </button>
          </div>

          <h2 className="text-2xl font-semibold mb-3">Categories</h2>
          <table className="min-w-full border-collapse border border-gray-200">
            <thead>
              <tr>
                <th className="border p-2">Name</th>
                <th className="border p-2">Description</th>
                <th className="border p-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {categories.map((category) => (
                <tr key={category._id}>
                  <td className="border p-2">{category.name}</td>
                  <td className="border p-2">{category.description}</td>
                  <td className="border p-2">
                    <button
                      className="bg-yellow-500 text-white px-2 py-1 rounded mr-2"
                      onClick={() => setSelectedCategory(category)}
                    >
                      Edit
                    </button>
                    <button
                      className="bg-red-500 text-white px-2 py-1 rounded"
                      onClick={() => deleteCategory(category._id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      ) : (
        <>
          <div className="mb-5">
            <h2 className="text-2xl font-semibold">Create Image</h2>
            <input
              type="text"
              className="border p-2 mr-2"
              placeholder="Image Name"
              value={newImage.name}
              onChange={(e) =>
                setNewImage({ ...newImage, name: e.target.value })
              }
            />
            <input
              type="text"
              className="border p-2 mr-2"
              placeholder="Description Link"
              value={newImage.descriptionLink}
              onChange={(e) =>
                setNewImage({ ...newImage, descriptionLink: e.target.value })
              }
            />
            <input
              type="text"
              className="border p-2 mr-2"
              placeholder="Category Name"
              value={newImage.categoryName}
              onChange={(e) =>
                setNewImage({ ...newImage, categoryName: e.target.value })
              }
            />
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded"
              onClick={createImage}
            >
              Add Image
            </button>
          </div>

          <h2 className="text-2xl font-semibold mb-3">Images</h2>
          <table className="min-w-full border-collapse border border-gray-200">
            <thead>
              <tr>
                <th className="border p-2">imageUrl</th>
                <th className="border p-2">Name</th>
                <th className="border p-2">Description Link</th>
                <th className="border p-2">Category</th>
                <th className="border p-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {images.map((image) => (
                <tr key={image._id}>
                  <td className="border p-2">
                    <img
                      src={`http://localhost:5000/${image.imageUrl}`}
                      alt={image.name}
                      className="w-full h-40 object-cover"
                    />
                  </td>
                  <td className="border p-2">{image.name}</td>
                  <td className="border p-2">{image.descriptionLink}</td>
                  <td className="border p-2">{image.category.name}</td>
                  <td className="border p-2">
                    <button
                      className="bg-yellow-500 text-white px-2 py-1 rounded mr-2"
                      onClick={() => alert("Edit functionality here")}
                    >
                      Edit
                    </button>
                    <button
                      className="bg-red-500 text-white px-2 py-1 rounded"
                      onClick={() => deleteImage(image._id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}

      {selectedCategory && (
        <UpdateCategoryModal
          category={selectedCategory}
          onClose={() => setSelectedCategory(null)}
          onUpdateSuccess={fetchCategories}
        />
      )}

      <ToastContainer position="top-center" autoClose={5000} theme="dark" />
    </div>
  );
};

export default Admin;


import { toast } from "react-toastify";
import { createCategory, deleteCategory } from "../../api/admin";
import CreateCategory from "./CreateCategory";

const CategoryView = ({ categories, loadCategories, setSelectedCategory }) => {
  const handleDeleteCategory = async (id) => {
    try {
      await deleteCategory(id);
      loadCategories();
      toast.success("Category deleted successfully!");
    } catch (error) {
      console.error(error);
      toast.error("Failed to delete category.");
    }
  };

  return (
    <div>
      <CreateCategory loadCategories={loadCategories} />
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
                  onClick={() => handleDeleteCategory(category._id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CategoryView;

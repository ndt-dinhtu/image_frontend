import { useState } from "react";
import { toast } from "react-toastify";
import { createCategory } from "../../api/admin";

const CreateCategory = ({ loadCategories }) => {
  const [newCategory, setNewCategory] = useState({ name: "", description: "" });

  const handleCreateCategory = async () => {
    try {
      await createCategory(newCategory);
      loadCategories();
      toast.success("Category created successfully!");
    } catch (error) {
      console.error(error);
      toast.error("Failed to create category.");
    }
  };

  return (
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
        onClick={handleCreateCategory}
      >
        Add Category
      </button>
    </div>
  );
};

export default CreateCategory;

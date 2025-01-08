import { useState } from "react";
import { toast } from "react-toastify";
import { createCategory } from "../../api/admin";
import PropTypes from "prop-types";

const CreateCategory = ({ loadCategories }) => {
  const [newCategory, setNewCategory] = useState({ name: "", description: "" });

  const handleCreateCategory = async () => {

    if (!newCategory.name || !newCategory.description) {
      toast.error("Vui lòng nhập đủ thông tin!");
      return;
    }

    try {

      await createCategory(newCategory);
      loadCategories();
      toast.success("Category created successfully!");
      setNewCategory({ name: "", description: "" });
    } catch (error) {
      if (error.response && error.response.data && error.response.data.message) {
        toast.error(`Server Error: ${error.response.data.message}`);
      } else {
        toast.error("Failed to create category. Please try again later.");
      }
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

CreateCategory.propTypes = {
  loadCategories: PropTypes.func.isRequired,
};

export default CreateCategory;

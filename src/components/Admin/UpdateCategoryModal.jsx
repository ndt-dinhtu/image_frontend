import axios from "axios";
import { useState } from "react";
import { toast } from "react-toastify";

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
        onUpdateSuccess(); 
        onClose(); 
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
  
  export default UpdateCategoryModal;
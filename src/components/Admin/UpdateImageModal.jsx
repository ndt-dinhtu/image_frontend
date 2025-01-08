import axios from "axios";
import { useState } from "react";
import { toast } from "react-toastify";
import PropTypes from "prop-types"; // Thêm import PropTypes

const UpdateImageModal = ({ image, onClose, onUpdateSuccess }) => {
  const [updatedImage, setUpdatedImage] = useState({
    name: image.name,
    shortDescription: image.shortDescription,
    descriptionLink: image.descriptionLink,
    categoryName: image.category.name,
    imageFile: null,
  });

  const updateImage = async () => {
    try {
      const formData = new FormData();
      Object.entries(updatedImage).forEach(([key, value]) => {
        if (value !== null) {
          formData.append(key, value);
        }
      });

      await axios.put(
        `http://localhost:5000/api/images/${image._id}`,
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );
      toast.success("Image updated successfully!");
      onUpdateSuccess();
      onClose();
    } catch (err) {
      console.error("Error updating image", err);
      toast.error("Failed to update image.");
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-5 rounded shadow-lg w-1/2">
        <h2 className="text-2xl font-bold mb-4">Update Image</h2>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">Name</label>
          <input
            type="text"
            className="border p-2 w-full"
            value={updatedImage.name}
            onChange={(e) =>
              setUpdatedImage({ ...updatedImage, name: e.target.value })
            }
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">Short Description</label>
          <input
            type="text"
            className="border p-2 w-full"
            value={updatedImage.shortDescription}
            onChange={(e) =>
              setUpdatedImage({
                ...updatedImage,
                shortDescription: e.target.value,
              })
            }
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">Description Link</label>
          <input
            type="text"
            className="border p-2 w-full"
            value={updatedImage.descriptionLink}
            onChange={(e) =>
              setUpdatedImage({
                ...updatedImage,
                descriptionLink: e.target.value,
              })
            }
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">Category Name</label>
          <input
            type="text"
            className="border p-2 w-full"
            value={updatedImage.categoryName}
            onChange={(e) =>
              setUpdatedImage({ ...updatedImage, categoryName: e.target.value })
            }
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">Image</label>
          <input
            type="file"
            onChange={(e) =>
              setUpdatedImage({ ...updatedImage, imageFile: e.target.files[0] })
            }
            className="border p-2 w-full"
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
            onClick={updateImage}
          >
            Update
          </button>
        </div>
      </div>
    </div>
  );
};

UpdateImageModal.propTypes = {
  image: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    shortDescription: PropTypes.string.isRequired,
    descriptionLink: PropTypes.string.isRequired,
    category: PropTypes.shape({
      name: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
  onClose: PropTypes.func.isRequired,
  onUpdateSuccess: PropTypes.func.isRequired,
};

export default UpdateImageModal;

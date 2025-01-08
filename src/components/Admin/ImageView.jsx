import { toast } from "react-toastify";
import { deleteImage } from "../../api/admin";
import { useState } from "react";
import PropTypes from "prop-types";
import CreateImage from "./CreateImage";
import UpdateImageModal from "./UpdateImageModal";

const ImageView = ({ images, loadImages }) => {
  const [editingImage, setEditingImage] = useState(null); 

  const handleDeleteImage = async (id) => {
    try {
      await deleteImage(id);
      loadImages();
      toast.success("Image deleted successfully!");
    } catch (error) {
      console.error(error);
      toast.error("Failed to delete image.");
    }
  };

  const handleEdit = (image) => {
    setEditingImage(image); 
  };

  const handleCloseEditModal = () => {
    setEditingImage(null); 
  };

  const handleUpdateSuccess = () => {
    loadImages(); 
  };

  return (
    <div>
      <CreateImage loadImages={loadImages} />
      <h2 className="text-2xl font-semibold mb-3">Images</h2>

      {editingImage && (
        <UpdateImageModal
          image={editingImage}
          onClose={handleCloseEditModal}
          onUpdateSuccess={handleUpdateSuccess}
        />
      )}

      <table className="min-w-full border-collapse border border-gray-200">
        <thead>
          <tr>
            <th className="border p-2">Image</th>
            <th className="border p-2">Name</th>
            <th className="border p-2">Category</th>
            <th className="border p-2">Description Link</th>
            <th className="border p-2">shortDescription</th>
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
              <td className="border p-2">{image.category.name}</td>
              <td className="border p-2">{image.descriptionLink}</td>
              <td className="border p-2">{image.shortDescription}</td>
              <td className="border p-2">
                <button
                  className="bg-yellow-500 text-white px-2 py-1 rounded mr-2"
                  onClick={() => handleEdit(image)} 
                >
                  Edit
                </button>
                <button
                  className="bg-red-500 text-white px-2 py-1 rounded"
                  onClick={() => handleDeleteImage(image._id)}
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

ImageView.propTypes = {
  images: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      descriptionLink: PropTypes.string.isRequired,
      imageUrl: PropTypes.string.isRequired,
      category: PropTypes.shape({
        name: PropTypes.string.isRequired,
      }).isRequired,
    })
  ).isRequired,
  loadImages: PropTypes.func.isRequired,
};

export default ImageView;

import { useState } from "react";
import { toast } from "react-toastify";
import { createImage } from "../../api/admin";

const CreateImage = ({ loadImages }) => {
  const [newImage, setNewImage] = useState({
    name: "",
    descriptionLink: "",
    categoryName: "",
  });

  const handleCreateImage = async () => {
    try {
      await createImage(newImage);
      loadImages();
      toast.success("Image created successfully!");
    } catch (error) {
      console.error(error);
      toast.error("Failed to create image.");
    }
  };

  return (
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
        onClick={handleCreateImage}
      >
        Add Image
      </button>
    </div>
  );
};

export default CreateImage;

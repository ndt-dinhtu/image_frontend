import { useState } from "react";
import { toast } from "react-toastify";
import { createImage } from "../../api/admin";
import PropTypes from "prop-types";

const CreateImage = ({ loadImages }) => {
  const [formData, setFormData] = useState({
    name: "",
    shortDescription: "",
    descriptionLink: "",
    categoryName: "",
    imageFile: null,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, imageFile: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const {
        name,
        shortDescription,
        descriptionLink, 
        categoryName,
        imageFile,
      } = formData;

      const formDataToSend = new FormData();
      formDataToSend.append("name", name);
      formDataToSend.append("shortDescription", shortDescription);
      formDataToSend.append("descriptionLink", descriptionLink);
      formDataToSend.append("categoryName", categoryName);
      formDataToSend.append("image", imageFile);

      await createImage(formDataToSend);
      loadImages();
      toast.success("Image created successfully!");
      setFormData({
        name: "",
        shortDescription: "",
        descriptionLink: "",
        categoryName: "",
        imageFile: "",
      });
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="name"
        value={formData.name}
        onChange={handleInputChange}
        placeholder="Name"
        required
        className="border p-2 mb-2"
      />
      <input
        type="text"
        name="shortDescription"
        value={formData.shortDescription}
        onChange={handleInputChange}
        placeholder="Short Description"
        required
        className="border p-2 mb-2"
      />
      <input
        type="text"
        name="descriptionLink"
        value={formData.descriptionLink}
        onChange={handleInputChange}
        placeholder="Description Link"
        required
        className="border p-2 mb-2"
      />
      <input
        type="text"
        name="categoryName"
        value={formData.categoryName}
        onChange={handleInputChange}
        placeholder="Category Name"
        required
        className="border p-2 mb-2"
      />
      <input
        type="file"
        onChange={handleFileChange}
        required
        className="border p-2 mb-2"
      />
      <button type="submit" className="bg-blue-500 text-white px-4 py-2">
        Add Image
      </button>
    </form>
  );
};

CreateImage.propTypes = {
  loadImages: PropTypes.func.isRequired, 
};



export default CreateImage;

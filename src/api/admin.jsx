import axios from "axios";

const API_URL = "http://localhost:5000/api";

// Fetch categories
export const fetchCategories = async () => {
  try {
    const response = await axios.get(`${API_URL}/categories`);
    return response.data;
  } catch (error) {
    if (error.response && error.response.data && error.response.data.message) {
      throw new Error(error.response.data.message);
    }
    throw new Error("Error fetching categories");
  }
};

// Create category
export const createCategory = async (categoryData) => {
  try {
    await axios.post(`${API_URL}/categories`, categoryData);
  } catch (error) {
    if (error.response && error.response.data && error.response.data.message) {
      throw new Error(error.response.data.message);
    }
    throw new Error("Error creating category");
  }
};

// Delete category
export const deleteCategory = async (id) => {
  try {
    await axios.delete(`${API_URL}/categories/${id}`);
  } catch (error) {
    if (error.response && error.response.data && error.response.data.message) {
      throw new Error(error.response.data.message);
    }
    throw new Error("Error deleting category");
  }
};

// Fetch images
export const fetchImages = async () => {
  try {
    const response = await axios.get(`${API_URL}/images`);
    return response.data;
  } catch (error) {
    if (error.response && error.response.data && error.response.data.message) {
      throw new Error(error.response.data.message);
    }
    throw new Error("Error fetching images");
  }
};

// Create image API
export const createImage = async (imageData) => {
  try {
    const response = await axios.post(`${API_URL}/images`, imageData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return response.data;
  } catch (error) {
    if (error.response && error.response.data && error.response.data.message) {
      throw new Error(error.response.data.message);
    }
    throw new Error("Error creating image");
  }
};

// Delete image
export const deleteImage = async (id) => {
  try {
    await axios.delete(`${API_URL}/images/${id}`);
  } catch (error) {
    if (error.response && error.response.data && error.response.data.message) {
      throw new Error(error.response.data.message);
    }
    throw new Error("Error deleting image");
  }
};

// Update image
export const updateImage = async (id, imageData) => {
  try {
    const formData = new FormData();
    Object.entries(imageData).forEach(([key, value]) => {
      formData.append(key, value);
    });
    await axios.put(`${API_URL}/images/${id}`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
  } catch (error) {
    if (error.response && error.response.data && error.response.data.message) {
      throw new Error(error.response.data.message);
    }
    throw new Error("Error updating image");
  }
};

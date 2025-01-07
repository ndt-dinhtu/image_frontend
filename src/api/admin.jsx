import axios from "axios";

const API_URL = "http://localhost:5000/api";

// Fetch categories
export const fetchCategories = async () => {
  try {
    const response = await axios.get(`${API_URL}/categories`);
    return response.data;
  } catch (error) {
    throw new Error("Error fetching categories");
  }
};

// Fetch images
export const fetchImages = async () => {
  try {
    const response = await axios.get(`${API_URL}/images`);
    return response.data;
  } catch (error) {
    throw new Error("Error fetching images");
  }
};

// Create category
export const createCategory = async (categoryData) => {
  try {
    await axios.post(`${API_URL}/categories`, categoryData);
  } catch (error) {
    throw new Error("Error creating category");
  }
};

// Create image
export const createImage = async (imageData) => {
  try {
    await axios.post(`${API_URL}/images`, imageData);
  } catch (error) {
    throw new Error("Error creating image");
  }
};

// Delete category
export const deleteCategory = async (id) => {
  try {
    await axios.delete(`${API_URL}/categories/${id}`);
  } catch (error) {
    throw new Error("Error deleting category");
  }
};

// Delete image
export const deleteImage = async (id) => {
  try {
    await axios.delete(`${API_URL}/images/${id}`);
  } catch (error) {
    throw new Error("Error deleting image");
  }
};

import axios from "axios";

const BASE_URL = "http://localhost:5000/api";

export const fetchCategories = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/categories`);
    return response.data;
  } catch (error) {
    console.error("Error fetching categories:", error);
    throw error;
  }
};

export const fetchImagesByCategory = async (categoryName, skip = 0, limit = 24) => {
  try {
    const response = await axios.get(
      `${BASE_URL}/images/category/${categoryName}?skip=${skip}&limit=${limit}`
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching images by category:", error);
    throw error;
  }
};

export const searchImages = async (query) => {
  try {
    const response = await axios.get(`${BASE_URL}/images/search?name=${query}`);
    return response.data;
  } catch (error) {
    console.error("Error searching images:", error);
    throw error;
  }
};

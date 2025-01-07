import { useState, useEffect } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import UpdateCategoryModal from "./UpdateCategoryModal";
import CategoryView from "./CategoryView";
import ImageView from "./ImageView";
import { fetchCategories, fetchImages } from "../../api/admin";

const Admin = () => {
  const [categories, setCategories] = useState([]);
  const [images, setImages] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [isCategoryView, setIsCategoryView] = useState(true);

  const loadCategories = async () => {
    const categoriesData = await fetchCategories();
    setCategories(categoriesData);
  };

  const loadImages = async () => {
    const imagesData = await fetchImages();
    setImages(imagesData);
  };

  useEffect(() => {
    loadCategories();
    loadImages();
  }, []);

  return ( 
    <div className="p-5">
      <h1 className="text-3xl font-bold mb-5">Admin Dashboard</h1>

      <div className="mb-5">
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded mr-2"
          onClick={() => setIsCategoryView(true)}
        >
          View Categories
        </button>
        <button
          className="bg-green-500 text-white px-4 py-2 rounded"
          onClick={() => setIsCategoryView(false)}
        >
          View Images
        </button>
      </div>

      {isCategoryView ? (
        <CategoryView
          categories={categories}
          loadCategories={loadCategories}
          setSelectedCategory={setSelectedCategory}
        />
      ) : (
        <ImageView images={images} loadImages={loadImages} />
      )}

      {selectedCategory && (
        <UpdateCategoryModal
          category={selectedCategory}
          onClose={() => setSelectedCategory(null)}
          onUpdateSuccess={loadCategories}
        />
      )}

      <ToastContainer position="top-center" autoClose={5000} theme="dark" />
    </div>
  );
};

export default Admin;

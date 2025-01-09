import { useState, useEffect } from "react";
import SearchBar from "./SearchBar";
import CategoryList from "./CategoryList";
import ImageGrid from "./ImageGrid";
import Pagination from "./Pagination";

import {
  fetchCategories,
  fetchImagesByCategory,
  searchImages,
} from "../../api/user";

const User = () => {
  const [categories, setCategories] = useState([]);
  const [images, setImages] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const loadCategories = async () => {
      try {
        const categoriesData = await fetchCategories();
        setCategories(categoriesData);
      } catch (error) {
        console.error("Error loading categories:", error);
      }
    };
    loadCategories();
  }, []);

  const handleCategoryClick = async (category) => {
    setSelectedCategory(category);
    setSearchQuery("");
    setCurrentPage(1);
    loadImagesByCategory(category.name, 1);
  };

  const loadImagesByCategory = async (categoryName, page) => {
    setLoading(true);
    try {
      const skip = (page - 1) * 24;
      const data = await fetchImagesByCategory(categoryName, skip, 24);
      setImages(data.images || []);
      setTotalPages(data.totalPages);
      setLoading(false);
    } catch (error) {
      console.error("Error loading images:", error);
      setLoading(false);
    }
  };

  const handleSearch = async (query) => {
    setSearchQuery(query);
    if (query === "") {
      if (selectedCategory) {
        loadImagesByCategory(selectedCategory.name, 1);
      }
    } else {
      setLoading(true);
      try {
        const results = await searchImages(query);
        setImages(results);
        setLoading(false);
        setTotalPages(1);
      } catch (error) {
        console.error("Error searching images:", error);
        setLoading(false);
      }
    }
  };

  return (
    <div className="container mx-auto p-4">
      <SearchBar searchQuery={searchQuery} onSearchChange={handleSearch} />
      <CategoryList
        categories={categories}
        selectedCategory={selectedCategory}
        onCategoryClick={handleCategoryClick}
      />
      {selectedCategory && (
        <ImageGrid
          images={images}
          loading={loading}
          searchQuery={searchQuery}
        />
      )}
      {searchQuery === "" && (
        <Pagination
          totalPages={totalPages}
          currentPage={currentPage}
          onPageClick={(page) => {
            setCurrentPage(page);
            if (selectedCategory) {
              loadImagesByCategory(selectedCategory.name, page);
            }
          }}
        />
      )}
    </div>
  );
};

export default User;

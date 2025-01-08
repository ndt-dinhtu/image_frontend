import { useState, useEffect } from "react";
import axios from "axios";
import SearchBar from "./SearchBar";
import CategoryList from "./CategoryList";
import ImageGrid from "./ImageGrid";
import Pagination from "./Pagination";

const User = () => {
  const [categories, setCategories] = useState([]);
  const [images, setImages] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/categories");
        setCategories(response.data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };
    fetchCategories();
  }, []);

  const fetchImagesByCategory = async (categoryName, page) => {
    setLoading(true);
    try {
      const skip = (page - 1) * 24;
      const response = await axios.get(
        `http://localhost:5000/api/images/category/${categoryName}?skip=${skip}&limit=24`
      );
      setImages(response.data.images || []);
      setTotalPages(response.data.totalPages);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching images:", error);
      setLoading(false);
    }
  };

  const handleSearch = async (query) => {
    setSearchQuery(query);
    if (query === "") {
      if (selectedCategory) {
        fetchImagesByCategory(selectedCategory.name, 1);
      }
    } else {
      setLoading(true);
      try {
        const response = await axios.get(
          `http://localhost:5000/api/images/search?name=${query}`
        );
        setImages(response.data);
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
        onCategoryClick={(category) => {
          setSelectedCategory(category);
          setSearchQuery("");
          setCurrentPage(1);
          fetchImagesByCategory(category.name, 1);
        }}
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
              fetchImagesByCategory(selectedCategory.name, page);
            }
          }}
        />
      )}
    </div>
  );
};

export default User;

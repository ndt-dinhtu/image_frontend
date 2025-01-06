import { useState, useEffect } from "react";
import axios from "axios";

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
        const response = await axios.get(
          "http://localhost:5000/api/categories"
        );
        setCategories(response.data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };
    fetchCategories();
  }, []);

  const handleCategoryClick = async (category) => {
    setSelectedCategory(category);
    setSearchQuery("");
    setCurrentPage(1);
    fetchImagesByCategory(category.name, 1);
  };

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

  const handlePageClick = (pageNumber) => {
    setCurrentPage(pageNumber);
    if (selectedCategory) {
      fetchImagesByCategory(selectedCategory.name, pageNumber);
    }
  };

  const handleSearchChange = async (event) => {
    setSearchQuery(event.target.value);
    if (event.target.value === "") {
      if (selectedCategory) {
        fetchImagesByCategory(selectedCategory.name, 1);
      }
    } else {
      setLoading(true);
      try {
        const response = await axios.get(
          `http://localhost:5000/api/images/search?name=${event.target.value}`
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
      <div className="mb-4">
        <input
          type="text"
          value={searchQuery}
          onChange={handleSearchChange}
          className="w-full px-4 py-2 border rounded"
          placeholder="Search by image name..."
        />
      </div>

      <div className="flex overflow-x-auto gap-4 mb-8">
        {categories.map((category) => (
          <button
            key={category._id}
            onClick={() => handleCategoryClick(category)}
            className={`px-4 py-2 rounded shadow ${
              selectedCategory?.name === category.name
                ? "bg-blue-500 text-white"
                : "bg-gray-200 text-gray-700"
            }`}
          >
            {category.name}
          </button>
        ))}
      </div>

      {selectedCategory && (
        <div>
          {loading ? (
            <div className="text-center py-4">Loading...</div>
          ) : (
            <div>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                {(images || []).map((image) => (
                  <div
                    key={image._id}
                    className="border rounded overflow-hidden"
                  >
                    <img
                      src={`http://localhost:5000/${image.imageUrl}`}
                      alt={image.name}
                      className="w-full h-40 object-cover"
                    />
                    <div className="p-2">
                      <h3 className="text-md font-medium">{image.name}</h3>
                      <h3 className="text-md font-medium">
                        {image.category.name}
                      </h3>
                      <p className="text-sm text-gray-600">
                        {image.shortDescription}
                      </p>
                      <p className="text-sm text-gray-600">
                        {image.descriptionLink}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
              {searchQuery === "" && (
                <div className="flex justify-center mt-4">
                  {[...Array(totalPages)].map((_, index) => (
                    <button
                      key={index}
                      onClick={() => handlePageClick(index + 1)}
                      className={`px-4 py-2 mx-1 rounded ${
                        currentPage === index + 1
                          ? "bg-blue-500 text-white"
                          : "bg-gray-200 text-gray-700"
                      }`}
                    >
                      {index + 1}
                    </button>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default User;

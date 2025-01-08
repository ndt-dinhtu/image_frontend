const CategoryButton = ({ category, isSelected, onClick }) => {
    return (
      <button
        onClick={onClick}
        className={`px-4 py-2 rounded shadow ${
          isSelected ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-700"
        }`}
      >
        {category.name}
      </button>
    );
  };
  
  export default CategoryButton;
  
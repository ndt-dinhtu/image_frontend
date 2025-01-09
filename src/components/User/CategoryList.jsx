import PropTypes from "prop-types";
import CategoryButton from "./CategoryButton";

const CategoryList = ({ categories, selectedCategory, onCategoryClick }) => {
  return (
    <div className="flex overflow-x-auto gap-4 mb-8">
      {categories.map((category) => (
        <CategoryButton
          key={category._id}
          category={category}
          isSelected={selectedCategory?.name === category.name}
          onClick={() => onCategoryClick(category)}
        />
      ))}
    </div>
  );
};

CategoryList.propTypes = {
  categories: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
    })
  ).isRequired,
  selectedCategory: PropTypes.shape({
    name: PropTypes.string,
  }),
  onCategoryClick: PropTypes.func.isRequired,
};

export default CategoryList;

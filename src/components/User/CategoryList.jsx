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

export default CategoryList;

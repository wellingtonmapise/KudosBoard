import "./Category.css";

const Category = ({ onCategoryChange }) => {
  const categories = [
    "All",
    "Recent",
    "Celebration",
    "Thank You",
    "Inspiration",
  ];

  return (
    <div className="category-btns">
      {categories.map((category) => (
        <button
          key={category}
          className="category-btn category-btn"
          onClick={() => onCategoryChange(category === "All" ? "" : category)}
        >
          {category}
        </button>
      ))}
    </div>
  );
};

export default Category;

import "./Category.css";

const Category = () => {
  return (
     <div className="category-btns">
    <button className="btn-common category-btn">All</button>
    <button className="btn-common category-btn">Recent</button>
    <button className="btn-common category-btn">Celebration</button>
    <button className="btn-common category-btn">Thank You</button>
    <button className="btn-common category-btn">Inspiration</button>
</div>
  );
};

export default Category;
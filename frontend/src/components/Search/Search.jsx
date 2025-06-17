import "./Search.css";

const Header = () => {
  return (
    <div className="search">
    <input type="text" placeholder="Search boards ..."/>
    <button className="search-btn"> 
        Search
    </button>
    <button className="clear-btn">
        Clear
    </button>

    </div>
  );
};

export default Header;
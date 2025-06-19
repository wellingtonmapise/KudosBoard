import "./Search.css";
import { useState } from "react";

const Search = ({ onSearchChange, onClear }) => {
  const [input, setInput] = useState("");

  const handleSearchClick = () => {
    onSearchChange(input);
  };

  const handleClearClick = () => {
    setInput("");
    onClear();
  };

  return (
    <div className="search">
      <input
        type="text"
        placeholder="Search boards ..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            handleSearchClick();
          }
        }}
      />
      <button className="search-btn" onClick={handleSearchClick}>
        Search
      </button>
      <button className="clear-btn" onClick={handleClearClick}>
        Clear
      </button>
    </div>
  );
};

export default Search;

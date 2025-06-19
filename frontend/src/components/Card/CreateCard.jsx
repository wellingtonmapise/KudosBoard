import { useState } from "react";
import { getGifs } from "../../utils/data";
import "./CreateCard.css";

const CreateCard = ({ onCreate }) => {
  const [showModal, setShowModal] = useState(false);
  const [gifs, setGifs] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [gifUrl, setGifUrl] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [author, setAuthor] = useState("");

  const fetchGifs = (e) => {
    e.preventDefault();
    return getGifs(searchQuery)
      .then((data) => {
        setGifs(data);
      })
      .catch(console.error);
  };
  const handleInputChange = (e) => {
    e.preventDefault();
    setSearchQuery(e.target.value);
  };

  const handleGifClick = (e) => {
    e.preventDefault();
    setGifUrl(e.target.src);
    setGifs([]);
  };

  const handleSubmit = (e) => {
    if (!title || !description || !gifUrl) {
      alert("Title, descrption and gifUrl are required!");
      return;
    }
    e.preventDefault();
    onCreate({ title, description, author, gif: gifUrl });
    setShowModal(false);
    setSearchQuery("");
    setTitle("");
    setDescription("");
    setAuthor("");
    setGifUrl("");
  };

  return (
    <>
      <button onClick={() => setShowModal(true)}>+ Create Card</button>
      {showModal && (
        <div className="modal-overlay">
          <div
            className="modal-content"
            onClick={(event) => event.stopPropagation()}
          >
            <button className="close-btn" onClick={() => setShowModal(false)}>
              ✖
            </button>
            <h2>Create a New Card</h2>
            <form onSubmit={handleSubmit}>
              <input
                placeholder="Enter card title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
              <input
                placeholder="Enter card description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
              <input
                placeholder="Search GIFS..."
                value={searchQuery}
                onChange={handleInputChange}
              />
              {gifs.length > 0 && (
                <div className="gif-container">
                  {" "}
                  {gifs.map((gif) => (
                    <img
                      key={gif.id}
                      src={gif.images.downsized.url}
                      alt="gif"
                      onClick={handleGifClick}
                    />
                  ))}{" "}
                </div>
              )}
              <button className="search-btn" onClick={(e) => fetchGifs(e)}>
                {" "}
                Search
              </button>
              <input
                placeholder="Enter GIF URL"
                value={gifUrl}
                onChange={(e) => setGifUrl(e.target.value)}
              />
              <input
                placeholder="Enter owner (optional)"
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
              />
              <button type="submit" className="create-btn">
                Create Card
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default CreateCard;

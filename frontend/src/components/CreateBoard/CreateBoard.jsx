import { useState } from "react";
import "./CreateBoard.css";

const CreateBoard = ({ onCreate }) => {
  const [showModal, setShowModal] = useState(false);
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [author, setAuthor] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!title || !category) {
      alert("Title and category are required!");
      return;
    }
    onCreate({ title, category, author });
    setShowModal(false);
    setTitle("");
    setCategory("");
    setAuthor("");
  };

  return (
    <>
      <button onClick={() => setShowModal(true)} className="create-brd-main">+ Create Board</button>
      {showModal && (
        <div className="modal-overlay">
          <div className="modal">
            <button className="close-btn" onClick={() => setShowModal(false)}>
              ✖
            </button>
            <h2>Create a New Board</h2>
            <form onSubmit={handleSubmit} className="board-form">
              <label>
                Title:
                <input
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                required/>
              </label>
              <label>
                Category:
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)} required
                >
                  <option value="">Select a category</option>
                  <option value="Thank You">Thank You</option>
                  <option value="Celebration">Celebration</option>
                  <option value="Inspiration">Inspiration</option>
                </select>
              </label>
              <label>
                Author:
                <input
                  value={author}
                  onChange={(e) => setAuthor(e.target.value)}
                />
              </label>
              <button type="submit" className="create-brd-btn">Create Board</button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default CreateBoard;

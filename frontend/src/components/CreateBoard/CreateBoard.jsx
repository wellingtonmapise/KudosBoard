import { useState } from "react";
import "./CreateBoard.css"; // optional for styling

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
      <button onClick={() => setShowModal(true)}>+ Create Board</button>
      {showModal && (
        <div className="modal-overlay">
          <div className="modal">
            <button className="close-btn" onClick={() => setShowModal(false)}>✖</button>
            <h2>Create a New Board</h2>
            <form onSubmit={handleSubmit}>
              <label>
                Title:
                <input value={title} onChange={(e) => setTitle(e.target.value)} />
              </label>
              <label>
                Category:
                <select value={category} onChange={(e) => setCategory(e.target.value)}>
                  <option value="">Select a category</option>
                  <option value="Thank You">Thank You</option>
                  <option value="Celebration">Celebration</option>
                  <option value="Inspiration">Inspiration</option>
                </select>
              </label>
              <label>
                Author:
                <input value={author} onChange={(e) => setAuthor(e.target.value)} />
              </label>
              <button type="submit">Create Board</button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default CreateBoard;

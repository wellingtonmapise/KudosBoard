import React, { useEffect, useState } from "react";
import { getComments,postComments } from "../../utils/data";
import "./CardComments.css";


const CardComments = ({ card, onClose }) => {
  const [comments, setComments] = useState([]);
  const [body, setBody] = useState("");
  const [author, setAuthor] = useState("");

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const data = await getComments(card.id);
        setComments(data);
      } catch (err) {
        console.error("Failed to fetch comments", err);
      }
    };
    fetchComments();
  }, [card.id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!body.trim()) return;
    try {
    const newComment = await postComments({ body, author }, card.id);
      setComments((prev) => [...prev, newComment]);
      setBody("");
      setAuthor("");
    } catch (err) {
      console.error("Error posting comment", err);
    }
  };

  return (
    <div className="modal-overlay-comment">
      <div className="modal-content-comment">
        <button className="close-btn-comment" onClick={onClose}>X</button>
        <h2>{card.title}</h2>

        <div className="modal-image-comments">
          <div className="modal-left">
            <img src={card.gif} alt="Card GIF" className="modal-gif" />
            <p className="modal-description">{card.description}</p>
          </div>

          <div className="modal-right">
            <h3>Comments</h3>
            <div className="comment-container">
              <ul className="comment-list">
                {comments.map((comment) => (
                  <li key={comment.id} className="comment-item">
                    <p>{comment.body}</p>
                    {comment.author && <span className="comment-author">- {comment.author}</span>}
                  </li>
                ))}
              </ul>
            </div>

            <form onSubmit={handleSubmit} className="comment-form">
              <textarea
                value={body}
                onChange={(e) => setBody(e.target.value)}
                placeholder="Write a comment..."
                required
              />
              <input
                type="text"
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
                placeholder="Your name (optional)"
              />
              <button type="submit" className="post-comment">Post Comment</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardComments;

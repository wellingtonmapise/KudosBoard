import { upvoteCards } from "../../utils/data";
import { useState } from "react";
const cardDetails = ({ card, onDelete }) => {
  const [upvotes, setUpvotes] = useState(card.upvotes);

  const handleUpvote = async (id) => {
    try {
      await upvoteCards(id);
      setUpvotes(upvotes + 1);
    } catch (error) {
      console.error("Error upvoting card:", error);
    }
  };

  return (
    <div className="board-card">
      <img src={card.gif} alt="card-image" />
      <h3>{card.title}</h3>
      <p>{card.description}</p>
      <button className="view-board" onClick={() => handleUpvote(card.id)}>
        Upvote: {upvotes}
      </button>
      <button className="delete-btn" onClick={() => onDelete(card.id)}>
        Delete
      </button>
    </div>
  );
};

export default cardDetails;

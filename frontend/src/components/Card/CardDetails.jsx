import { upvoteCards } from "../../utils/data";
import { useState } from "react";
import { TiPinOutline } from "react-icons/ti";
import { FaRegComment } from "react-icons/fa";
import "./CardDetails.css";
import { getPins } from "../../utils/data";



const cardDetails = ({ card, onDelete, onUpdate }) => {
  const [upvotes, setUpvotes] = useState(card.upvotes);
  const [isPinned, setIsPinned] = useState(card.pinned);

  const handlePinClick = async () => {
    try{
      const updated = await getPins(card.id);
      setIsPinned(updated.pinned);
      onUpdate(updated)
    }
    catch(error){
      console.error("Failed to pin/unpin", error)
    }
  }


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
      <div className="image-container">
        <img src={card.gif} alt="card-image" />
        <TiPinOutline
          className={`pin-icon ${isPinned ? 'pinned' : 'unpinned'}`}
          onClick={handlePinClick}
        />

      </div>
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

import { upvoteCards, getPins } from "../../utils/data";
import { useState } from "react";
import { TiPinOutline } from "react-icons/ti";
import { FaRegComment } from "react-icons/fa";
import './CardDetails.css';
import { BiSolidUpvote } from "react-icons/bi";



const cardDetails = ({ card, onDelete, onUpdate, onOpenComments }) => {
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
    <div className="card-content">
      <div className="image-container">
        <img src={card.gif} alt="card-image" />
        <TiPinOutline
          className={`pin-icon ${isPinned ? 'pinned' : 'unpinned'}`}
          onClick={handlePinClick}
        />

      </div>
      <h3>{card.title}</h3>
      <p>{card.description}</p>
      <div className="card-buttons">
      <button className="up-vote" onClick={() => handleUpvote(card.id)}>
      <BiSolidUpvote/> {upvotes}
      </button>
      <button className="comment-btn" onClick={() => onOpenComments(card)}><FaRegComment /></button>
      <button className="delete-btn-card" onClick={() => onDelete(card.id)}>
        Delete
      </button>
      </div>

    </div>
  );
};

export default cardDetails;

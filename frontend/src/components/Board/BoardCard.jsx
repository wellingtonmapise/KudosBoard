import "./BoardCard.css";
import {Link} from "react-router-dom";


const BoardCard = ({board, onDelete}) => {
  return (
    <div className="board-card">
        <img src={board.gif} alt="board image"/>
        <h3>{board.title}</h3>
        <p>{board.category}</p>
        <Link className="view-board" to={`/boards/${board.id}`}>View Board</Link>
        <button className="delete-btn" onClick={() => onDelete(board.id)}>Delete Board</button>
    </div>
  );
};

export default BoardCard;

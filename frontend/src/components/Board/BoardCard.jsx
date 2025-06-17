import "./BoardCard.css";

const BoardCard = () => {
  return (
    <div className="board-card">
        <img src="https://picsum.photos/200" alt="board image"/>
        <h3>Wellington</h3>
        <p>Celebration</p>
        <a className="view-board" href="/">View Board</a>
        <button className="delete-btn">Delete Board</button>
    </div>
  );
};

export default BoardCard;
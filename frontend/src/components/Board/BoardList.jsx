import BoardCard from "./BoardCard";
import "./BoardList.css";
import { deleteBoards } from "../../utils/data";

const BoardList = ({ boards, setBoards }) => {
  const handleDelete = async (id) => {
    try {
      await deleteBoards(id);
      setBoards(prev => prev.filter(board => board.id !== id));
    }
    catch (error) {
      console.error(error);
    }

  }

  return (
    <div className="board-cards">
      {(boards?.length > 0) ? (
        boards.map((board) => (
          <BoardCard key={board.id} board={board} onDelete={handleDelete} />
        ))
      ) : (
        <p>No boards available. Please create one!</p>
      )}
    </div>
  );
};

export default BoardList;

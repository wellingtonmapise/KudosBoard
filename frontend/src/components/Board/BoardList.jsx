import BoardCard from "./BoardCard";
import "./BoardList.css";
import { getBoards, deleteBoards, postBoards } from "../../utils/data";
import { useState, useEffect } from "react";

const BoardList = ({search}) => {
  const [boards, setBoards] = useState([]);

  useEffect(() => {
    getBoards(search)
      .then((data) => {
        setBoards(data);
      })
      .catch(console.error);
  }, [search]);

  const handleDelete = async (id) => {
    try{
        await deleteBoards(id);
        setBoards(prev => prev.filter(board => board.id !== id));
    }
    catch (error){
        console.error(error);
    }

  }

  return (
    <div className="board-cards">
      {boards.map((board) => (
        <BoardCard key={board.id} board={board} onDelete={handleDelete}/>
      ))}
    </div>
  );
};

export default BoardList;

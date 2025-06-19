import Header from "../Header/Header";
import CreateCard from "./CreateCard";
import CardList from "./CardList";
import { useParams } from "react-router-dom";
import { getCards, getBoards, deleteCards, postCards } from "../../utils/data";
import { useEffect, useState } from "react";
import Footer from "../Footer/Footer";

const CardPage = () => {
  const { id: boardId } = useParams();
  const [cards, setCards] = useState([]);
  const [boards, setBoards] = useState([]);

  const handleDelete = async (id) => {
    try {
      await deleteCards(id);
      setCards((prev) => prev.filter((card) => card.id !== id));
    } catch (error) {
      console.error(error);
    }
  };
  const handleCreateCard = async (newCardData) => {
    try {
      await postCards(newCardData, boardId);
      const updatedCards = await getCards(boardId);
      setCards(updatedCards);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    getCards(boardId)
      .then((data) => {
        setCards(data);
      })
      .catch(console.error);
  }, [boardId]);

  useEffect(() => {
    getBoards()
      .then((data) => {
        setBoards(data);
      })
      .catch(console.error);
  }, []);

  const board = boards.find((board) => board.id === parseInt(boardId));

  if (boards.length === 0) {
    return (
      <>
        <Header />
        <h2>Loading...</h2>
      </>
    );
  }

  if (!board) {
    return (
      <>
        <Header />
        <h2>Board not found</h2>
      </>
    );
  }

  return (
    <>
      <a href={`/`}> Back </a>
      <Header />
      <h2>{board.title}</h2>
      <CreateCard onCreate={handleCreateCard} />
      <CardList onDelete={handleDelete} cards={cards} />
      <Footer />
    </>
  );
};

export default CardPage;

import Header from "../Header/Header";
import CreateCard from "./CreateCard";
import CardList from "./CardList";
import CardComments from "./CardComments";
import { useParams } from "react-router-dom";
import { getCards, getBoards, deleteCards, postCards } from "../../utils/data";
import { useEffect, useState } from "react";
import Footer from "../Footer/Footer";
import { IoArrowBackCircle } from "react-icons/io5";
import "./CardPage.css";

const CardPage = () => {
  const { id: boardId } = useParams();
  const [cards, setCards] = useState([]);
  const [boards, setBoards] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);

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

const handleCardUpdate = (newCards) =>{
  setCards(prev => prev.map(card => { if(card.id === newCards.id) { return newCards } else { return card } }))
}

const handleOpenComments = (card) => {
  setSelectedCard(card);
  setShowModal(true);
};

const handleCloseComments = () => {
  setShowModal(false);
  setSelectedCard(null);
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
    <div className="card-page-container">
      <a href={`/`} className="back-btn"><IoArrowBackCircle /> </a>
      <div className="card-page-content">
        <Header />
        <h2>{board.title}</h2>
        <CreateCard onCreate={handleCreateCard} />
        <CardList onDelete={handleDelete} cards={cards} onUpdate={handleCardUpdate} onOpenComments={handleOpenComments}/>
      </div>
      <Footer />
    </div>
    {showModal && selectedCard && (
      <CardComments
        card={selectedCard}
        onClose={handleCloseComments}
      />
    )}
    </>
  );
};

export default CardPage;

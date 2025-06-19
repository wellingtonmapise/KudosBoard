import CardDetails from "./CardDetails";
const CardList = ({ cards, onDelete }) => {
  return (
    <>
      {cards.length > 0 &&
        cards.map((card) => (
          <CardDetails onDelete={onDelete} key={card.id} card={card} />
        ))}
    </>
  );
};

export default CardList;

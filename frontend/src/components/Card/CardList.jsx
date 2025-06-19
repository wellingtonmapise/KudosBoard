import CardDetails from "./CardDetails";
const CardList = ({ cards, onDelete,onUpdate }) => {

    const sortPinned = [...cards].sort((a, b) => {
        if (a.pinned === b.pinned) {
          return new Date(b.createdAt) - new Date(a.createdAt);
      }
      return b.pinned - a.pinned;
  });

  return (
    <>
      {sortPinned.length > 0 &&
        sortPinned.map((card) => (
          <CardDetails onDelete={onDelete} key={card.id} card={card} onUpdate={onUpdate} />
        ))}
    </>
  );
};

export default CardList;

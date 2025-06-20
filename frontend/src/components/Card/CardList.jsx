import CardDetails from "./CardDetails";
import "./CardList.css";
const CardList = ({ cards, onDelete, onUpdate, onOpenComments }) => {

    const sortPinned = [...cards].sort((a, b) => {
        if (a.pinned === b.pinned) {
          return new Date(b.createdAt) - new Date(a.createdAt);
      }
      return b.pinned - a.pinned;
  });

  return (
    <div className="card-list">
      {(sortPinned?.length > 0) ? (
        sortPinned.map((card) => (
          <CardDetails onDelete={onDelete} key={card.id} card={card} onUpdate={onUpdate} onOpenComments={onOpenComments} />
        ))
      ) : (
        <p>No cards please create one!</p>
      )}
    </div>
  );
};

export default CardList;

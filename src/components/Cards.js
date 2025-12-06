import { useState } from "react";

import Card from "./Card";

export default function Cards({
  items,
  sortBy,
  setSortBy,
  setEditItem,
  deleteItem,
}) {
  const [selectId, setSelectedId] = useState(null);

  function handleClick(id) {
    setSelectedId(id !== selectId ? id : null);
  }

  if (!items || items.length === 0) {
    return <div className="noItems">No words registered</div>;
  }
  return (
    <div>
      <div className="sort">
        <p>Sort by: </p>
        <select
          className="select"
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
        >
          <option value="oldest">oldest</option>
          <option value="latest">latest</option>
          <option value="description">A-Å</option>
          <option value="random">random</option>
        </select>
      </div>
      <div className="cards">
        {items.map((item) => (
          <Card
            key={item.id}
            item={item}
            selectId={selectId}
            handleClick={handleClick}
            handleEditItem={setEditItem}
            handleDeleteItem={deleteItem}
          />
        ))}
      </div>
    </div>
  );
}

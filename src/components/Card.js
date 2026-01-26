export default function Card({
  item,
  selectId,
  baseLang,
  handleClick,
  handleEditItem,
  handleDeleteItem,
}) {
  const isSelected = selectId === item.id;
  const main = baseLang === "da" ? item.danish : item.japanese;
  const sub = baseLang === "da" ? item.japanese : item.danish;

  return (
    <div
      key={item.id}
      onClick={() => handleClick(item.id)}
      className={isSelected ? "selected" : "card"}
    >
      <div className="controlButtons">
        <img
          src="icons/edit.svg"
          alt="editIcon"
          onClick={() => handleEditItem(item)}
        />
        <img
          src="icons/archive.svg"
          alt="archiveIcon"
          onClick={() => handleDeleteItem(item)}
        />
      </div>
      <div className="cardContent">
        <p>{isSelected ? sub : main}</p>
        <span>
          {isSelected ? (
            <a href={item.ddo} target="_blank" rel="noreferrer">
              📖
            </a>
          ) : (
            ""
          )}
        </span>
      </div>
    </div>
  );
}

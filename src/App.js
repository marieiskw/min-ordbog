import { useState } from "react";
import "./styles.css";

const wordList = [
  {
    id: 20251116160000,
    danish: "jordbær",
    japanese: "いちご",
    ddo: "https://ordnet.dk/ddo/ordbog?query=jordb%C3%A6r",
    image: "images/fruit_strawberry.png",
  },
  {
    id: 20251116130000,
    danish: "æble",
    japanese: "りんご",
    ddo: "https://ordnet.dk/ddo/ordbog?query=%C3%A6ble",
    image: "images/fruit_apple.png",
  },
  {
    id: 20251116140000,
    danish: "appelsin",
    japanese: "みかん",
    ddo: "https://ordnet.dk/ddo/ordbog?query=appelsin",
    image: "images/fruit_orange.png",
  },
  {
    id: 20251116110000,
    danish: "vindrue",
    japanese: "ぶどう",
    ddo: "https://ordnet.dk/ddo/ordbog?query=vindrue",
    image: "images/fruit_grape.png",
  },
  {
    id: 20251116120000,
    danish: "kirsebær",
    japanese: "さくらんぼ",
    ddo: "https://ordnet.dk/ddo/ordbog?query=kirseb%C3%A6r",
    image: "images/fruit_cherry.png",
  },
  {
    id: 20251116150000,
    danish: "fersken",
    japanese: "もも",
    ddo: "https://ordnet.dk/ddo/ordbog?query=fersken",
    image: "images/fruit_momo.png",
  },
];

export default function App() {
  return (
    <div>
      <Cards />
    </div>
  );
}

function Cards() {
  const [selectId, setSelectedId] = useState(null);
  const [sortBy, setSortBy] = useState("date");
  let sortedItems;

  function handleClick(id) {
    setSelectedId(id !== selectId ? id : null);
  }

  if (sortBy === "date")
    sortedItems = wordList.slice().sort((a, b) => Number(a.id) - Number(b.id));
  if (sortBy === "description")
    sortedItems = wordList
      .slice()
      .sort((a, b) => a.danish.localeCompare(b.danish));

  return (
    <div>
      <div className="sort">
        <p>Sort by...</p>
        <select className="select" onChange={(e) => setSortBy(e.target.value)}>
          <option value="date">date</option>
          <option value="description">description</option>
        </select>
      </div>
      <div className="cards">
        {sortedItems.map((item) => (
          <div
            key={item.id}
            onClick={() => handleClick(item.id)}
            className={selectId === item.id ? "selected" : ""}
          >
            <p>{selectId === item.id ? item.japanese : item.danish}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

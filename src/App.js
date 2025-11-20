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
    danish: "å",
    japanese: "みかん",
    ddo: "https://ordnet.dk/ddo/ordbog?query=appelsin",
    image: "images/fruit_orange.png",
  },
  {
    id: 20251116110000,
    danish: "ø",
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
  const [items, setItems] = useState(wordList);

  function handleAddItems(item) {
    setItems((items) => [...items, item]);
  }

  return (
    <div>
      <NewWord onAddItems={handleAddItems} />
      <Cards items={items} />
    </div>
  );
}

function NewWord({ onAddItems }) {
  const [danish, setDanish] = useState("");
  const [japanese, setJapanese] = useState("");
  const [ddo, setDdo] = useState("");

  function addNewWord(e) {
    e.preventDefault();

    const newItem = {
      id: Date.now(),
      danish,
      japanese,
      ddo,
      image: "images/fruit_cherry.png",
    };

    onAddItems(newItem);

    // Reset input box
    setDanish("");
    setJapanese("");
  }

  return (
    <form>
      <div className="newWord">
        <div>
          <span>🇩🇰 </span>
          <input
            type="text"
            placeholder="dk"
            value={danish}
            onChange={(e) => setDanish(e.target.value)}
          ></input>
        </div>
        <div>
          <span>🇯🇵 </span>
          <input
            type="text"
            placeholder="jp"
            value={japanese}
            onChange={(e) => setJapanese(e.target.value)}
          ></input>
        </div>
        <div>
          <span>📖 </span>
          <input
            type="url"
            placeholder="link to DDO"
            value={ddo}
            onChange={(e) => setDdo(e.target.value)}
          ></input>
        </div>
      </div>
      <div>
        <button>æ</button>
        <button>ø</button>
        <button>å</button>
      </div>
      <button onClick={addNewWord}>Add</button>
    </form>
  );
}

function Card({ item, selectId, handleClick }) {
  const isSelected = selectId === item.id;
  return (
    <div
      key={item.id}
      onClick={() => handleClick(item.id)}
      className={isSelected ? "selected" : ""}
    >
      <p>{isSelected ? item.japanese : item.danish}</p>
      <span>
        {isSelected ? (
          <a href={item.ddo} target="_blank">
            📖
          </a>
        ) : (
          ""
        )}
      </span>
    </div>
  );
}

function Cards({ items }) {
  const [selectId, setSelectedId] = useState(null);
  const [sortBy, setSortBy] = useState("date");
  let sortedItems;

  function handleClick(id) {
    setSelectedId(id !== selectId ? id : null);
  }

  if (sortBy === "date")
    sortedItems = items.slice().sort((a, b) => Number(a.id) - Number(b.id));
  if (sortBy === "description")
    sortedItems = items
      .slice()
      .sort((a, b) => a.danish.localeCompare(b.danish));

  return (
    <div>
      <div className="sort">
        <p>Sort by: </p>
        <select className="select" onChange={(e) => setSortBy(e.target.value)}>
          <option value="date">date</option>
          <option value="description">A-Z</option>
        </select>
      </div>
      <div className="cards">
        {sortedItems.map((item) => (
          <Card item={item} selectId={selectId} handleClick={handleClick} />
        ))}
      </div>
    </div>
  );
}

import { useEffect, useRef, useState } from "react";
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
  const [isOpenAdd, setIsOpenAdd] = useState(false);
  const [items, setItems] = useState(wordList);
  const [keyword, setKeyword] = useState("");
  const [sortBy, setSortBy] = useState("date");

  let sortedItems;

  function handleAddItems(item) {
    setItems((items) => [...items, item]);
  }

  // Filter
  const filteredItems = items.filter((item) =>
    item.danish.toLowerCase().startsWith(keyword.toLowerCase())
  );

  if (sortBy === "date")
    sortedItems = filteredItems
      .slice()
      .sort((a, b) => Number(a.id) - Number(b.id));
  if (sortBy === "description")
    sortedItems = filteredItems
      .slice()
      .sort((a, b) => a.danish.localeCompare(b.danish, "da"));

  return (
    <div className="app">
      <div className="header">
        <Search keyword={keyword} setKeyword={setKeyword} />
        <Add setIsOpenAdd={setIsOpenAdd} />
      </div>
      <Cards items={sortedItems} sortBy={sortBy} setSortBy={setSortBy} />

      {isOpenAdd && (
        <div className="overlay">
          <NewWordForm
            onAddItems={handleAddItems}
            setIsOpenAdd={setIsOpenAdd}
          />
        </div>
      )}
    </div>
  );
}

function Search({ keyword, setKeyword }) {
  return (
    <div>
      <span className="searchIcon">🔍 </span>
      <input
        className="searchInput"
        type="text"
        placeholder="Search"
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
      />
    </div>
  );
}

// function Control() {
//   return (
//     <div className="controlButtons">
//       <Add />
//       <Edit />
//       <Delete />
//     </div>
//   );
// }

function Add({ setIsOpenAdd }) {
  return (
    <>
      <button className="addButton" onClick={() => setIsOpenAdd(true)}>
        Add new word
      </button>
    </>
  );
}

function NewWordForm({ onAddItems, setIsOpenAdd }) {
  const [danish, setDanish] = useState("");
  const [japanese, setJapanese] = useState("");
  const [ddo, setDdo] = useState("");

  function addUniqueChar(e) {
    const char = e.target.value;
    setDanish((prev) => prev + char);
  }

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

    // Close modal
    setIsOpenAdd(false);
  }

  function closeForm() {
    setIsOpenAdd(false);
  }

  return (
    <form className="form">
      <h2 className="formTitle">Add a new word</h2>
      <div className="formContent">
        <div className="newWord">
          <div className="content">
            <span>🇩🇰</span>
            <input
              type="text"
              placeholder="dk"
              value={danish}
              onChange={(e) => setDanish(e.target.value)}
            />
          </div>
          <div className="content">
            <span>🇯🇵</span>
            <input
              type="text"
              placeholder="jp"
              value={japanese}
              onChange={(e) => setJapanese(e.target.value)}
            />
          </div>
          <div className="content">
            <a href="https://ordnet.dk/ddo" target="_blank" className="ddoIcon">
              📖
            </a>
            <input
              type="url"
              placeholder="Link to DDO"
              value={ddo}
              onChange={(e) => setDdo(e.target.value)}
            />
          </div>
        </div>
        <div className="buttons">
          <div className="charButtons">
            <button
              type="button"
              value="æ"
              className="specialCharButton"
              onClick={addUniqueChar}
            >
              æ
            </button>
            <button
              type="button"
              value="ø"
              className="specialCharButton"
              onClick={addUniqueChar}
            >
              ø
            </button>
            <button
              type="button"
              value="å"
              className="specialCharButton"
              onClick={addUniqueChar}
            >
              å
            </button>
          </div>
          <div className="formControlButtons">
            <button className="formButton" onClick={addNewWord}>
              Add
            </button>
            <button className="formButton" onClick={closeForm}>
              Cancel
            </button>
          </div>
        </div>
      </div>
    </form>
  );
}

function Edit() {}

function Delete() {}

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

function Cards({ items, sortBy, setSortBy }) {
  const [selectId, setSelectedId] = useState(null);

  function handleClick(id) {
    setSelectedId(id !== selectId ? id : null);
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
          <option value="date">date</option>
          <option value="description">A-Z</option>
        </select>
      </div>
      <div className="cards">
        {items.map((item) => (
          <Card
            key={item.id}
            item={item}
            selectId={selectId}
            handleClick={handleClick}
          />
        ))}
      </div>
    </div>
  );
}

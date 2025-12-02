import { useEffect, useState } from "react";
import { supabase } from "./supabase";

import "./styles.css";

export default function App() {
  const [isOpenAdd, setIsOpenAdd] = useState(false);
  const [editItem, setEditItem] = useState(null);
  const [items, setItems] = useState([]);
  const [keyword, setKeyword] = useState("");
  const [sortBy, setSortBy] = useState("date");

  let sortedItems;

  // Get data
  useEffect(() => {
    async function fetchWords() {
      const { data, error } = await supabase
        .from("wordList")
        .select("id, danish, japanese, ddo")
        .eq("archive_flg", "0");

      if (error) console.error(error);
      else setItems(data);
    }

    fetchWords();
  }, []);

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

  async function handleAddSubmit(item) {
    const newId = generateTimestamp("id");
    const now = generateTimestamp("stamp");

    const newItem = {
      id: newId,
      ...item,
      archive_flg: 0,
      insert_date: now,
      update_date: now,
    };

    // Add to database
    await supabase.from("wordList").insert([newItem]);

    // Add to screen items
    setItems((items) => [...items, newItem]);
  }

  async function handleEditSubmit(updated) {
    const now = generateTimestamp("stamp");

    const updatedItem = {
      ...updated,
      update_date: now,
    };
    // Update database
    await supabase.from("wordList").update(updatedItem).eq("id", editItem.id);

    // Update screen item
    setItems((items) =>
      items.map((i) => (i.id === editItem.id ? { ...i, ...updatedItem } : i))
    );
  }

  return (
    <div className="app">
      <div className="header">
        <Search keyword={keyword} setKeyword={setKeyword} />
        <Add setIsOpenAdd={setIsOpenAdd} />
      </div>
      <Cards
        items={sortedItems || items}
        setItems={setItems}
        sortBy={sortBy}
        setSortBy={setSortBy}
        setEditItem={setEditItem}
      />

      {isOpenAdd && (
        <div className="overlay">
          <WordForm
            initialItem={null}
            mode="add"
            onSubmit={handleAddSubmit}
            onClose={() => setIsOpenAdd(false)}
          />
        </div>
      )}
      {editItem && (
        <div className="overlay">
          <WordForm
            initialItem={editItem}
            mode="edit"
            onSubmit={handleEditSubmit}
            onClose={() => setEditItem(null)}
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

function Add({ setIsOpenAdd }) {
  return (
    <>
      <button className="addButton" onClick={() => setIsOpenAdd(true)}>
        Add new word
      </button>
    </>
  );
}

function generateTimestamp(type) {
  const now = new Date();

  const YYYY = now.getFullYear();
  const MM = String(now.getMonth() + 1).padStart(2, "0");
  const DD = String(now.getDate()).padStart(2, "0");
  const HH = String(now.getHours()).padStart(2, "0");
  const mm = String(now.getMinutes()).padStart(2, "0");
  const ss = String(now.getSeconds()).padStart(2, "0");

  return type === "id"
    ? `${YYYY}${MM}${DD}${HH}${mm}${ss}`
    : `${YYYY}-${MM}-${DD} ${HH}:${mm}:${ss}`;
}

function WordForm({ initialItem, onSubmit, onClose, mode }) {
  const [danish, setDanish] = useState(initialItem?.danish || "");
  const [japanese, setJapanese] = useState(initialItem?.japanese || "");
  const [ddo, setDdo] = useState(initialItem?.ddo || "");

  function addUniqueChar(e) {
    const char = e.target.value;
    setDanish((prev) => prev + char);
  }

  function handleSubmit(e) {
    e.preventDefault();
    onSubmit({ danish, japanese, ddo });

    // Close modal
    onClose();
  }

  return (
    <form className="form">
      <h2 className="formTitle">
        {mode === "add" ? "Add a new word" : "Edit word"}{" "}
      </h2>
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
            <button className="formButton" onClick={handleSubmit}>
              {mode === "add" ? "Add" : "Save"}
            </button>
            <button className="formButton" onClick={onClose}>
              Cancel
            </button>
          </div>
        </div>
      </div>
    </form>
  );
}

function Cards({ items, setItems, sortBy, setSortBy, setEditItem }) {
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
            setItems={setItems}
            selectId={selectId}
            handleClick={handleClick}
            handleEditItem={setEditItem}
          />
        ))}
      </div>
    </div>
  );
}

function Card({ item, setItems, selectId, handleClick, handleEditItem }) {
  const isSelected = selectId === item.id;

  async function handleDeleteItem(item) {
    const isOk = window.confirm(`Do you want to delete ${item.danish}?`);
    if (!isOk) return;

    // Delete from database
    const { error } = await supabase
      .from("wordList")
      .delete()
      .eq("id", item.id);

    if (error) {
      console.log(error);
      return;
    }

    // Delete from items on screen
    setItems((prev) => prev.filter((i) => i.id !== item.id));
  }
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
    </div>
  );
}

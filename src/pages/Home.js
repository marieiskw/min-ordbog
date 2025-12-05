import { useState } from "react";

import Search from "../components/Search";
import AddButton from "../components/AddButton";
import Cards from "../components/Cards";
import WordForm from "../components/WordForm";
import LogoutButton from "../components/LogoutButton";

import useWord from "../hooks/useWord";

export default function Home({ onLogout }) {
  const { items, addWord, editWord, deleteWord } = useWord();
  const [isOpenAdd, setIsOpenAdd] = useState(false);
  const [editItem, setEditItem] = useState(null);
  const [keyword, setKeyword] = useState("");
  const [sortBy, setSortBy] = useState("oldest");

  let sortedItems;

  // Filter
  const filteredItems = items.filter((item) =>
    item.danish.toLowerCase().startsWith(keyword.toLowerCase())
  );

  if (sortBy === "oldest")
    sortedItems = filteredItems
      .slice()
      .sort((a, b) => Number(a.id) - Number(b.id));
  if (sortBy === "latest")
    sortedItems = filteredItems
      .slice()
      .sort((a, b) => Number(b.id) - Number(a.id));
  if (sortBy === "description")
    sortedItems = filteredItems
      .slice()
      .sort((a, b) => a.danish.localeCompare(b.danish, "da"));

  async function handleAddSubmit(item) {
    addWord(item);
  }

  async function handleEditSubmit(updated) {
    editWord(updated, editItem.id);
  }

  async function handleDeleteItem(item) {
    deleteWord(item);
  }

  return (
    <div className="app">
      <LogoutButton onLogout={onLogout} />
      <div className="header">
        <Search keyword={keyword} setKeyword={setKeyword} />
        <AddButton setIsOpenAdd={setIsOpenAdd} />
      </div>
      <Cards
        items={sortedItems || items}
        sortBy={sortBy}
        setSortBy={setSortBy}
        setEditItem={setEditItem}
        deleteItem={handleDeleteItem}
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

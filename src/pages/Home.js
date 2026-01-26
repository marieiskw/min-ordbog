import { useState } from "react";

import Search from "../components/Search";
import AddButton from "../components/AddButton";
import Cards from "../components/Cards";
import WordForm from "../components/WordForm";
import LogoutButton from "../components/LogoutButton";

import useWord from "../hooks/useWord";
import Loader from "../components/Loader";
import NoItems from "../components/NoItems";
import SwitchButton from "../components/SwitchButton";

export default function Home({ onLogout }) {
  const { isLoading, items, addWord, editWord, deleteWord } = useWord();
  const [isOpenAdd, setIsOpenAdd] = useState(false);
  const [editItem, setEditItem] = useState(null);
  const [keyword, setKeyword] = useState("");
  const [sortBy, setSortBy] = useState("oldest");
  const [baseLang, setBaseLang] = useState("da");

  let sortedItems;

  // Filter
  const filteredItems = items.filter((item) =>
    item.danish.toLowerCase().startsWith(keyword.toLowerCase()),
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
  if (sortBy === "random")
    sortedItems = filteredItems.slice().sort(() => Math.random() - 0.5);

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
      <div className="ribbon">
        <SwitchButton baseLang={baseLang} setBaseLang={setBaseLang} />
        <LogoutButton onLogout={onLogout} />
      </div>
      <div className="header">
        <Search keyword={keyword} setKeyword={setKeyword} />
        <AddButton setIsOpenAdd={setIsOpenAdd} />
      </div>
      {isLoading && <Loader />}
      {!isLoading && items.length === 0 && <NoItems />}
      {!isLoading && items.length > 0 && (
        <Cards
          items={sortedItems || items}
          baseLang={baseLang}
          sortBy={sortBy}
          setSortBy={setSortBy}
          setEditItem={setEditItem}
          deleteItem={handleDeleteItem}
        />
      )}

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

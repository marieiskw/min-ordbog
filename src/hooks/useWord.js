import { useEffect, useState } from "react";
import { supabase } from "../supabase";

import generateTimestamp from "../utils/generateTimestamp";

export default function useWord() {
  const [items, setItems] = useState([]);

  // Get data
  useEffect(() => {
    async function fetchWords() {
      console.log("useWord");
      const {
        data: { user },
      } = await supabase.auth.getUser();
      const userId = user?.id;
      const { data, error } = await supabase
        .from("wordList")
        .select("id, danish, japanese, ddo")
        .eq("user_id", userId)
        .eq("archive_flg", "0");

      if (error) console.error(error);
      else setItems(data);
    }

    fetchWords();
  }, []);

  // Insert data
  async function addWord(item) {
    const newId = generateTimestamp("id");
    const now = generateTimestamp("stamp");
    const {
      data: { user },
    } = await supabase.auth.getUser();

    const newItem = {
      id: newId,
      ...item,
      archive_flg: 0,
      insert_date: now,
      update_date: now,
      user_id: user.id,
    };

    // Add to database
    await supabase.from("wordList").insert([newItem]);

    // Add to screen items
    setItems((items) => [...items, newItem]);
  }

  // Update data
  async function editWord(updated, id) {
    const now = generateTimestamp("stamp");

    const updatedItem = {
      ...updated,
      update_date: now,
    };
    // Update database
    await supabase.from("wordList").update(updatedItem).eq("id", id);

    // Update screen item
    setItems((items) =>
      items.map((i) => (i.id === id ? { ...i, ...updatedItem } : i))
    );
  }

  // Delete data
  async function deleteWord(item) {
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

  return { items, addWord, editWord, deleteWord };
}

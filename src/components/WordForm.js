import { useState } from "react";

export default function WordForm({ initialItem, onSubmit, onClose, mode }) {
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
    <form>
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

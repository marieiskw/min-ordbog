export default function SwitchButton({ baseLang, setBaseLang }) {
  const isJapaneseBase = baseLang === "ja";
  return (
    <>
      <label className="langSwitch">
        <span>🇩🇰</span>
        <input
          type="checkbox"
          checked={isJapaneseBase}
          onChange={() => setBaseLang((prev) => (prev === "da" ? "ja" : "da"))}
        />
        <span className="slider" />
        <span>🇯🇵</span>
      </label>
    </>
  );
}

export default function Search({ keyword, setKeyword }) {
  return (
    <div className="search">
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

export default function AddButton({ setIsOpenAdd }) {
  return (
    <>
      <button className="addButton" onClick={() => setIsOpenAdd(true)}>
        Add new word
      </button>
    </>
  );
}

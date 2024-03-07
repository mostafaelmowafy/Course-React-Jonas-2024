export default function ListItem({ itemRef, onDleteItem, onhandleToggleItem }) {
  return (
    <li>
      <input
        type="checkbox"
        value={itemRef.packed}
        onChange={() => onhandleToggleItem(itemRef.id)}
      ></input>
      <span className={itemRef.packed === true && "packed"}>
        {itemRef.quantity + " " + itemRef.description}
      </span>
      <button onClick={() => onDleteItem(itemRef.id)}>❌</button>
    </li>
  );
}

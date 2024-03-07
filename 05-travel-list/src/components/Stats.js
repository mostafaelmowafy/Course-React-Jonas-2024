export default function Stats({ items }) {
  if (!items.length)
    return (
      <footer className="stats">
        <em>Start adding some items to your packing list 🚀</em>
      </footer>
    );
  const numOfItems = items.length;
  const numOfPacked = items.filter((item) => item.packed).length;
  const percentPacked = Math.round((numOfPacked / numOfItems) * 100);
  return (
    <footer className="stats">
      <em>
        {numOfItems === numOfPacked
          ? "You got everything! Ready to go ✈️"
          : `💼 You have ${numOfItems} items on your list, And you already packed
            ${numOfPacked} (${percentPacked}%)`}
      </em>
    </footer>
  );
}

import { useState } from "react";

const initialFriends = [
  {
    id: 118836,
    name: "Clark",
    image: "https://i.pravatar.cc/48?u=118836",
    balance: -7,
  },
  {
    id: 933372,
    name: "Sarah",
    image: "https://i.pravatar.cc/48?u=933372",
    balance: 20,
  },
  {
    id: 499476,
    name: "Anthony",
    image: "https://i.pravatar.cc/48?u=499476",
    balance: 0,
  },
];
function Button({ children, onSelect }) {
  return (
    <button className="button" onClick={onSelect}>
      {children}
    </button>
  );
}

export default function App() {
  const [friends, setFriends] = useState(initialFriends);
  const [showAddFriend, setShowAddFriend] = useState(false);
  const [selectedFriend, setSelectedFriend] = useState(null);

  function addFriend(friend) {
    setFriends([...friends, friend]);
  }

  function handleFormFriend() {
    setShowAddFriend(!showAddFriend);
    setSelectedFriend(null);
  }

  function handleSelection(friend) {
    setSelectedFriend((cur) => (cur?.id === friend.id ? null : friend));
    setShowAddFriend(false);
  }

  function handleSplitBill(value) {
    setFriends(
      friends.map((friend) =>
        friend.id === selectedFriend.id
          ? { ...friend, balance: value + friend.balance }
          : friend
      )
    );
    setSelectedFriend(null);
  }
  return (
    <div className="app">
      <div className="sidebar">
        <FriendsList
          friends={friends}
          onSelection={handleSelection}
          selectedFriend={selectedFriend}
        />
        {showAddFriend && <FormAddFriend onAddFriend={addFriend} />}
        <Button onSelect={handleFormFriend}>
          {showAddFriend ? "Close" : "+ Add a new friend"}
        </Button>
      </div>
      {selectedFriend && (
        <FormSplitBill
          selectedFriend={selectedFriend}
          onHandleSplitBill={handleSplitBill}
        />
      )}
    </div>
  );
}

function FriendsList({ friends, onSelection, selectedFriend }) {
  // const friends = initialFriends;

  return (
    <ul>
      {friends.map((friend) => (
        <Friend
          friend={friend}
          key={friend.id}
          onSelection={onSelection}
          selectedFriend={selectedFriend}
        />
      ))}
    </ul>
  );
}
function Friend({ friend, onSelection, selectedFriend }) {
  const isSelected = selectedFriend?.id === friend.id;
  return (
    <li className={isSelected ? "selected" : ""}>
      <img src={friend.image} alt={friend.name} />
      <h3>{friend.name}</h3>
      <p
        className={
          friend.balance > 0 ? "green" : friend.balance < 0 ? "red" : ""
        }
      >
        {friend.balance > 0
          ? friend.name + " Owes you " + friend.balance + "💶"
          : friend.balance < 0
          ? " You owe " + friend.name + " " + Math.abs(friend.balance) + "💶"
          : " You and " + friend.name + " are even "}
      </p>
      <Button onSelect={() => onSelection(friend)}>
        {isSelected ? "Close" : "Select"}
      </Button>
    </li>
  );
}

function FormAddFriend({ onAddFriend }) {
  const [name, setName] = useState("");
  const [image, setImage] = useState(
    "https://static.vecteezy.com/system/resources/previews/000/649/115/original/user-icon-symbol-sign-vector.jpg"
  );

  function handleSubmit(e) {
    e.preventDefault();
    if (!name || !image) return;
    const newFriend = {
      name: name,
      image: image,
      balance: 0,
      id: crypto.randomUUID(),
    };
    onAddFriend(newFriend);
    setName("");
    setImage(
      "https://static.vecteezy.com/system/resources/previews/000/649/115/original/user-icon-symbol-sign-vector.jpg"
    );
  }
  return (
    <form className="form-add-friend" onSubmit={handleSubmit}>
      <label>🧑‍🤝‍🧑Friend name:</label>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <label>📷Image URL:</label>
      <input
        type="text"
        value={image}
        onChange={(e) => setImage(e.target.value)}
      />
      <Button>Add</Button>
    </form>
  );
}

function FormSplitBill({ selectedFriend, onHandleSplitBill }) {
  const [bill, setBill] = useState("");
  const [paidByUser, setPaidByUser] = useState("");
  const paidByFriend = bill ? bill - paidByUser : "";
  const [whoIsPaying, setWhoIsPaying] = useState("user");

  function handleSubmit(e) {
    e.preventDefault();
    if (!bill || !paidByUser) return;
    onHandleSplitBill(whoIsPaying === "user" ? paidByFriend : -paidByUser);
  }
  return (
    <form className="form-split-bill" onSubmit={handleSubmit}>
      <h2>SPLIT A BILL WITH {selectedFriend.name}</h2>
      <label>💰Bill value:</label>
      <input
        type="text"
        value={bill}
        onChange={(e) => setBill(Number(e.target.value))}
      />

      <label>🕴️Your expense:</label>
      <input
        type="text"
        value={paidByUser}
        onChange={(e) =>
          setPaidByUser(
            Number(e.target.value) > bill ? bill : Number(e.target.value)
          )
        }
      />

      <label>🧑‍🤝‍🧑{selectedFriend.name} expense:</label>
      <input type="text" disabled value={paidByFriend} />

      <label>🤑Who is paying the bill?</label>
      <select
        value={whoIsPaying}
        onChange={(e) => setWhoIsPaying(e.target.value)}
      >
        <option value="user">You</option>
        <option value="friend">Anthony</option>
      </select>
      <Button>Split bill</Button>
    </form>
  );
}

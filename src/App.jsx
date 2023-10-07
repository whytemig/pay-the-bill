import "./index.css";
import data from "./App.js";
import { useState } from "react";

function Button({ children, onClick }) {
  // Pass in the onClick function in the Button component.
  return (
    <button className="button" onClick={onClick}>
      {children}
    </button>
  );
}

function App() {
  const [showFr, setShowFr] = useState(false);
  const [friends, setFriends] = useState(data);

  function handleShow() {
    setShowFr((show) => !show);
  }

  function handleShowAddFriend(friend) {
    setFriends((friends) => [...friends, friend]);
    setShowFr(false);
  }
  return (
    <div className="app">
      <div className="sidebar">
        <FriendsList friends={friends} />
        {showFr && <FormAddFriend onAdd={handleShowAddFriend} />}
        <Button onClick={handleShow}>{showFr ? "Close" : "Add Friend"}</Button>
      </div>
      <FormSplit />
    </div>
  );
}

export default App;

// making a component for a LIST OF FRIENDS
function FriendsList({ friends }) {
  return (
    <ul>
      {friends?.map((fr) => {
        return <FriendCard friend={fr} key={fr.id} />;
      })}
    </ul>
  );
}

// Making a component for a single Friend Card.

const FriendCard = ({ friend }) => {
  const { name, image, balance } = friend;
  return (
    <li>
      <img src={image} alt={name} />
      <h3>{name}</h3>

      {balance < 0 ? (
        <p className="red">
          {name} ${Math.abs(balance)}
        </p>
      ) : (
        <p className="green">
          {name} ${Math.abs(balance)}
        </p>
      )}
      <Button>Select</Button>
    </li>
  );
};

const FormAddFriend = ({ onAdd }) => {
  const [name, setName] = useState("");
  const [image, setImage] = useState("https://i.pravatar.cc/48");

  const handleAddFriend = (e) => {
    e.preventDefault();

    if (!name || !image) return;
    const id = crypto.randomUUID();
    const nextFriend = {
      id,
      name,
      image: `${image}?=${id}`,
      balance: 0,
    };
    // console.log(nextFriend);
    onAdd(nextFriend);
    setName("");
    setImage("https://i.pravatar.cc/48");
  };

  return (
    <form className="form-add-friend" onSubmit={handleAddFriend}>
      <label>Friends Name</label>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <label>Image Url</label>
      <input
        type="text"
        value={image}
        onChange={(e) => setImage(e.target.value)}
      />
      <Button>Add</Button>
    </form>
  );
};

function FormSplit() {
  return (
    <form className="form-split-bill">
      <h2>Split a bill with "friend's name"</h2>
      <label>Bill Value</label>
      <input type="text" />

      <label>Your Expenses</label>
      <input type="text" />

      <label>Friends Expense</label>
      <input type="text" disabled />

      <label>Who's paying the Bill?</label>
      <select>
        <option value="user">You</option>
        <option value="friend">Friend</option>
      </select>
      <Button>Bill Split</Button>
    </form>
  );
}

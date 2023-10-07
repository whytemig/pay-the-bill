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
  const [selected, setSelected] = useState(null);

  function handleShow() {
    setShowFr((show) => !show);
  }

  function handleShowAddFriend(friend) {
    setFriends((friends) => [...friends, friend]);
    setShowFr(false);
  }

  function handleSelected(friend) {
    // setSelected(friend);
    setSelected((curr) => (curr?.id === friend.id ? null : friend));
    setShowFr(false);
  }

  function SplitBill(value) {
    setFriends((curr) =>
      curr.map((fr) =>
        fr.id === selected?.id ? { ...fr, balance: fr.balance + value } : fr
      )
    );

    setSelected(null);
  }
  return (
    <div className="app">
      <div className="sidebar">
        <FriendsList
          friends={friends}
          onSelect={handleSelected}
          selectedFr={selected}
        />

        {showFr && <FormAddFriend onAdd={handleShowAddFriend} />}

        <Button onClick={handleShow}>{showFr ? "Close" : "Add Friend"}</Button>
      </div>
      {selected && <FormSplit selected={selected} onSplit={SplitBill} />}
    </div>
  );
}

export default App;

// making a component for a LIST OF FRIENDS
function FriendsList({ friends, onSelect, selectedFr }) {
  return (
    <ul>
      {friends?.map((fr) => {
        return (
          <FriendCard
            friend={fr}
            key={fr.id}
            onSelect={onSelect}
            selectedFr={selectedFr}
          />
        );
      })}
    </ul>
  );
}

// Making a component for a single Friend Card.

const FriendCard = ({ friend, onSelect, selectedFr }) => {
  const { name, image, balance, id } = friend;
  const isSelected = selectedFr?.id === id;

  return (
    <li className={isSelected ? "selected" : ""}>
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
      <Button onClick={() => onSelect(friend)}>
        {isSelected ? "Close" : "Selected"}
      </Button>
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

function FormSplit({ selected, onSplit }) {
  const [bill, setBill] = useState("");
  const [payment, setPayment] = useState("");
  const paidFriend = bill ? bill - payment : "";
  const [whosPaying, setWhosPaying] = useState("user");

  function handleSplit(e) {
    e.preventDefault();
    if (!bill || !payment) return;
    onSplit(whosPaying === "user" ? paidFriend : -payment);
  }
  return (
    <form className="form-split-bill" onSubmit={handleSplit}>
      <h2>Split a bill with {selected.name}</h2>
      <label>Bill Value</label>
      <input
        type="text"
        value={bill}
        onChange={(e) => setBill(Number(e.target.value))}
      />

      <label>Your Expenses</label>
      <input
        type="text"
        value={payment}
        onChange={(e) =>
          setPayment(
            Number(e.target.value) > bill ? payment : Number(e.target.value)
          )
        }
      />

      <label>{selected.name} Expenses</label>
      <input type="text" disabled value={paidFriend} />

      <label>Who is paying the Bill?</label>
      <select
        value={whosPaying}
        onChange={(e) => setWhosPaying(e.target.value)}
      >
        <option value="user">You</option>
        <option value="friend">{selected.name}</option>
      </select>
      <Button>Bill Split</Button>
    </form>
  );
}

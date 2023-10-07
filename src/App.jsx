import "./index.css";
import data from "./App.js";
import { useState } from "react";

function App() {
  const [showFr, setShowFr] = useState(false);
  return (
    <div className="app">
      <div className="sidebar">
        <FriendsList />
        {showFr && <FormAddFriend />}
        <Button>Add Friend</Button>
      </div>
      <FormSplit />
    </div>
  );
}

export default App;

// making a component for a LIST OF FRIENDS
function FriendsList() {
  const friends = data;
  return (
    <ul>
      {friends.map((fr) => {
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
function Button({ children }) {
  return <button className="button">{children}</button>;
}

const FormAddFriend = () => {
  return (
    <form className="form-add-friend">
      <label>Friends Name</label>
      <input type="text" />
      <label>Image Url</label>
      <input type="text" />
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

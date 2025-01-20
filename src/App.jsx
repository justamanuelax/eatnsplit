import PropTypes from "prop-types";
import { initialFriends } from "./Appa.js";
import "./index.css";
import { useState } from "react";

// Button Component: A reusable button that accepts children (label text) and an onClick handler
function Button({ children, onClick }) {
  // Prop types ensure that children is a string and onClick is a function
  Button.propTypes = {
    children: PropTypes.string,
    onClick: PropTypes.func,
  };

  return (
    <button className="button" onClick={onClick}>
      {children}
    </button>
  );
}

// Main App Component: Handles the overall application logic
function App() {
  const [showAddFriend, setShowAddFriend] = useState(false); // Toggles visibility of the add friend form
  const [friends, setFriends] = useState(initialFriends); // Stores the list of friends
  const [selectedFriend, setSelectedFriend] = useState(null); // Tracks the currently selected friend

  // Toggles the visibility of the Add Friend form
  function handleShowAtFriend() {
    setShowAddFriend((show) => !show);
  }

  // Adds a new friend to the list of friends
  function handleAddFriend(friend) {
    setFriends((friends) => [...friends, friend]); // Append the new friend to the list
    setShowAddFriend(true); // Close the Add Friend form
  }

  // Selects or deselects a friend
  function handleSelection(friend) {
    setSelectedFriend((cur) => (cur?.id === friend.id ? null : friend));
    setShowAddFriend(false); // Ensure the Add Friend form is closed when a friend is selected
  }

  // Updates the balance of the selected friend based on the split bill logic
  function handleSplitBill(value) {
    setFriends((friends) =>
      friends.map((friend) =>
        friend.id === selectedFriend.id
          ? { ...friend, balance: friend.balance + value } // Update balance for the selected friend
          : friend
      )
    );
    setSelectedFriend(null);
  }

  return (
    <div className="app">
      <div className="sidebar">
        {/* Friend list and Add Friend form */}
        <Friendlist
          friends={friends}
          onSelection={handleSelection}
          selectedFriend={selectedFriend}
        />

        {showAddFriend && <FormAddFriend onAddFriend={handleAddFriend} />}

        <Button onClick={handleShowAtFriend}>
          {showAddFriend ? "Close " : "Add Friends"}
        </Button>
      </div>

      {selectedFriend && (
        <FormSplitBill
          selectedFriend={selectedFriend}
          onSplitBill={handleSplitBill}
        />
      )}
    </div>
  );
}

// Friendlist Component: Displays the list of friends
function Friendlist({ friends, onSelection, selectedFriend }) {
  Friendlist.propTypes = {
    friends: PropTypes.array, // List of friends (array)
    onSelection: PropTypes.func, // Function to handle friend selection
    selectedFriend: PropTypes.object, // Currently selected friend (object)
  };

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

// Friend Component: Represents a single friend in the list
function Friend({ friend, onSelection, selectedFriend }) {
  const isSelected = selectedFriend?.id === friend.id; // Check if this friend is selected

  Friend.propTypes = {
    friend: PropTypes.shape({
      id: PropTypes.string,
      name: PropTypes.string,
      image: PropTypes.string,
      balance: PropTypes.number,
    }),
    onSelection: PropTypes.func,
    selectedFriend: PropTypes.object,
  };

  return (
    <li className={isSelected ? "selected" : ""}>
      <img src={friend.image} alt={friend.name} />
      <h3>{friend.name}</h3>

      {/* Conditional rendering for balance messages */}
      {friend.balance < 0 && (
        <p className="red">
          You owe {friend.name} $ {Math.abs(friend.balance)}
        </p>
      )}
      {friend.balance > 0 && (
        <p className="green">
          {friend.name} owes me ${Math.abs(friend.balance)}
        </p>
      )}
      {friend.balance === 0 && (
        <p>
          Me and {friend.name} are even ${Math.abs(friend.balance)}
        </p>
      )}
      <Button onClick={() => onSelection(friend)}>
        {isSelected ? "Close" : "Select"}
      </Button>
    </li>
  );
}

// FormAddFriend Component: Handles adding a new friend
function FormAddFriend({ onAddFriend }) {
  FormAddFriend.propTypes = {
    onAddFriend: PropTypes.func.isRequired, // Function to add a friend
  };

  const [name, setName] = useState(""); // Friend name input state
  const [image, setImage] = useState("https://i.pravatar.cc/48?u=499476"); // Image URL input state

  function handleSubmit(e) {
    e.preventDefault(); // Prevent form submission default behavior

    if (!name || !image) return; // Validate inputs

    const id = crypto.randomUUID(); // Generate a unique ID for the new friend
    const newFriend = {
      name,
      id,
      image: `${image}?=${id}`, // Append the ID to the image URL for uniqueness
      balance: 0, // Initialize balance to 0
    };

    onAddFriend(newFriend); // Call the add friend handler
    setName(""); // Reset the name input
    setImage("https://i.pravatar.cc/48?u=499476"); // Reset the image input
  }

  return (
    <form className="form-add-friend" onSubmit={handleSubmit}>
      <label>🧑‍🦰👩‍🦰 Friend Name:</label>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <label>🖼️ Image URL</label>
      <input
        type="text"
        value={image}
        onChange={(e) => setImage(e.target.value)}
      />
      <Button>Add</Button>
    </form>
  );
}

// FormSplitBill Component: Handles the logic for splitting a bill
function FormSplitBill({ selectedFriend, onSplitBill }) {
  const [bill, setBill] = useState(""); // Bill amount input state
  const [paidByUser, setPaidByUser] = useState(""); // Amount paid by the user input state
  const paidByFriend = bill ? bill - paidByUser : ""; // Calculate the friend's share
  const [WhoIsPaying, setWhoIsPaying] = useState(""); // Who is paying input state

  FormSplitBill.propTypes = {
    selectedFriend: PropTypes.object, // The currently selected friend
    onSplitBill: PropTypes.func, // Function to handle splitting the bill
  };

  function handleSubmit(e) {
    e.preventDefault(); // Prevent default form submission behavior

    if (!bill || !paidByUser) return; // Validate inputs

    onSplitBill(WhoIsPaying === "user" ? -paidByUser : paidByUser); // Update balances
  }

  return (
    <form className="form-split-bill" onSubmit={handleSubmit}>
      <h2>Split a bill with {selectedFriend.name}</h2>

      <label>💰 Bill Value</label>
      <input
        type="text"
        value={bill}
        onChange={(e) => setBill(+e.target.value)}
      />

      <label>🥺 Your Expense</label>
      <input
        type="text"
        value={paidByUser}
        onChange={(e) =>
          setPaidByUser(+e.target.value) > bill ? paidByUser : Number(e.target.value)
        }
      />

      <label>👦👧 {selectedFriend.name}'s expense</label>
      <input type="text" disabled value={paidByFriend} />

      <label>🤑 Who is paying the bill</label>
      <select
        value={WhoIsPaying}
        onChange={(e) => setWhoIsPaying(e.target.value)}
      >
        <option value="user">You</option>
        <option value="friend">{selectedFriend.name}</option>
      </select>
      <Button>Split Bill</Button>
    </form>
  );
}

export default App;

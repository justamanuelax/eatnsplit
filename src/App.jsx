import PropTypes from "prop-types";
import { initialFriends } from "./Appa.js";
import "./index.css";
import {useState} from "react";

function Button({children, onClick}){

  Button.propTypes = {
    children: PropTypes.string,
    onClick: PropTypes.func
  }
  return(
    <button className="button" onClick={onClick}>{children}</button>
  )
}



function App() {
  const [showAddFriend, setShowAddFriend] = useState(false);
  const [friends, setFriends] = useState(initialFriends)
  const [selectedFriend, setSelectedFriend] = useState(null);
    
    function handleShowAtFriend(){
      setShowAddFriend((show) => !show)
    }
    function handleAddFriend(friend){
      setFriends(friends => [...friends, friend]);
      // Don't mutate the prop just use state like this and pass it like this.
      // spread all the current elements and adding the friend as shoen.
      setShowAddFriend(true);
    }
  
    function handleSelection(friend){
      setSelectedFriend((cur) => (cur?.id === friend.id ? null : friend));
      setShowAddFriend(false);
    }

   function handleSplitBill(value){
        
       setFriends((friends) => friends.map((friend) => friend.id === selectedFriend.id ? {...friend, balance: friend.balance + value} : friend))
    }

    return (
  
      <div className="app">
        <div className="sidebar">

          <Friendlist friends={friends} onSelection={handleSelection} selectedFriend={selectedFriend}/>

          {showAddFriend && <FormAddFriend onAddFriend={handleAddFriend}/>}
          <Button onClick={handleShowAtFriend}>{showAddFriend ? "Close " : "Add Friends"}</Button>

        </div>
      {selectedFriend &&<FormSplitBill selectedFriend={selectedFriend} onSplitBill={handleSplitBill}/>}
      </div>
  )
}

function Friendlist({friends, onSelection, selectedFriend}){
  Friendlist.propTypes = {
    friends: PropTypes.array,
    onSelection: PropTypes.func,
    selectedFriend: PropTypes.object 
  }
  
  return(
    <ul>
      {friends.map((friend) => (
        <Friend friend={friend} key={friend.id} onSelection={onSelection} selectedFriend={selectedFriend}/>
        
      ))}
    </ul>

  )
}

function Friend({ friend, onSelection, selectedFriend }){
  const isSelected = selectedFriend?.id === friend.id;
  Friend.propTypes = {
    friend: PropTypes.shape({
      id: PropTypes.string,
      name: PropTypes.string,
      image: PropTypes.string,
      balance: PropTypes.number
    }),
    onSelection: PropTypes.func,
    selectedFriend: PropTypes.object
  }
  return(
    <li className={isSelected ? "selected" : ""}>
      <img src={friend.image} alt={friend.name} />
      <h3>{friend.name}</h3>

      {friend.balance < 0 && (
        <p className="red">
            You owe {friend.name} $ {Math.abs(friend.balance) }
        </p>
      )}
      {friend.balance > 0 && (
        <p className="green">
          {friend.name} owes me ${Math.abs(friend.balance) }
        </p>
      )}
      {friend.balance === 0 && (
        <p>
          Me and {friend.name} are even ${Math.abs(friend.balance) }
        </p>
      )}
  <Button onClick={() => onSelection(friend)}>{isSelected ? "Close" : "Select"}</Button>
    </li>
)
}


function FormAddFriend({onAddFriend}){
  FormAddFriend.propTypes = {
    onAddFriend: PropTypes.func.isRequired
      
  }
  const [name , setName] = useState("");
  const [image, setImage] = useState("https://i.pravatar.cc/48?u=499476");

  function handleSubmit(e){
    e.preventDefault();
    
      if(!name || !image) return;
      
    const id = crypto.randomUUID();
    const newFriend = {
      name,
      id,
      image: `${image}?=${id}`,
      balance: 0,
    }
    
    onAddFriend(newFriend);
    setName("");
    setImage("https://i.pravatar.cc/48?u=499476");
  }
  return(
    <form className="form-add-friend" onSubmit={handleSubmit} >
      <label>
      🧑‍🦰👩‍🦰 Friend Name: 
      </label>
      <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
      <label>🖼️ Image URL</label>
      <input type="text"  value={image} onChange={(e) => setImage(e.target.value)}/>
        <Button>Add</Button>
    </form>
  )
}

function FormSplitBill({selectedFriend, onSplitBill}){
  const [bill, setBill] = useState("");
  const [paidByUser, setPaidByUser] = useState("");
  const paidByFriend = bill ? bill - paidByUser : "";
  const [WhoIsPaying, setWhoIsPaying] = useState("");
  FormSplitBill.propTypes = {
    selectedFriend: PropTypes.object,
    onSplitBill: PropTypes.func
  }

  function handleSubmit(e) {
    e.preventDefault();

    if(!bill || !paidByUser) return;

    onSplitBill(WhoIsPaying === "user" ? paidByFriend : -paidByUser);

  }
  return(
    <form className="form-split-bill" onSubmit={handleSubmit}>
      <h2> Split a bill with {selectedFriend.name}  </h2>
      
      <label>💰 Bill Value</label>
      <input type="text" value={bill} onChange={(e) => setBill(+e.target.value)}/>
      
      <label> 🥺 Your Expense</label>
        <input type="text" value={paidByUser} onChange={(e) => setPaidByUser(+e.target.value) > bill ? paidByUser : Number(e.target.value)}/>

        <label>👦👧 {selectedFriend.name}`s expense</label>
        <input type="text" disabled  value={paidByFriend}/>

        <label>🤑 Who is paying the bill</label>
        <select value={WhoIsPaying} onChange={(e) => setWhoIsPaying(e.target.value)}>
          <option value="user">You</option>
          <option value="friend">{selectedFriend.name}</option>
        </select>
      <Button>Split Bill</Button>
    </form>
  )
}
export default App

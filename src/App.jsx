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
  
    function handleShowAtFriend(){
      setShowAddFriend((show) => !show)
    }
    function handleAddFriend(friend){
      setFriends(friends => [...friends, friend]);
      // Don't mutate the prop just use state like this and pass it like this.
      // spread all the current elements and adding the friend as shoen.
      setShowAddFriend(true);
    }
  
    return (
  
      <div className="app">
        <div className="sidebar">
          <Friendlist friends={friends} />
          {showAddFriend && <FormAddFriend onAddFriend={handleAddFriend}/>}
          <Button onClick={handleShowAtFriend}>{showAddFriend ? "Close " : "Add Friends"}</Button>

        </div>
      <FormSplitBill/>
      </div>
  )
}

function Friendlist({friends}){
  Friendlist.propTypes = {
    friends: PropTypes.array
  }
    
  
  return(
    <ul>
      {friends.map((friend) => (
        <Friend friend={friend} key={friend.id} />

      ))}
    </ul>

  )
}

function Friend({ friend }){
  Friend.propTypes = {
    friend: PropTypes.shape({
      id: PropTypes.string,
      name: PropTypes.string,
      image: PropTypes.string,
      balance: PropTypes.number
    })
  }
  return(
    <li>
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
  <Button>Select</Button>
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

function FormSplitBill(){
  return(
    <form className="form-split-bill">
      <h2> Split a bill with X </h2>
      
      <label>💰 Bill Value</label>
      <input type="text"/>
      
      <label> 🥺 Your Expense</label>
        <input type="text" />

        <label>👦👧 Xs expense</label>
        <input type="text" disabled />

        <label>🤑 Who is paying the bill</label>
        <select>
          <option value="user">You</option>
          <option value="friend">X</option>
        </select>
      <Button>Split Bill</Button>
    </form>
  )
}
export default App

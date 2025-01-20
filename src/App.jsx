import PropTypes from "prop-types";
import { initialFriends } from "./Appa.js";
import "./index.css";


function App() {

  return (
  
      <div className="app">
        <div className="sidebar">
          <Friendlist />
          <FormAddFriend/>
          <Button>Add Friends</Button>
        </div>
      <FormSplitBill/>
      </div>
  )
}

function Friendlist(){
    const friends = initialFriends;
  
  return(
    <ul>
      {friends.map((friend) => (
        <Friend friendy={friend} key={friend.id} />

      ))}
    </ul>

  )
}

function Friend({ friendy }){
  Friend.propTypes = {
    friendy: PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      image: PropTypes.string.isRequired,
      balance: PropTypes.number.isRequired
    }).isRequired
  }
  return(
    <li>
      <img src={friendy.image} alt={friendy.name} />
      <h3>{friendy.name}</h3>

      {friendy.balance < 0 && (
        <p className="red">
            You owe {friendy.name} $ {Math.abs(friendy.balance) }
        </p>
      )}
      {friendy.balance > 0 && (
        <p className="green">
          {friendy.name} owes me ${Math.abs(friendy.balance) }
        </p>
      )}
      {friendy.balance === 0 && (
        <p>
          Me and {friendy.name} are even ${Math.abs(friendy.balance) }
        </p>
      )}
  <Button>Select</Button>
    </li>
)
}

function Button({children}){
  Button.propTypes = {
    children: PropTypes.string
  }
  return(
    <button className="button">{children}</button>
  )
}

function FormAddFriend(){
  return(
    <form className="form-add-friend">
      <label>
      🧑‍🦰👩‍🦰  Friend Name : 
      </label>
      <input type="text" />
      <label htmlFor="">🖼️ Image URL</label>
      <input type="text" />
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

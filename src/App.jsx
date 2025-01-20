import PropTypes from "prop-types";
import { initialFriends } from "./Appa.js";
import "./index.css";


function App() {

  return (
  
      <div className="app">
        <div className="sidebar">
          <Friendlist />
        </div>
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
      <button className="button">Select</button>
    </li>
  )
}

export default App

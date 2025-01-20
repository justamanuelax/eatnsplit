import PropTypes from "prop-types";
import { initialFriends } from "./Appa.js";
import "./index.css";


function App() {

  return (
    <>
      <div className="app">
        <div className="sidebar">
          <Friendlist />
        </div>
      </div>
    </>
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

function Friend([friendy]){
  Friend.PropTypes = {
    friendy: PropTypes.array
  }
  return(
    <li>
      <img src={friendy} alt={friendy.name} />
      <h3>{friendy.name}</h3>

      {friendy.balance < 0 && (
        <p className="red">
            You owe {friendy.name} ${Math.abs(friendy.balance) }
        </p>
      )}
      {friendy.balance > 0 && (
        <p className="green">
            You owe {friendy.name} ${Math.abs(friendy.balance) }
        </p>
      )}
      {friendy.balance < 0 && (
        <p className="red">
            You owe {friendy.name} ${Math.abs(friendy.balance) }
        </p>
      )}
    </li>
  )
}

export default App

import './App.css';
import testApi from './api/TestApi';
import React, {useState} from "react"
import registerUser from './api/RegisterUser';

function App() {
  const [message, setMessage] = useState("");

  const handleTest = async() => {
    const response = await testApi();
    setMessage(response)
  }

  const handleRegistration = async() => {
    const response = await registerUser()
    console.log(response)
  }

  return (
    <div className="App">
      <header>
        Bike System Main Page
      </header>
      <button onClick={handleRegistration}>
        Register user with Hardcoded Data
      </button>
    </div>
  );
}

export default App;

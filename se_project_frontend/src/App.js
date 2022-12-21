import './App.css';
import testApi from './api/TestApi';
import React, {useState} from "react"
import Form from "./Form"

function App() {
  const [message, setMessage] = useState("");

  const handleTest = async() => {
    const response = await testApi();
    setMessage(response)
  }

  return (
    <div className="App">
      <Form />
      <a href='http://localhost:8081/login'>Sign in</a>
    </div>
  );
}

export default App;

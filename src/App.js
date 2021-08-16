import './App.css';
import React from 'react';
import {ToDoList} from './components/ToDoList';

function App() {
  //localStorage.clear();
  const [storageConsent, setStorageConsent] = React.useState((localStorage.getItem("storageConsent") === "true") ? true : (localStorage.getItem("storageConsent") === "false") ? false : "Not Set");
  const toDoData = JSON.parse(localStorage.getItem("todolistdata")) || {toDoListTasks:[], toDoListTime:0}
  const toDoTasks = toDoData.toDoListTasks
  const toDoTime = toDoData.toDoListTime

  const setConsent = (e) => {
    localStorage.setItem("storageConsent", e);
    setStorageConsent(e);
  }

  const requestConsent = () => {
    return (
      <div>
        <h2>This app can save your task list to your browser so you can access it later.</h2>
        <p>Do you want to allow this?</p>
        <button style={{color: "black"}} onClick={(e) => setConsent(true)}>Enable Task Storage</button><button style={{color: "black", marginLeft:"1rem"}} onClick={(e) => setConsent(false)}>Don't Enable Task Storage</button>
      </div>
    )
  }
  //console.log(toDoData);
  //console.log(JSON.parse(localStorage.getItem("todolistdata")));
  return (
    <div className="App">
      <header className="App-header">
        <h1>Task Tracker</h1>
        <p>Created by <a href="https://www.louisleslie.co.uk" target="_blank" rel="noreferrer">Louis Leslie</a></p>
      </header>
      <main>
        {(Object.keys(localStorage).indexOf("storageConsent") === -1) ? requestConsent() : <ToDoList toDoListTasks={toDoTasks} toDoListTime={toDoTime} storageConsent={storageConsent} /> }
      </main>
    </div>
  );
}

export default App;

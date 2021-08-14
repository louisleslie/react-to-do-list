import './App.css';
import {ToDoList} from './components/ToDoList';

function App() {
  //localStorage.clear();
  const toDoData = JSON.parse(localStorage.getItem("todolistdata")) || {toDoListTasks:[], toDoListTime:0}
  const toDoTasks = toDoData.toDoListTasks
  const toDoTime = toDoData.toDoListTime
  //console.log(toDoData);
  //console.log(JSON.parse(localStorage.getItem("todolistdata")));
  return (
    <div className="App">
      <header className="App-header">
        <h1>Task Tracker</h1>
        <p>Created by <a href="https://www.github.com/louisleslie" target="_blank">Louis Leslie</a></p>
      </header>
      <main>
        <ToDoList toDoListTasks={toDoTasks} toDoListTime={toDoTime} />
      </main>
    </div>
  );
}

export default App;

import './App.css';
import {ToDoList} from './components/ToDoList';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Today's Tasks</h1>
      </header>
      <main>
        <ToDoList />
      </main>
    </div>
  );
}

export default App;

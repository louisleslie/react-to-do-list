import React from 'react';
import { Task } from './Task';
import './ToDoList.css';

const ToDoList = (props) => {
  const [toDoListTime, setToDoListTime] = React.useState(props.toDoListTime);
  const [toDoListTasks, setTasks] = React.useState(props.toDoListTasks); //Use an array of objects with the props for each, not the task instance itself!

  const removeTask = (removeTaskId) => {
    let currentTasks = toDoListTasks;
    let newTasks = [];
    currentTasks.forEach((task) => {
      if (task.taskId !== removeTaskId) {
        newTasks.push(task);
      }
    })
    let newTime = totalTime(newTasks);
    setToDoListTime(newTime);
    setTasks(newTasks);
  }

  const totalTime = (toDoListTasks) => {
    let totalCount = 0;
    toDoListTasks.forEach((comp) => {
      totalCount += parseFloat(comp.taskTime);
    })
    return totalCount;
  }

  const maxIndex = () => {
     if (toDoListTasks.length === 0) {
      return 0
    }
    let m = toDoListTasks.map((task) => task.taskId);
    let maxOfM = Math.max(...m);
    return maxOfM + 1;
  }

  const updateTask = (e, formValues) => {
    console.log("Form Values: ");
    console.log(formValues);
    let updatedTasks = [];
    toDoListTasks.forEach((task) => {
      if (task.taskId === formValues.taskId) {
        console.log("updating this task: ");
        console.log(task);
        let updatedTask = Object.assign({}, task, formValues);
        updatedTasks.push(updatedTask);
      } else {
        updatedTasks.push(task);
      }
    })
    console.log(updatedTasks);
    let updatedTime = totalTime(updatedTasks);
    setToDoListTime(updatedTime);
    setTasks(updatedTasks);
  }

  const addTask = (e) => {
    e.preventDefault();
    let oldTasks = toDoListTasks;
    //create new task
    const newId = maxIndex();
    let newTask = <Task taskName={e.target.querySelector("#taskName").value} taskId={newId} taskTime={e.target.querySelector("#timeTaken").value} removeTask={removeTask} updateTask={updateTask}/>;
    let newTasks = [...oldTasks, newTask.props];
    let newTime = totalTime(newTasks);
    setTasks(newTasks);
    setToDoListTime(newTime);
    e.target.querySelector("#taskName").value = "";
    e.target.querySelector("#timeTaken").value = "";
  }

  const listTasks = toDoListTasks.map((task) => {
    return <Task taskName={task.taskName} taskTime={task.taskTime} taskCompleted={task.taskCompleted} taskId={task.taskId} key={task.taskId} removeTask={removeTask} updateTask={updateTask} />
  });
  

  return (
    <div>
      <div className="to-do-list-manager">
        <div className="to-do-list-summary">
          <p>Total Tasks: {toDoListTasks.length}</p>
          <p>Estimated Total Time: {toDoListTime} hrs</p>
        </div>
        <form className="to-do-form" onSubmit={(e) => addTask(e)}>
          <input id="taskName" type="text" placeholder="Task Name..."></input>
          <br></br>
          <label htmlFor="time">Estimated Time (Hrs): </label>
          <input name="time" id="timeTaken" type="number" step="0.1"></input>
          <br></br>
          <input type="submit" value="Add Task" />
        </form>
      </div>
      <div className="task-container">
        {listTasks}
      </div>
    </div>
  );
}

ToDoList.defaultProps = {
  toDoListTime: 0,
  toDoListTasks: [],
}

export { ToDoList };
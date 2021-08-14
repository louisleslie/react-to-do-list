import React from 'react';
import { Task } from './Task';
import './ToDoList.css';

const ToDoList = (props) => {
  const [toDoListTasks, setTasks] = React.useState(props.toDoListTasks); //Use an array of objects with the props for each, not the task instance itself!
  const [toDoListTime, setToDoListTime] = React.useState(props.toDoListTime);
  const [formTaskTime, setFormTaskTime] = React.useState(0);
  const saveTasks = (tasklist, totaltime) => {
    localStorage.setItem("todolistdata", JSON.stringify({toDoListTasks: tasklist, toDoListTime: totaltime}));
  }
  
  const removeTask = (removeTaskId) => {
    let currentTasks = toDoListTasks;
    let newTasks = [];
    currentTasks.forEach((task) => {
      if (task.taskId !== removeTaskId) {
        newTasks.push(task);
      } else {
        if (window.confirm(`Are you sure you want to delete '${task.taskName}'?`) === false) {
          newTasks.push(task)
        }
      }
    })
    let newTime = remainingTime(newTasks);
    setToDoListTime(newTime);
    setTasks(newTasks);
    saveTasks(newTasks, newTime);
  }
  
  const totalCompleted = () => {
    let completedCount = 0;
    toDoListTasks.forEach((task) => {
      console.log(`task Completed: ${task.taskCompleted}`);
      if (task.taskCompleted) {
        completedCount += 1;
      }
    });
    return completedCount;
  }
  
  const remainingTime = (toDoListTasks) => {
    let totalCount = 0;
    toDoListTasks.forEach((task) => {
      if (!task.taskCompleted) {
        totalCount += parseFloat(task.taskTime);
      }
    });
    return `${Math.floor(totalCount/60)} Hrs ${totalCount % 60} mins`;
  }

  const totalTime = () => {
    let totalCount = 0;
    toDoListTasks.forEach((task) => {
      totalCount += parseFloat(task.taskTime);
    });
    //return Math.round((totalCount/60) * 10)/10;
    return `${Math.floor(totalCount/60)} Hrs ${totalCount % 60} mins`;
  }

  const maxIndex = () => {
     if (toDoListTasks.length === 0) {
      return 0
    }
    let m = toDoListTasks.map((task) => task.taskId);
    let maxOfM = Math.max(...m);
    return maxOfM + 1;
  }

  const updateTask = (formValues) => {
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
    });
    console.log(updatedTasks);
    let updatedTime = remainingTime(updatedTasks);
    setToDoListTime(updatedTime);
    setTasks(updatedTasks);
    saveTasks(updatedTasks, updatedTime);
  }

  const addTask = (e) => {
    e.preventDefault();
    let oldTasks = toDoListTasks;
    //create new task
    const newId = maxIndex();
    let newTask = <Task taskName={e.target.querySelector("#taskName").value} taskId={newId} taskTime={e.target.querySelector("#timeTaken").value} removeTask={removeTask} updateTask={updateTask}/>;
    let newTasks = [newTask.props, ...oldTasks];
    let newTime = remainingTime(newTasks);
    setTasks(newTasks);
    setToDoListTime(newTime);
    saveTasks(newTasks, newTime);
    setFormTaskTime(0);
    e.target.querySelector("#taskName").value = "";
    e.target.querySelector("#timeTaken").value = formTaskTime;
    e.target.querySelector("#taskName").focus();
  }

  const listTasks = toDoListTasks.sort(function(x, y) {
    return (x.taskCompleted === y.taskCompleted)? 0 : x.taskCompleted? 1 : -1;
  }).map(function(task) {
    return <Task taskName={task.taskName} taskTime={task.taskTime} taskCompleted={task.taskCompleted} taskId={task.taskId} key={task.taskId} removeTask={removeTask} updateTask={updateTask} />
  });
  
  return (
    <div className="to-do-list-wrapper">
      <div className="to-do-list-manager">
        <div className="task">
          <form className="task-form" onSubmit={(e) => addTask(e)}>
            <input className="task-form-name" id="taskName" type="text" placeholder="Task Name..."></input>
            <div className="task-form-time">
            <label htmlFor="time">Estimated Time <input name="time" id="timeTaken" type="number" value={formTaskTime} onChange={(e) => setFormTaskTime(e.target.value)}></input> (mins): </label>
            </div>
            <input type="submit" value="Add Task" />
          </form>
        </div>
        <div className="to-do-list-summary">
          <p>Completed Tasks: {totalCompleted()} / {toDoListTasks.length} </p>
          <p>Estimated Time to Complete:  {remainingTime(toDoListTasks)}</p>
          <p>Total Time:  {totalTime()}</p>
        </div>
      </div>
      <div className="task-container">
            {(toDoListTasks.length) ? listTasks : <p className="no-task">No Tasks to Show...</p> }
      </div>
    </div>
  );
}

ToDoList.defaultProps = {
  toDoListTasks: [],
  toDoListTime: "",
}

export { ToDoList };
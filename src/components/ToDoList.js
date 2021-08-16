import React from 'react';
import { Task } from './Task';
import './ToDoList.css';

const ToDoList = (props) => {
  const [toDoListTasks, setTasks] = React.useState(props.toDoListTasks); //Use an array of objects with the props for each, not the task instance itself!
  const [toDoListTime, setToDoListTime] = React.useState(props.toDoListTime);
  const [storageConsent, setStorageConsent] = React.useState(props.storageConsent);
  const [formTaskTime, setFormTaskTime] = React.useState(0);
  
  const saveTasks = (tasklist, totaltime) => {
    if (storageConsent) {
      localStorage.setItem("todolistdata", JSON.stringify({toDoListTasks: tasklist, toDoListTime: totaltime}));
    }
  }
  
  const removeConsent = (e) => {
    localStorage.removeItem("todolistdata");
    localStorage.setItem("storageConsent", false);
    setStorageConsent(false);
  }

  const fullyRemoveConsent = (e) => {
    localStorage.clear();
    setStorageConsent(false);
  }

  const addConsent = (e) => {
    setStorageConsent(true);
    localStorage.setItem("storageConsent", true);
    localStorage.setItem("todolistdata", JSON.stringify({toDoListTasks: toDoListTasks, toDoListTime: totalTime}));
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

  const handlePrivacyClick = (e) => {
    if (e.target === document.querySelector(".privacy-notice-wrapper")) {
      //console.log("Click was on the Privacy Notice Wrapper!");
      e.target.classList.add("hidden");
      document.removeEventListener("click", handlePrivacyClick);
    } else if (e.target === document.getElementById("privacy-notice-close")) {
      //console.log("Click was on the Privacy Notice Close button!");
      document.querySelector(".privacy-notice-wrapper").classList.add("hidden");
      document.removeEventListener("click", handlePrivacyClick);
    }
  }

  const showPrivacy = (event) => {
    document.querySelector(".privacy-notice-wrapper").classList.toggle("hidden");
    if (!document.querySelector(".privacy-notice-wrapper").classList.contains("hidden")) {
      //console.log("The privacy div is not hidden");
      document.addEventListener("click", handlePrivacyClick);
    } else {
      document.removeEventListener("click", handlePrivacyClick);
    }
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
          <form className="task-form" onSubmit={(e) => addTask(e)} autoComplete="off">
            <input className="task-form-name" id="taskName" type="text" placeholder="Task Name..."></input>
            <div className="task-form-time">
            <label htmlFor="time">Estimated Time <input name="time" id="timeTaken" type="number" value={formTaskTime} onChange={(e) => setFormTaskTime(e.target.value)}></input> (mins): </label>
            </div>
            <input type="submit" value="Add Task" />
          </form>
        </div>
        <div className="to-do-list-summary">
          <p>Completed Tasks: {totalCompleted()} / {toDoListTasks.length} </p>
          <p>Estimated Time to Complete:  {toDoListTime}</p>
          <p>Total Time:  {totalTime()}</p>
        </div>
        <div className="to-do-list-storage">
          {(storageConsent) ? <button onClick={(e) => removeConsent(true)}>Delete My Data</button> : <button onClick={(e) => addConsent(true)}>Save my Data</button>}
          <br></br>
          <button className="privacy-notice-link" onClick={(e) => showPrivacy()}>Learn more</button>
          <div className="privacy-notice-wrapper hidden">
            <div className="privacy-notice">
              <button id="privacy-notice-close" className="privacy-notice-close" style={{color: 'black'}}>X</button>
              <h3>Data Storage</h3>
              <p>This site can store your tasks in your browser's local storage, enabling you to access them when you reload the page. Your data stays on your device, but as a browser's local storage data can be accessed very easily, we do not reccommend using the site to store sensitive or personal data. </p>
              {(storageConsent) ? <div><p>You are currently allowing the site to save your data.</p><p>If you want to remove the saved data, you can just click the button below. This will remove any data the site holds in local storage, but your current tasks will remain on the page until you reload the page.</p><button onClick={(e) => fullyRemoveConsent(true)}>Delete My Data</button></div> : <div><p>Your data is not currently being saved. When you reload the page, any existing tasks will be lost.</p><button onClick={(e) => addConsent(true)}>Save my Data</button></div>}
            </div>
          </div>
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
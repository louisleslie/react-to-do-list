import React from 'react';
import './Task.css';

const Task = (props) => {
  const taskId = props.taskId;
  const taskName = props.taskName;
  const taskCompleted = props.taskCompleted;
  const taskTime = props.taskTime;
  const [formName, setFormName] = React.useState(props.taskName);
  const [formTime, setFormTime] = React.useState(props.taskTime);
  const [formCompleted, setFormCompleted] = React.useState(props.taskCompleted);
  const [formDisplay, setFormDisplay] = React.useState(props.formDisplay);
  const [taskDisplay, setTaskDisplay] = React.useState(props.taskDisplay);
  
  const clickView = (e) => {
    setFormDisplay("block");
    setTaskDisplay("none");
  }
  
  const formValues = {taskName: formName, taskTime: formTime, taskId: taskId, taskCompleted: formCompleted, taskDisplay:"block" };

  const handleUpdateSubmit = (e) => {
    e.preventDefault();
    console.log(formCompleted);
    setTaskDisplay("block");
    setFormDisplay("none");
    props.updateTask(e, formValues);
  }
  
  

  return (
    <div className="task">
      <div className="task-view" onClick={(e) => clickView(e)} style={{display: taskDisplay}}>
        <h2 style={{fontSize:'2rem'}} >{taskName}</h2>
        <p>Estimated Time: {taskTime} Hrs</p>
        <p>Completed: {taskCompleted.toString()}</p>
      </div>
      <form className="task-form" onSubmit={(e) => handleUpdateSubmit(e)} style={{display: formDisplay}} >
        <input style={{fontSize:'2rem', textAlign:'center'}} type="text" name="taskName" value={formName} onChange={(e) => setFormName(e.target.value)}></input>
        <label htmlFor="time">Estimated Time: </label>
        <input name="time" id="timeTaken" type="number" step="0.1" value={formTime} onChange={(e) => setFormTime(e.target.value)}></input>
        <label htmlFor="completed">Completed: </label>
        <input name="completed" id="taskCompleted" type="checkbox" checked={formCompleted} onChange={(e) => setFormCompleted(e.target.checked)}></input>
        <input type="submit" value="update"></input>
      </form>
      
      <button>Add a Task</button>
      <button onClick={(e) => props.removeTask(props.taskId)}>Remove Task</button>
    </div>
  );
}

Task.defaultProps = {
  taskName: "Untitled",
  taskTime: 1,
  taskCompleted: false,
  taskComponents: [],
  taskTasks: [],
  formDisplay: "none",
  taskDisplay: "block",
}

export { Task };
import React from 'react';
import './Task.css';

const Task = (props) => {
  const taskId = props.taskId;
  const taskName = props.taskName;
  const taskCompleted = props.taskCompleted;
  const taskTime = props.taskTime;
  const [formName, setFormName] = React.useState(props.taskName);
  const [formTime, setFormTime] = React.useState(props.taskTime);
  const [formDisplay, setFormDisplay] = React.useState(props.formDisplay);
  const [taskDisplay, setTaskDisplay] = React.useState(props.taskDisplay);

  const signalController = new AbortController();

  const handleFormEscape = (e) => {
    //console.log(e.key);
    //console.log(document.activeElement)
    if (e.key === "Escape") {
      setFormDisplay("none");
      setTaskDisplay("block");
      setFormName(taskName);
      setFormTime(taskTime);
      signalController.abort();
      //console.log("Removing event listener");
    }
  }

  const clickView = (e) => {
    //console.log("Adding event listener");
    setFormDisplay("flex");
    setTaskDisplay("none");
    document.getElementById(`task-form-${taskId}`).addEventListener("keyup", handleFormEscape, {signal: signalController.signal});
    document.getElementById(`task-name-${taskId}`).click();
    //console.log(document.activeElement);
  }
  
  const formValues = {taskName: formName, taskTime: formTime, taskId: taskId, taskCompleted: props.taskCompleted, taskDisplay:"block" };

  const handleCompleteClick = (e) => {
    e.preventDefault();
    //console.log(`Complete clicked! ${formCompleted} ${!formCompleted}`);
    //console.log(formValues);
    const newFormValues = formValues;
    (taskCompleted) ? newFormValues.taskCompleted = false : newFormValues.taskCompleted = true;
    //console.log(newFormValues);
    
    props.updateTask(newFormValues);
  }

  const handleUpdateSubmit = (e) => {
    e.preventDefault();
    //console.log("Removing event listener");
    //console.log(signalController);
    signalController.abort();
    //console.log(signalController);
    //console.log(formCompleted);
    setTaskDisplay("block");
    setFormDisplay("none");
    props.updateTask(formValues);
  }
  
  

  return (
    <div className={`task ${(taskCompleted) ? "completed" : "uncompleted"}`}>
      <div className="task-view" onClick={(e) => clickView(e)} style={{display: taskDisplay}}>
        <h2>{taskName}</h2>
        <p>Estimated Time: {taskTime} mins</p>
      </div>
      <form  autoComplete="off" className="task-form" id={`task-form-${taskId}`} onSubmit={(e) => handleUpdateSubmit(e)} style={{display: formDisplay}} >
        <input className="task-form-name" id={`task-name-${taskId}`} type="text" name="taskName" value={formName} onChange={(e) => setFormName(e.target.value)}></input>
        <div className="task-form-time">
          <label htmlFor="time">Estimated Time: <input name="time" id="timeTaken" type="number" value={formTime} onChange={(e) => setFormTime(e.target.value)}></input> (mins)</label>
        </div>
        <input type="submit" value="Update"></input>
      </form>
        {(taskCompleted) ? <button className="task-complete" style={{display: taskDisplay}} onClick={(e) => handleCompleteClick(e)}>Mark Incomplete</button> : <button className="task-complete" style={{display: taskDisplay}} onClick={(e) => handleCompleteClick(e)}>Complete</button> }
      <button className="task-remove" onClick={(e) => props.removeTask(props.taskId, props.taskCompleted)}>X</button>
    </div>
  );
}

Task.defaultProps = {
  taskName: "Untitled",
  taskTime: 0,
  taskCompleted: false,
  taskComponents: [],
  taskTasks: [],
  formDisplay: "none",
  taskDisplay: "block",
}

export { Task };
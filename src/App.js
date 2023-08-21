

import './App.css';
import { useState } from 'react';

function getDayOfWeek() {
  const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const today = new Date();
  return daysOfWeek[today.getDay()];
}

function App() {
  const [toDos, setToDos] = useState([]);
  const [toDo, setToDo] = useState('');
  const [editMode, setEditMode] = useState(null);
  
  // const completedTasks = toDos.filter((task) => task.status);

  const removeTask = (taskId) => {
    setToDos(toDos.filter((task) => task.id !== taskId));
  };

  const addTask = () => {
    const trimmedTask = toDo.trim();

    if (trimmedTask !== '' && !/^[\s]+$/.test(toDo)) {
      setToDos([...toDos, { id: Date.now(), text: trimmedTask, status: false }]);
      setToDo('');
    }
  };

  const handleEdit = (taskId) => {
    setEditMode(taskId);
    // Retrieve the current task text and set it to the input field when in edit mode
    const taskToUpdate = toDos.find((task) => task.id === taskId);
    if (taskToUpdate) {
      setToDo(taskToUpdate.text);
    }
  };

  const handleSave = () => {
    setEditMode(null);
    // Find the task being edited and update its text
    const updatedToDos = toDos.map((task) =>
      task.id === editMode ? { ...task, text: toDo } : task
    );
    setToDos(updatedToDos);
  };

  // const handleToggleStatus = (taskId) => {
  //   setToDos((prevToDos) =>
  //     prevToDos.map((task) =>
  //       task.id === taskId ? { ...task, status: !task.status } : task
  //     )
  //   );
  // };

  return (
    <div className="app">
      <div className="mainHeading">
        <h1>ToDo List</h1>
      </div>
      <div className="subHeading">
        <br />
        <h2>Whoop, it's {getDayOfWeek()} 🌝 ☕ </h2>
      </div>
      <div className="input">
        <input value={toDo} onChange={(e)=>setToDo(e.target.value)} type="text" placeholder="🖊️ Add item..." />
        <i onClick={addTask} 
        // onClick={()=>setToDos([...toDos,{id:Date.now(), text: toDo,status:false}])} 
        className="fas fa-plus"></i>
      </div>
      
      <div className="todos">
        {toDos.map((obj) => (
          <div className="todo" key={obj.id}>
            <div className="left">
              {editMode === obj.id ? (
                <input
                  type="text"
                  value={toDo}
                  onChange={(e) => setToDo(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') handleSave();
                  }}
                />

                

              ) : (
                <>
                  <input
                    onChange={(e) => {
                      console.log(e.target.checked)
                      console.log(obj)
                      setToDos(toDos.filter(obj2=>{
                          if(obj2.id===obj.id){
                            obj2.status=e.target.checked
                          }
                            return obj2
                      }))
                    }}
                    // onChange={() => handleToggleStatus(obj.id)}
                    value={obj.status}
                    type="checkbox"
                    name=""
                    id=""
                  />
                  <p className={obj.status ? 'strikeThrough' : ''}>{obj.text}</p>
                </>
              )}
            </div>
            <div className="right">
              {editMode === obj.id ? (
                <i className="fas fa-save" onClick={handleSave}></i>
              ) : (
                if(task){
                <i
                  className="fas fa-edit"
                  onClick={() => handleEdit(obj.id)}
                ></i>}
              )}
              <i className="fas fa-times" onClick={() => removeTask(obj.id)}></i>
            </div>

            

          </div>
        ))}
        {/* <div className="taskDone">
          <h2>Task Done</h2>
          {completedTasks.map((task) => (
            <div key={task.id} className="completedTask">
              <p>{task.text}</p>
            </div>
          ))}
        </div> */}

        

      </div>
      
    </div>
  );
}

export default App;

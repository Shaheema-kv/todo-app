// import logo from './logo.svg';
import './App.css';
import {useState} from 'react'
function App() {
  const [toDos, setToDos] = useState([])
  const [toDo, setToDo] = useState('')
  const [editMode, setEditMode] = useState(null); // Keeps track of the task being edited

  const removeTask = (taskId) => {
    setToDos(toDos.filter((task) => task.id !== taskId));
  };

  const addTask = () => {
    // Remove leading and trailing whitespaces from the task
    const trimmedTask = toDo.trim();

    // Check if the task is not empty and does not begin with whitespace
    if (trimmedTask !== '' && !/^[\s]+$/.test(toDo)) {
      setToDos([...toDos, { id: Date.now(), text: trimmedTask, status: false }]);
      setToDo(''); // Clear the input field after adding the task
    }
  };

  const handleEdit = (taskId) => {
    // Set the task with the provided ID into edit mode
    setEditMode(taskId);
  };

  const handleSave = () => {
    // Exit edit mode and save the updated task
    setEditMode(null);
  };



  return (
    <div className="app">
      <div className="mainHeading">
        <h1>ToDo List</h1>
      </div>
      <div className="subHeading">
        <br />
        <h2>Whoop, it's Wednesday 🌝 ☕ </h2>
      </div>
      <div className="input">
        <input value={toDo} onChange={(e)=>setToDo(e.target.value)} type="text" placeholder="🖊️ Add item..." />
        <i onClick={addTask} 
        // onClick={()=>setToDos([...toDos,{id:Date.now(), text: toDo,status:false}])} 
        className="fas fa-plus"></i>
      </div>
      
     
      <div className="todos">
      { toDos.map((obj)=>{

      return (  <div className="todo">
          <div className="left" >
            <input onChange={(e)=>{
              console.log(e.target.checked)
              console.log(obj)
              setToDos(toDos.filter(obj2=>{
                  if(obj2.id===obj.id){
                    obj2.status=e.target.checked
                  }
                    return obj2
              }))
            }} value={obj.status} type="checkbox" name="" id="" />
            <p>{obj.text}</p>
          </div>
          <div className="right">
            <i className="fas fa-times" onClick={() => removeTask(obj.id)}></i>
          </div>
        </div>)
      }) }

      {toDos.map((obj)=>{
        if(obj.status){
          return(<h1>{obj.text}</h1>)
        }
        return null
      })}
      </div>
    </div>
  );
}

export default App;
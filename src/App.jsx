import React,{Fragment,useState,useRef, useEffect} from "react";
//import {shortid} from 'shortid';
import {v4 as uuidv4} from 'uuid';
import { ToDoList } from "./components/ToDoList";

const KEY = 'todoApp.todos';

export function App() {

  const [todos, setTodos] = useState([
    {id:1 , task: 'Tarea 1', completed: false}
  ]);


  useEffect(()=>{
    const storedTodos = JSON.parse(localStorage.getItem(KEY));
    if(storedTodos){
      setTodos(storedTodos);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(KEY, JSON.stringify(todos))
  },[todos])

  const todoTaskRef = useRef();

  const toggleTodo = (id) => {
    const newTodos = [...todos];
    const todo = newTodos.find((todo) => todo.id ===id);
    //const todo = newTodos.find(({id}) => id ===id);
    
    todo.completed = !todo.completed;
    setTodos(newTodos);
  }

  const handleTodoAdd = () => {
    const task = todoTaskRef.current.value;
    if(task === '') return;
  
    setTodos((prevTodos) => {
      return [...prevTodos, {id: uuidv4() /*shortid.generate()*/ , task, completed:false}]
    });

    todoTaskRef.current.value = null;
  };

  const handleClearAll = () => {
    const newTodos = todos.filter((todo) => !todo.completed);
    setTodos(newTodos);
  }

  return (
    <Fragment> 
      <ToDoList todos={todos} toggleTodo={toggleTodo}/>

      <input ref={todoTaskRef} type='text' placeholder= "Nueva Tarea"/>
      <button onClick={handleTodoAdd}>Agregar</button>
      <button onClick={handleClearAll}>Eliminar completadas</button>

    <div>
      Te quedan {todos.filter((todo) => !todo.completed).length} tareas por terminar
    </div>

    </Fragment>
  )
}

export default App;


// tutorial https://www.youtube.com/watch?v=EMk6nom1aS4
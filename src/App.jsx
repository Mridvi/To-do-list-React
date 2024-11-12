
import { useEffect, useState } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';
import Navbar from './components/Navbar'; 

import { v4 as uuidv4 } from 'uuid';  
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { IoAdd } from "react-icons/io5";

function App() {
  const [todo, setTodo] = useState("");    // input string
  const [todos, setTodos] = useState([]);   // array of todos
  const [showFinished, setShowFinished] = useState(true);
  const [dueDate, setDueDate] = useState("");  // due date state
  const [dueTime, setDueTime] = useState("");  // due time state

  useEffect(() => {
    let todoString = localStorage.getItem("todos");
    if (todoString) {
      let todos = JSON.parse(todoString);
      setTodos(todos);
    }
  }, []);   

  const handleEdit = (e, id) => {
    let t = todos.filter(i => i.id === id);
    setTodo(t[0].todo);  
    setDueDate(t[0].dueDate);
    setDueTime(t[0].dueTime);

    let newTodos = todos.filter(item => item.id !== id);
    setTodos(newTodos);
    saveToLS(); 
  }

  const handleDelete = (e, id) => {
    let newTodos = todos.filter(item => item.id !== id);
    setTodos(newTodos);
    saveToLS(); 
  }

  const handleAdd = () => {
    if (!todo) return; // Check if todo is not empty
    setTodos((prevTodos) => {
      const newTodos = [
        ...prevTodos,
        { id: uuidv4(), todo, isCompleted: false, dueDate, dueTime }
      ];
      return newTodos.sort((a, b) => new Date(a.dueDate + " " + a.dueTime) - new Date(b.dueDate + " " + b.dueTime));
    });

    saveToLS();
    setTodo("");   // Clear input field after adding
    setDueDate(""); // Reset due date
    setDueTime(""); // Reset due time
  }

  const handleChange = (e) => {
    setTodo(e.target.value);     // updates todo element with current element of input field
  }

  const handleCheckbox = (e) => {
    let id = e.target.name;
    let index = todos.findIndex(item => item.id === id);

    let newTodos = [...todos];
    newTodos[index].isCompleted = !newTodos[index].isCompleted;
    setTodos(newTodos); 
    saveToLS(); 
  }

  const saveToLS = () => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }

  const toggleFinished = (e) => {
    setShowFinished(!showFinished);
  }

  return (
    <>
      <Navbar/>
      <div className="md:container mx-3 md:mx-auto my-5 rounded-xl p-5 bg-custom2 min-h-screen md:w-1/2">
        {/* <h1 className='font-bold text-center text-xl text-custom1'>Tickify - One tick at a time</h1> */}
        
        <div className="addTodo my-9">
          <h2 className='font-bold text-xl text-custom1 text-center my-4'>Add a task</h2>
          <input 
            onChange={handleChange} 
            value={todo} 
            type="text" 
            className='w-full rounded-2xl p-5' 
            placeholder="Enter your task"
          />
          
          <input 
            type="date" 
            onChange={(e) => setDueDate(e.target.value)} 
            value={dueDate} 
            className="w-full mt-2 p-2 rounded-md"
          />
          
          <input 
            type="time" 
            onChange={(e) => setDueTime(e.target.value)} 
            value={dueTime} 
            className="w-full mt-2 p-2 rounded-md"
          />
          <button 
            onClick={handleAdd} 
            disabled={todo.length < 1 || !dueDate || !dueTime} 
            className='bg-slate-400 hover:bg-slate-500 px-20 py-1 text-white rounded-lg mx-auto font-bold disabled:bg-slate-300 cursor-pointer flex flex-col my-4'
          >
            <IoAdd />
          </button>
        </div>

        <label className="inline-flex items-center cursor-pointer mt-4">
          <span className="mr-3 font-medium text-gray-700">Show completed tasks</span>
          <input 
            type="checkbox" 
            className="hidden" 
            checked={showFinished} 
            onChange={toggleFinished} 
          />
          <span className="relative w-10 h-6 bg-gray-300 rounded-full shadow-inner transition-colors duration-300 ease-in-out">
            <span 
              className={`absolute top-0 left-0 h-6 w-6 bg-white rounded-full shadow-md transform transition-transform duration-300 ease-in-out ${
                showFinished ? 'translate-x-4 bg-green-500' : 'translate-x-0'
              }`} 
            />
            </span>
        </label>


 
        
        <h2 className='font-bold text-xl text-custom1 my-7 text-center'>Your tasks</h2>
        
        <div className="todos">
          {todos.length === 0 && (
            <div className='m-5 font-bold text-base text-gray-400'>No tasks to display.</div>
          )}
          {todos.map(item => (
            (showFinished || !item.isCompleted) && (
              <div key={item.id} className="todo flex md:w-1/2 my-5 justify-between">
                <div className='flex flex-col gap-3'>
                  <div className="flex gap-7">
                    <input 
                      name={item.id} 
                      onChange={handleCheckbox} 
                      type="checkbox" 
                      checked={item.isCompleted} 
                    />
                    <div className={item.isCompleted ? "line-through" : ""}>{item.todo}</div>
                  </div>
                  <div className="text-gray-500 text-sm">
                    Due: {item.dueDate} {item.dueTime}
                  </div>
                </div>
                <div className="buttons flex h-full">
                  <button 
                    onClick={(e) => handleEdit(e, item.id)} 
                    className='bg-slate-400 hover:bg-slate-500 px-2 py-1 text-white rounded-lg mx-4 font-bold cursor-pointer'
                  >
                    <FaEdit />
                  </button>
                  <button 
                    onClick={(e) => handleDelete(e, item.id)} 
                    className='bg-slate-400 hover:bg-slate-500 px-2 py-1 text-white rounded-lg mx-2 font-bold cursor-pointer'
                  >
                    <MdDelete />
                  </button>
                </div>
              </div>
            )
          ))}
        </div>
      </div>
    </>
  );
}

export default App;

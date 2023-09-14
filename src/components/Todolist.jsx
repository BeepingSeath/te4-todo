import Todoitem from './Todoitem'
import './Todolist.css'
import {useEffect, useState} from 'react'

function Todolist() {
  const [todos, setTodos] = useState(() => {
    return JSON.parse(localStorage.getItem('todos')) || [];
  })

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  const deleteAll = () => {
    setTodos([]); 
    localStorage.setItem('index', 0) // create number that rises every added item to use for items id / resets it to zero 
}

const addTodo = () => {
    const newTodo = document.getElementById('newTodo').value;
    if (newTodo === '') return
    const newTodos = [...todos, { id: localStorage.getItem('index'), label: newTodo, completed: false }]    //uses locally stored number to get index
    setTodos(newTodos)
    localStorage.setItem('index', parseInt(localStorage.getItem('index'))+1 || parseInt(todos.length)+1)    // adds number +1 for ever post created
}

  const toggleTaskCompleted = (id) => {
    const newTodos = todos.map(todo => {
      const newTodo = todo;
      if (todo.id === id) {
        newTodo.completed = !newTodo.completed;
      }
      return newTodo;
    })
    setTodos(newTodos);
  }

  const checkAll = (id) => {
    let numTrue = 0;
    let numFalse = 0;
    todos.forEach(todo => {
        if(todo.completed == true){
            numTrue++;
        } else { 
            numFalse++;
        }
    });
    const newTodos = todos.map(todo => {
      const newTodo = todo;
      if(numTrue == todos.length) {
        newTodo.completed = false;
        return newTodo;
      } else {
        newTodo.completed = true;
        return newTodo;
      }
    })
    setTodos(newTodos);
  }

  const deleteTodo = (id) => {
    const length = todos.length;
    const filtered = todos.filter(todo => todo.id !== id)
    setTodos(filtered);
  }

  return ( <>
    <input id="newTodo" type="text" placeholder="Skriv in en sak!"/>
    <button onClick={() => { addTodo() }}>Lägg till</button>
    <button onClick={() => { checkAll() }}>Checka alla</button>
    <button onClick={() => { deleteAll() }}>Ta bort allt</button>
    <ul className="todo-list">
        {todos.map((todo, index) => <Todoitem
            key={ index }
            id={todo.id}
            label={todo.label}
            completed={todo.completed}
            toggleTaskCompleted={toggleTaskCompleted}
            deleteTodo={deleteTodo}/>)}
    </ul> 
  </>
  )
}

export default Todolist
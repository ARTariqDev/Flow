import React, { useState, useEffect } from 'react';

const TodoList = () => {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState('');
  const STORAGE_KEY = 'todos'; // Key to store todos in localStorage

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = () => {
    const storedTodos = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
    setTodos(storedTodos);
  };

  const saveTodos = (newTodos) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newTodos));
    setTodos(newTodos);
  };

  const addTodo = () => {
    if (input.trim() && input.length <= 1000) {
      const newTodo = { id: Date.now(), text: input, isCompleted: false };
      const updatedTodos = [...todos, newTodo];
      saveTodos(updatedTodos);
      setInput('');
    }
  };

  const toggleTodo = (id) => {
    const updatedTodos = todos.map((todo) =>
      todo.id === id ? { ...todo, isCompleted: !todo.isCompleted } : todo
    );
    saveTodos(updatedTodos);
  };

  const deleteTodo = (id) => {
    const updatedTodos = todos.filter((todo) => todo.id !== id);
    saveTodos(updatedTodos);
  };

  return (
    <div style={{ padding: '20px', textAlign: 'center' }}>
      <h1>To-Do List</h1>
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Add a new task"
        maxLength={1000}
        style={{ width: '300px', padding: '10px', borderRadius: '8px' }}
      />
      <button onClick={addTodo} style={{ padding: '10px 20px', marginLeft: '10px' }}>Add</button>
      <div style={{ marginTop: '20px' }}>
        {todos.map((todo) => (
          <div key={todo.id} style={{ border: '1px solid #ddd', padding: '10px', borderRadius: '5px', marginBottom: '10px' }}>
            <input
              type="checkbox"
              checked={todo.isCompleted}
              onChange={() => toggleTodo(todo.id)}
            />
            <span style={{ textDecoration: todo.isCompleted ? 'line-through' : 'none', marginLeft: '10px' }}>{todo.text}</span>
            <button onClick={() => deleteTodo(todo.id)} style={{ marginLeft: '10px' }}>Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TodoList;

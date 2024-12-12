import React, { useState, useEffect } from 'react';
import axios from 'axios';

const TodoList = () => {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState('');

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    try {
      const response = await axios.get('http://localhost:5001/api/todos');
      setTodos(response.data);
    } catch (error) {
      console.error('Error fetching todos:', error);
    }
  };

  const addTodo = async () => {
    if (input.trim() && input.length <= 1000) {
      try {
        const response = await axios.post('http://localhost:5001/api/todos', { text: input });
        setTodos([...todos, response.data]);
        setInput('');
      } catch (error) {
        console.error('Error adding todo:', error);
      }
    }
  };

  const toggleTodo = async (id) => {
    const todo = todos.find((todo) => todo._id === id);
    if (todo) {
      try {
        const response = await axios.put(`http://localhost:5001/api/todos/${id}`, { isCompleted: !todo.isCompleted });
        setTodos(todos.map((todo) => (todo._id === id ? response.data : todo)));
      } catch (error) {
        console.error('Error toggling todo:', error);
      }
    }
  };

  const deleteTodo = async (id) => {
    try {
      await axios.delete(`http://localhost:5001/api/todos/${id}`);
      setTodos(todos.filter((todo) => todo._id !== id));
    } catch (error) {
      console.error('Error deleting todo:', error);
    }
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
        style={{ width: '300px', padding: '10px', color: 'black',borderRadius: '8px' }}
      />
      <button onClick={addTodo} style={{ padding: '10px 20px', marginLeft: '10px' }}>Add</button>
      <div style={{ marginTop: '20px', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '10px' }}>
        {todos.map((todo) => (
          <div key={todo._id} style={{ border: '1px solid #ddd', padding: '10px', borderRadius: '5px' }}>
            <input
              type="checkbox"
              checked={todo.isCompleted}
              onChange={() => toggleTodo(todo._id)}
              style={{ border: '1px solid #ddd', padding: '10px', borderRadius: '8px' }}
            />
            <span style={{ textDecoration: todo.isCompleted ? 'line-through' : 'none', marginLeft: '10px' }}>{todo.text}</span>
            <button onClick={() => deleteTodo(todo._id)} style={{ marginLeft: '10px', padding: '5px 10px' }}>Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TodoList;

const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const fs = require('fs').promises;

const app = express();
const PORT = process.env.PORT || 5001;

app.use(cors());
app.use(bodyParser.json());

const todosFilePath = './todos.json';

// Ensure the todos file exists
async function ensureTodosFileExists() {
  try {
    await fs.access(todosFilePath);
  } catch (err) {
    await fs.writeFile(todosFilePath, JSON.stringify([], null, 2), 'utf8');
  }
}

// Read todos from file
async function readTodosFromFile() {
  try {
    const data = await fs.readFile(todosFilePath, 'utf8');
    return JSON.parse(data) || [];
  } catch (err) {
    console.error('Error reading todos file:', err);
    return [];
  }
}

// Write todos to file
async function writeTodosToFile(todos) {
  try {
    await fs.writeFile(todosFilePath, JSON.stringify(todos, null, 2), 'utf8');
  } catch (err) {
    console.error('Error writing todos file:', err);
  }
}

app.get('/api/todos', async (req, res) => {
  console.log('GET /api/todos');
  const todos = await readTodosFromFile();
  res.json(todos);
});

app.post('/api/todos', async (req, res) => {
  console.log('POST /api/todos', req.body);
  const { text } = req.body;
  const newTodo = {
    _id: Date.now().toString(), // Generate unique id
    text,
    isCompleted: false,
  };

  const todos = await readTodosFromFile();
  todos.push(newTodo);
  await writeTodosToFile(todos);

  res.json(newTodo);
});

app.put('/api/todos/:id', async (req, res) => {
  console.log('PUT /api/todos/:id', req.params, req.body);
  const { id } = req.params;
  const { isCompleted } = req.body;

  const todos = await readTodosFromFile();
  const index = todos.findIndex(todo => todo._id === id);

  if (index !== -1) {
    todos[index].isCompleted = isCompleted;
    await writeTodosToFile(todos);
    res.json(todos[index]);
  } else {
    res.status(404).json({ message: 'Todo not found' });
  }
});

app.delete('/api/todos/:id', async (req, res) => {
  console.log('DELETE /api/todos/:id', req.params);
  const { id } = req.params;

  const todos = await readTodosFromFile();
  const filteredTodos = todos.filter(todo => todo._id !== id);

  if (filteredTodos.length < todos.length) {
    await writeTodosToFile(filteredTodos);
    res.json({ message: 'Todo deleted' });
  } else {
    res.status(404).json({ message: 'Todo not found' });
  }
});

ensureTodosFileExists().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });
});

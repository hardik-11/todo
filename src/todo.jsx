import React, { useState, useEffect } from "react";

const ToDoList = () => {
  const [todos, setTodos] = useState([
    {
      id: 1,
      text: "Buy groceries",
      completed: false,
      subItems: [
        {
          id: 1,
          text: "Milk",
          completed: false,
        },
        {
          id: 2,
          text: "Eggs",
          completed: false,
        },
      ],
    },
    {
      id: 2,
      text: "Do laundry",
      completed: false,
      subItems: [],
    },
    {
      id: 3,
      text: "Clean the house",
      completed: false,
      subItems: [],
    },
  ]);

  useEffect(() => {
    // Get the to-do items from the server
    fetch("/api/todos")
      .then((response) => response.json())
      .then((todos) => setTodos(todos));
  }, []);

  const addTodo = (text) => {
    // Add a new to-do item to the server
    fetch("/api/todos", {
      method: "POST",
      body: JSON.stringify({ text }),
    })
      .then((response) => response.json())
      .then((todo) => {
        setTodos([...todos, todo]);
      });
  };

  const editTodo = (id, text) => {
    // Edit a to-do item on the server
    fetch(`/api/todos/${id}`, {
      method: "PUT",
      body: JSON.stringify({ text }),
    })
      .then((response) => response.json())
      .then((todo) => {
        setTodos(todos.map((todo) => {
          if (todo.id === id) {
            todo.text = text;
          }
          return todo;
        }));
      });
  };

  const deleteTodo = (id) => {
    // Delete a to-do item from the server
    fetch(`/api/todos/${id}`, {
      method: "DELETE",
    })
      .then((response) => response.json())
      .then((todo) => {
        setTodos(todos.filter((todo) => todo.id !== id));
      });
  };

  const markTodoAsCompleted = (id) => {
    // Mark a to-do item as completed on the server
    fetch(`/api/todos/${id}/completed`, {
      method: "PUT",
    })
      .then((response) => response.json())
      .then((todo) => {
        setTodos(todos.map((todo) => {
          if (todo.id === id) {
            todo.completed = true;
          }
          return todo;
        }));
      });
  };

  return (
    <div>
      <h1>To-Do List</h1>
      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={() => markTodoAsCompleted(todo.id)}
            />
            {todo.text}
            {todo.subItems.map((subItem) => (
              <span key={subItem.id}>
                - {subItem.text}
              </span>
            ))}
            <button onClick={() => editTodo(todo.id, "")}>Edit</button>
            <button onClick={() => deleteTodo(todo.id)}>Delete</button>
          </li>
        ))}
      </ul>
      <input
        type="text"
        placeholder="Add a new to-do"
        onChange={(e) => addTodo(e.target.value)}
      />
    </div>
  );
};

export default ToDoList;

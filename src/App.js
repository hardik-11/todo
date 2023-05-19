import React, { useState } from "react";
import "./App.css";

function Todo({ todo, index, markTodo, removeTodo, editTodo }) {
  const [isEditing, setIsEditing] = useState(false);
  const [updatedText, setUpdatedText] = useState(todo.text);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    editTodo(index, updatedText);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setUpdatedText(todo.text);
  };

  const handleChange = (e) => {
    setUpdatedText(e.target.value);
  };

  return (
    <div className="todo">
      {isEditing ? (
        <>
          <input type="text" value={updatedText} onChange={handleChange} />
          <button className="btn btn-success ml-2" onClick={handleSave}>Save</button>
          <button  className="btn btn-danger ml-2" onClick={handleCancel}>Cancel</button>
        </>
      ) : (
        <>
          <span style={{ textDecoration: todo.isDone ? "line-through" : "" }}>
            {todo.text}
          </span>
          <div>
            <button className="btn btn-success" onClick={() => markTodo(index)}>
              ✓
            </button>{" "}
            <button
              className="btn btn-danger"
              onClick={() => removeTodo(index)}
            >
              ✕
            </button>
            <button className="btn btn-primary ml-2" onClick={handleEdit}>Edit</button>
          </div>
        </>
      )}
    </div>
  );
}

function FormTodo({ addTodo }) {
  const [todo, setTodo] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!todo) return;
    addTodo(todo);
    setTodo("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="row">
        <div className="col">
          <input
            type="text"
            className="form-control ml-3"
            value={todo}
            onChange={(e) => setTodo(e.target.value)}
            placeholder="Add new todo"
          />
        </div>
        <div>
          <button className="btn btn-success ml-3 col" type="submit">
            + Add
          </button>
        </div>
      </div>
    </form>
  );
}

function App() {
  const [todos, setTodos] = useState([
    {
      text: "This is a sample todo",
      isDone: false,
    },
  ]);

  const addTodo = (text) => {
    const newTodos = [...todos, { text }];
    setTodos(newTodos);
  };

  const markTodo = (index) => {
    const newTodos = [...todos];
    newTodos[index].isDone = true;
    setTodos(newTodos);
  };

  const removeTodo = (index) => {
    const newTodos = [...todos];
    newTodos.splice(index, 1);
    setTodos(newTodos);
  };

  const editTodo = (index, newText) => {
    const newTodos = [...todos];
    newTodos[index].text = newText;
    setTodos(newTodos);
  };

  return (
    <div className="app">
      <div className="container">
        <h1 className="text-center mb-4">Todo List</h1>
        <FormTodo addTodo={addTodo} />
        <div className="mt-5">
          {todos.map((todo, index) => (
            <div class="card m-2" key={index}>
              <Todo
                index={index}
                todo={todo}
                markTodo={markTodo}
                removeTodo={removeTodo}
                editTodo={editTodo}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;

import "./components/todo/todo.css";
import TodoData from "./components/todo/TodoData";
import TodoNew from "./components/todo/TodoNew";
import reactLogo from "./assets/react.svg";
import { useState } from "react";
const App = () => {
  const [todoList, setTodoList] = useState([]);
  const addNewTodo = (name) => {
    const newTodo = {
      id: todoList.length + 1,
      name,
    };
    setTodoList([...todoList, newTodo]);
  };
  const deleteTodo = (id) => {
    const newList = todoList.filter((item) => item.id !== id);
    setTodoList(newList);
  };

  const deleteAllTodo = () => {
    setTodoList([]);
  };
  return (
    <div className="todo-container">
      <div className="todo-title">Todo List</div>
      <TodoNew addNewTodo={addNewTodo} deleteAllTodo={deleteAllTodo} />
      {todoList.length > 0 ? (
        <TodoData todoList={todoList} deleteTodo={deleteTodo} />
      ) : (
        <div className="todo-image">
          <img src={reactLogo} alt="" className="logo" />
        </div>
      )}
    </div>
  );
};

export default App;

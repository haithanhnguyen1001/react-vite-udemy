import "./components/todo/todo.css";
import TodoData from "./components/todo/TodoData";
import TodoNew from "./components/todo/TodoNew";
import reactLogo from "./assets/react.svg";
const App = () => {
  const hoidanit = "Bi Nguyen";
  return (
    <div className="todo-container">
      <div className="todo-title">Todo List</div>
      <TodoNew />
      <TodoData name={hoidanit} />
      <div className="todo-image">
        <img src={reactLogo} alt="" className="logo" />
      </div>
    </div>
  );
};

export default App;

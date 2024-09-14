import { useState } from "react";

const TodoNew = (props) => {
  // eslint-disable-next-line react/prop-types
  const { addNewTodo } = props;
  const [valueInput, setValueInput] = useState("");
  const handleClick = () => {
    if (valueInput == "") {
      return;
    }
    addNewTodo(valueInput);
    setValueInput("");
  };

  const handleEnter = (event) => {
    if (event.key === "Enter") {
      handleClick();
    }
  };

  const handleOnChange = (name) => {
    setValueInput(name);
  };
  return (
    <div className="todo-input">
      <input
        type="text"
        placeholder="Enter your task"
        value={valueInput}
        onChange={(event) => handleOnChange(event.target.value)}
        onKeyDown={(event) => handleEnter(event)}
      />
      <button onClick={handleClick}>Add</button>
    </div>
  );
};
export default TodoNew;

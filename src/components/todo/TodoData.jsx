/* eslint-disable react/jsx-key */
const TodoData = (props) => {
  // eslint-disable-next-line react/prop-types
  const { todoList, deleteTodo } = props;

  const handleBtnDelete = (id) => {
    deleteTodo(id);
  };
  return (
    <div className="todo-data">
      {todoList.map((item, index) => {
        return (
          <div key={item.id} className="todo-item">
            <div className="todo-name">
              {item.id}. {item.name}
            </div>
            <button onClick={() => handleBtnDelete(item.id)}>X</button>
          </div>
        );
      })}
    </div>
  );
};

export default TodoData;

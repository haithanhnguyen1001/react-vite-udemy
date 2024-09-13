const TodoData = (props) => {
  // eslint-disable-next-line react/prop-types
  const { name } = props;
  return (
    <div className="todo-data">
      <div className="todo-item">My name is {name}</div>
      <div className="todo-item">Learning React</div>
      <div className="todo-item">Watching Youtube</div>
    </div>
  );
};

export default TodoData;

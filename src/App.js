import { useState } from 'react';
import './App.css';

function App() {
  const [todolist, settodolist] = useState([]);

  const saveToDoList = (event) => {
    event.preventDefault();
    let todoname = event.target.todoname.value.trim();

    if (!todoname) {
      alert("ToDo cannot be empty.");
      return;
    }

    const exists = todolist.some((todo) => todo.name === todoname);
    if (!exists) {
      const finalToDoList = [...todolist, { name: todoname, completed: false }];
      settodolist(finalToDoList);
      event.target.todoname.value = '';
    } else {
      alert("ToDo Name Exists...");
    }
  };

  const list = todolist.map((item, index) => (
    <ToDoListItems
      key={index}
      indexNumber={index}
      item={item}
      todolist={todolist}
      settodolist={settodolist}
    />
  ));

  return (
    <div className="App">
      <h1>ToDo List</h1>
      <form onSubmit={saveToDoList}>
        <input type="text" name="todoname" />
        <button>Save</button>
      </form>
      <div className="outerDiv">
        <ul>{list}</ul>
      </div>
    </div>
  );
}

export default App;

function ToDoListItems({ item, indexNumber, todolist, settodolist }) {
  const deleteRow = (event) => {
    event.stopPropagation();
    const updatedList = todolist.filter((_, i) => i !== indexNumber);
    settodolist(updatedList);
  };

  const toggleStatus = () => {
    const updatedList = [...todolist];
    updatedList[indexNumber].completed = !updatedList[indexNumber].completed;
    settodolist(updatedList);
  };

  return (
    <li className={item.completed ? 'completed' : ''} onClick={toggleStatus}>
      {indexNumber + 1}. {item.name}
      <span onClick={deleteRow}>&times;</span>
    </li>
  );
}

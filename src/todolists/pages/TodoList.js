import React, { useState, useReducer } from "react";
import Button from '@mui/material/Button';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import Stack from "@mui/material/Stack";
import { GrPowerReset } from "react-icons/gr";

import ToDoItem from "../components/ToDoItem";
import IconButton from "../components/IconButton";
import "./TodoList.css";

function TodoList() {
  const [inputText, setInputText] = useState("");
  const [hover, setHover] = useState(false);
  const [setting, setsetting] = useState({});
  const [state, dispatch] = useReducer(reducer, [], init);

  function init(initArray) {
    return { todos: initArray };
  }

  function reducer(state, action) {
    switch (action.type) {
      case "addItem":
        return { todos: [...state.todos, action.payload.inputText] };
      case "deleteItem":
        return {
          todos: state.todos.filter((item, index) => {
            return index !== action.payload;
          })
        };
      case "reset":
        return init([]);
      default:
        return { ...state };
    }
  }

  function handleChange(event) {
    const newValue = event.target.value;
    setInputText(newValue);
  }

  function addItem(e) {
    e.preventDefault();
    dispatch({ type: "addItem", payload: { inputText: inputText } });
    setInputText("");
  }



  return (
    <div className="container">
      <div className="todoList">
        <div className="heading">
          <IconButton
            onClick={() => dispatch({ type: "reset" })}
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
            style={{ backgroundColor: hover && "#F24C4C" }}
          >
            <GrPowerReset />
          </IconButton>
          <h1>To-Do List</h1>
        </div>
        <div className="form">
          <form onSubmit={addItem}>
            <input onChange={handleChange} type="text" value={inputText} />
            <button type="submit">
              <span>Add</span>
            </button>
          </form>
        </div>
        <div>
          <ul>
            {state.todos.map((eachItem, index) => (
              <ToDoItem
                key={index}
                id={index}
                text={eachItem}
                dispatch={dispatch}
              />
            ))}
          </ul>
        </div>
      </div>
      <div className="control">
        <FormControlLabel control={<Switch defaultChecked disabled checked={setting.isPublic} />} label="Label" />
        <FormControlLabel control={<Switch checked={setting.isEditable} />} label="Disabled" />
        <Button className="test" variant="text">Save</Button>
      </div>

    </div>

  );
}

export default TodoList;

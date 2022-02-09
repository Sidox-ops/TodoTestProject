import { Box } from "@chakra-ui/layout";
import { toast, useToast } from "@chakra-ui/toast";
import React, { useContext, useState } from "react";
import TodoModel from "../models/todo";
import { TodoContext } from "../store/store-todo";
import classes from "./TodoDetails.module.css";

interface TodoDetailsProps {
  todo: TodoModel;
}
const TodoDetails = ({ todo }: TodoDetailsProps) => {
  const [todoText, setTodoText] = useState<string>(todo.text);
  const [editing, setEditing] = useState<boolean>(false);

  const todoCtx = useContext(TodoContext);
  const removeTodo = todoCtx.removeTodo;
  const checkTodo = todoCtx.checkTodo;
  const updateTodo = todoCtx.updateTodo;

  const removeTodoHanlder = () => {
    removeTodo(todo.code!);
    toast({
      duration: 4000,
      position: 'bottom-left',
      render: () => (
        <Box color='white' p={12} bg='red'>
          Todo deleted !👏
        </Box>
      ),
      isClosable: true,
    })
  };

  const checkTodoHandler = () => {
    checkTodo(todo.code!);
  };

  const toast = useToast();
  
  const saveEditTodoHandler = () => {
    updateTodo(todo.code!, todoText);
    setEditing(false);
    toast({
      duration: 4000,
      position: 'bottom-left',
      render: () => (
        <Box color='white' p={12} bg='blue'>
          Todo modified !🤪
        </Box>
      ),
      isClosable: true,
    })
  };

  const onEnterPressHandler = (event: React.KeyboardEvent) => {
    if (event.key === "Enter") {
      saveEditTodoHandler();
      setEditing(false);
      return;
    }
  };
  const todo_completed = todo.complete ? classes["todo-item_completed"] : "";

  const todo_editing = editing ? classes["todo-item_editing"] : "";

  const hide = editing ? classes.hide : "";

  return (
    <div className={`${classes.todo_item} ${todo_completed} ${todo_editing}`}>
      <div className={classes.cell}>
        <button
          className={`${classes.icon} ${classes.checkIcon} ${hide}`}
          onClick={checkTodoHandler.bind(null, todo.id)}
        >
          <i className="far fa-check-circle"></i>
        </button>
      </div>
      <div className={classes.cell}>
        {!editing && <div className={classes.title}>{todoText}</div>}
        {editing && (
          <input
            onKeyPress={onEnterPressHandler}
            className={classes.input}
            type="text"
            value={todoText}
            onChange={(e) => setTodoText(e.target.value)}
          ></input>
        )}
      </div>
      <div className={classes.cell}>
        <button
          className={`${classes.icon} ${hide}`}
          onClick={() => setEditing(true)}
        >
          <i className="fas fa-edit"></i>
        </button>
        <button
          className={`${classes.icon} ${hide}`}
          onClick={removeTodoHanlder.bind(null, todo.id)}
        >
          <i className="fas fa-eraser"></i>
        </button>
        <button
          className={`${classes.icon} ${!editing ? classes.hide : ""}`}
          onClick={saveEditTodoHandler}
        >
          <i className="fa-solid fa-xmark"></i>
        </button>
      </div>
    </div>
  );
};

export default TodoDetails;

// Adding edit function, need to figure out a way to turn of Editng and Change todo TExt in the same time

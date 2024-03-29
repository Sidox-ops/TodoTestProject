import React, { useState, useRef, useContext } from "react";
import TodoModel from "../models/todo";
import { TodoContext } from "../store/store-todo";
import classes from "./TodoForm.module.css";
import TaskFilters from "./TaskFilters";
import { Box, useToast } from '@chakra-ui/react'



const TodoForm = () => {
  const [loading, setLoading] = useState(false);
  // Do i need loading here?

  const inputRef = useRef<HTMLInputElement>(null);

  const todoCtx = useContext(TodoContext);
  
  const addTodo = todoCtx.addTodo;
  const toast = useToast()



  const submitHandler = (e: React.FormEvent) => {
    e.preventDefault();
    const newTodo: TodoModel = {
      number: todoCtx.todoList.length,
      text: inputRef.current!.value,
      id: new Date().getTime().toString(),
      complete: false,
    };

    if (newTodo.text.trim() === "") {
      return;
    }
    toast({
      duration: 4000,
      position: 'bottom-left',
      render: () => (
        <Box data-test-e2e="created-toast" color='white' p={12} bg='green'>
          Todo Added !😎
        </Box>
      ),
      isClosable: true,
    })

    addTodo(newTodo);

    inputRef.current!.value = "";
  };
  return (
    <div className={classes.container}>
      <form onSubmit={submitHandler} className={classes.form}>
        <input
          className={classes.form_input}
          id="todoText"
          data-test-e2e="input-new-todo"
          type="text"
          maxLength={64}
          placeholder="What needs to be done?"
          ref={inputRef}
        ></input>
      </form>
      <TaskFilters />
    </div>
  );
};

export default TodoForm;

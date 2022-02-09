import React, { useContext, useEffect, useState } from "react";
import { TodoContext } from "../store/store-todo";
import classes from "./TodoList.module.css";
import TodoDetails from "./TodoDetails";
import TodoModel, { filter } from "../models/todo";

const TodoList = () => {
  const todoCtx = useContext(TodoContext);

  const todoList = todoCtx.todoList;
  const getTodo = todoCtx.getTodo;
  const filterOrder = todoCtx.filter;

  useEffect(() => {
    getTodo();
  }, []);

  const allTodos =
    filterOrder === filter.all &&
    todoList.map((todo, num) => <TodoDetails key={todo.id} number={num} todo={todo} />);

  const completedTodos =
    filterOrder === filter.completed &&
    todoList
      .filter((todo) => todo.complete === true)
      .map((todo, num) => <TodoDetails key={todo.id} number={num} todo={todo} />);

  const activeTodos =
    filterOrder === filter.active &&
    todoList
      .filter((todo) => todo.complete === false)
      .map((todo, num) => <TodoDetails key={todo.id} number={num} todo={todo} />);

  return (
    <div className={classes.todoList}>
      {allTodos}

      {completedTodos}

      {activeTodos}
    </div>
  );
};

export default TodoList;

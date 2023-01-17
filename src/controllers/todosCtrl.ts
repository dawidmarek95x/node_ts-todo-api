import { RequestHandler } from "express";
import { nanoid } from "nanoid";
import { Todo } from "../models/Todo";

const TODOS: Todo[] = [];

export const createTodo: RequestHandler = (req, res, next) => {
  const text = (req.body as {text: string}).text;
  const newTodo = new Todo(nanoid(), text);

  TODOS.push(newTodo);

  res.status(201).json({message: "Created the todo.", createdTodo: newTodo});
}
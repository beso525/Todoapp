// todoManager.js
import { isThisWeek, isToday } from "date-fns";
import { renderContentDetails } from "./ui";

export let currPage = { title: "Home", id: "homeBtn" };

let todos = [
  {
    todoId: 1,
    title: "Exercise",
    description: "",
    dueDate: "2025-12-30",
    priority: "",
    project: null,
  },
  {
    todoId: 2,
    title: "Reading",
    description: "",
    dueDate: new Date(),
    priority: "",
    project: null,
  },
];

let doneTodos = [];

let projects = [{ projectId: 1, title: "Bench 180" }];

// project section
export function addProject(projectData) {
  const project = {
    projectId: crypto.randomUUID(),
    title: projectData.title,
  };
  projects.push(project);
  return project;
}

export function deleteProject(projectId) {
  const index = projects.findIndex((p) => p.id === projectId);
  if (index !== -1) projects.splice(index, 1);
}

// todos section
export function addTodo(todoData) {
  const todo = {
    todoId: crypto.randomUUID(),
    title: todoData.title,
    description: todoData.description,
    dueDate: new Date(todoData.dueDate),
    priority: todoData.priority,
    project: todoData.project || null,
    completed: false,
  };

  todos.push(todo);
  return todo;
}

export function deleteTodo(todoId) {
  const index = todos.findIndex((t) => t.todoId === todoId);
  if (index !== -1) {
    todos.splice(index, 1);
    selectPage(currPage.title, currPage.id);
  }
}

export function completeTodo(todoId) {
  const index = todos.findIndex((t) => t.todoId === todoId);
  todos.splice(index, 1);
  // saveToLocalStorage();
  selectPage(currPage.title, currPage.id);
}

export function selectPage(pageTitle, pageId) {
  currPage = { title: pageTitle, id: pageId };
  const todos = getTodos();

  let filtered = [];

  switch (pageId) {
    case "todayBtn":
      filtered = todos.filter((todo) => isToday(todo.dueDate));
      break;
    case "weekBtn":
      filtered = todos.filter((todo) => isThisWeek(todo.dueDate));
      break;
    default:
      filtered = todos;
  }

  renderContentDetails(pageTitle, filtered);
}

export function getTodos() {
  return todos;
}

export function getProjects() {
  return projects;
}

function saveToLocalStorage() {
  localStorage.setItem("todos");
}

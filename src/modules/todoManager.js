import { isThisWeek } from "date-fns";
import { renderContentDetails } from "./ui";

// todoManager.js
const todos = [
  {
    id: 1,
    title: "Exercise",
    description: "",
    dueDate: "17 March 2025",
    priority: "",
    project: null,
  },
  {
    id: 2,
    title: "Reading",
    description: "",
    dueDate: 0,
    priority: "",
    project: null,
  },
];

const projects = [];

// project section (contains todos but overarching project title)
export function addProject(title) {
  const project = {
    projectId: crypto.randomUUID(),
    title,
  };
  projects.push(project);
  return project;
}

export function deleteProject(projectId) {
  const index = projects.findIndex((p) => p.id === projectId);
  if (index !== -1) projects.splice(index, 1);
}

// todos section
export function addTodo(title, description, dueDate, priority, project = null) {
  const todo = {
    todoId: crypto.randomUUID(),
    title,
    description,
    dueDate: new Date(dueDate).toISOString(),
    priority,
    project,
    completed: false,
  };

  todos.push(todo);
  return todo;
}
export function deleteTodo(todoId) {
  const index = todos.findIndex((t) => t.id === todoId);
  if (index !== -1) todos.splice(index, 1);
}

export function toggleTodo(todoId) {
  const todo = todos.find((t) => t.id === todoId);
  if (todo) todo.completedToday = !todo.completedToday;
}

export function selectPage(pageId) {
  const todos = getTodos();

  let filtered = [];

  switch (pageId) {
    case "homeBtn":
      filtered = todos;
      break;
    case "todayBtn":
      filtered = todos.filter((todo) => isToday(todo.dueDate));
      break;
    case "weekBtn":
      filtered = todos.filter((todo) => isThisWeek(todo.dueDate));
      break;

    default:
  }

  renderContentDetails(filtered);
}

export function getTodos() {
  return todos;
}

// ui.js
import { format } from "date-fns";
import {
  getTodos,
  getProjects,
  selectPage,
  addTodo,
  deleteTodo,
  completeTodo,
  currPage,
} from "./todoManager.js";

// the navbar (sidebar)
export function renderSidebar() {
  const sidebar = document.querySelector("#sidebar");
  if (!sidebar) return;
  sidebar.innerHTML = "";

  // Todo options list container
  const list = document.createElement("div");
  list.classList.add("todo-list");

  // ===== Add Pages
  const options = [
    { title: "Home", id: "homeBtn" },
    { title: "Today", id: "todayBtn" },
    { title: "This Week", id: "weekBtn" },
    { title: "Projects", id: "projectsBtn" },
    { title: "Notes", id: "notesBtn" },
    { title: "+ Add Task", id: "addBtn" },
  ];

  options.forEach((op) => {
    const todoDiv = document.createElement("div");
    todoDiv.classList.add("nav-item");
    todoDiv.id = op.id;

    const title = document.createElement("label");
    title.textContent = op.title;
    todoDiv.addEventListener("click", () => {
      if (op.id === "addBtn") {
        renderModalForm();
      } else {
        selectPage(op.title, op.id);
      }
    });

    todoDiv.append(title);
    list.appendChild(todoDiv);
  });

  sidebar.appendChild(list);
}

// the modal when "+ add task" button is clicked
export function renderModalForm() {
  if (document.querySelector("#createModal")) return;

  /* Overlay */
  const modal = document.createElement("div");
  modal.id = "createModal";
  modal.classList.add("modal-overlay");

  /* Modal Container */
  const container = document.createElement("div");
  container.classList.add("modal-container");

  const form = document.createElement("form");
  form.id = "taskForm";

  // Modal Header
  const header = document.createElement("div");
  header.classList.add("modal-header");

  const title = document.createElement("h3");
  title.textContent = "Create New Todo";

  const closeBtn = document.createElement("i");
  closeBtn.classList.add("fa-solid", "fa-xmark", "modal-close");
  closeBtn.addEventListener("click", () => modal.remove());

  header.append(title, closeBtn);

  // Modal Content
  const content = document.createElement("div");
  content.classList.add("modal-content");

  // TITLE input
  const titleDiv = document.createElement("div");
  const titleInput = document.createElement("input");
  titleInput.type = "text";
  titleInput.placeholder = "Title: Workout";
  titleInput.required = true;
  titleInput.id = "titleInput";

  titleDiv.append(titleInput);

  // DESCRIPTION input
  const descDiv = document.createElement("div");
  const descInput = document.createElement("textarea");
  descInput.placeholder = "Description: Leg day";
  descInput.id = "descInput";

  descDiv.append(descInput);

  const modalBtns = document.createElement("div");
  modalBtns.classList.add("modalBtns");

  // due date input
  const dueDiv = document.createElement("div");
  dueDiv.classList.add("icon-row");

  const dueLabel = document.createElement("label");
  dueLabel.htmlFor = "dueDate";
  dueLabel.textContent = "Due Date";

  const dueInput = document.createElement("input");
  dueInput.id = "dueDate";
  dueInput.type = "date";

  dueDiv.append(dueLabel, dueInput);

  // Project icon buttons
  const priorityDiv = document.createElement("div");
  priorityDiv.classList.add("icon-row");

  const pLabel = document.createElement("label");
  pLabel.textContent = "Priority";

  let selectedPriority = null;

  const low = document.createElement("i");
  low.classList.add("fa-solid", "fa-flag", "low", "icon-btn");

  const med = document.createElement("i");
  med.classList.add("fa-solid", "fa-flag", "medium", "icon-btn");

  const high = document.createElement("i");
  high.classList.add("fa-solid", "fa-flag", "high", "icon-btn");

  [low, med, high].forEach((btn, index) => {
    btn.dataset.level = ["low", "medium", "high"][index];
    btn.addEventListener("click", () => {
      btn.classList.add;
      selectedPriority = btn.dataset.level;
    });
  });

  priorityDiv.append(pLabel, low, med, high);

  // Project dropdown
  const projects = getProjects();
  const projectDiv = document.createElement("div");
  projectDiv.classList.add("icon-row");

  const projLabel = document.createElement("label");
  projLabel.textContent = "Project";

  const projBtn = document.createElement("i");
  projBtn.classList.add("fa-solid", "fa-folder-plus", "icon-btn");

  const projSelect = document.createElement("select");
  projSelect.style.display = "none";

  projects.forEach((p) => {
    const option = document.createElement("option");
    option.value = p.projectId;
    option.textContent = p.title;
    projSelect.appendChild(option);
  });

  projBtn.addEventListener("click", () => {
    projSelect.style.display =
      projSelect.style.display === "none" ? "block" : "none";
  });

  projectDiv.append(projLabel, projBtn, projSelect);

  const submitDiv = document.createElement("div");
  submitDiv.classList.add("submit-div");

  const submitBtn = document.createElement("button");
  submitBtn.textContent = "Add task";
  submitBtn.classList.add("modal-submit");
  submitDiv.appendChild(submitBtn);
  const todos = getTodos();

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    addTodo({
      title: titleInput.value,
      description: descInput.value,
      dueDate: dueInput.value,
      priority: selectedPriority,
      project: projSelect.value || null,
    });

    modal.remove();
    renderSidebar();
  });

  // ------------------ BUILD DOM ------------------
  modalBtns.append(dueDiv, priorityDiv, projectDiv);
  content.append(titleDiv, descDiv, modalBtns, submitDiv);

  form.append(header, content);
  container.append(form);
  modal.append(container);
  document.body.append(modal);
}

// main content section of the page
export function renderContentDetails(pageTitle, todosList = []) {
  const main = document.querySelector("#main");
  main.innerHTML = "";

  const mainTitle = document.createElement("h2");
  mainTitle.textContent = pageTitle;

  const todoList = document.createElement("div");
  todoList.id = "todoList";

  if (todosList.length === 0) {
    todoList.textContent = "No tasks yet.";
  }

  todosList.forEach((todo) => {
    const todoItem = document.createElement("div");
    todoItem.id = "todoItem";

    const todoTitle = document.createElement("p");
    todoTitle.textContent = todo.title;

    const actionsDiv = document.createElement("div");
    actionsDiv.classList.add("actions");

    const todoCheck = document.createElement("i");
    todoCheck.classList.add("fas", "fa-check");
    todoCheck.addEventListener("click", () => {
      completeTodo(todo.todoId);
      console.log("todo clicked!");
    });

    const editTodo = document.createElement("i");
    editTodo.classList.add("fas", "fa-pen-to-square");
    editTodo.addEventListener("click", () => {
      editTodo(todo.todoId);
    });

    const dueDate = document.createElement("span");
    dueDate.textContent = format(new Date(todo.dueDate), "dd-MMM");
    dueDate.classList.add("ddSpan");

    const delTodo = document.createElement("i");
    delTodo.classList.add("fas", "fa-ban");
    delTodo.addEventListener("click", () => {
      deleteTodo(todo.todoId);
    });

    actionsDiv.append(todoCheck, editTodo, delTodo);
    todoItem.append(todoTitle, dueDate, actionsDiv);
    todoList.appendChild(todoItem);
  });

  console.log(todosList);
  main.append(mainTitle, todoList);
}

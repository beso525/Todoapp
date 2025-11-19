// ui.js
import { getTodos, selectPage } from "./todoManager.js";

// the navbar (sidebar)
export function renderPages() {
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
        console.log(selectPage(op.id));
        selectPage(op.id);
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
  container.classList.add("modal-overlay");

  const form = document.createElement("form");
  form.id = "taskForm";

  // Modal Header
  const header = document.createElement("div");
  header.classList.add("modal-header");

  const title = document.createElement("h3");
  title.textContent = "Create New Todo";

  const closeBtn = document.createElement("i");
  closeBtn.classList.add("fa-solid", "fa-xmark", "modal-close");
  closeBtn.style.cursor = "pointer";
  closeBtn.addEventListener("click", () => modal.remove());

  header.append(title, closeBtn);
  ///////////////////////////////////////////////////////////////////////////////////
  // Modal Content
  const content = document.createElement("div");
  content.classList.add("modal-content");

  // TITLE input
  const titleDiv = document.createElement("div");
  const titleInput = document.createElement("input");
  titleInput.type = "text";
  titleInput.placeholder = "Title: Do Laundry";
  titleInput.required = true;

  titleDiv.append(titleInput);

  // DESCRIPTION input
  const descDiv = document.createElement("div");
  const descInput = document.createElement("textarea");

  descDiv.append(descInput);

  const modalBtns = document.createElement("div");
  modalBtns.classList.add("modalBtns");
  // ---------- DUE DATE ICON BUTTON ----------
  const dueDiv = document.createElement("div");
  dueDiv.classList.add("modal-row");

  const dueLabel = document.createElement("label");
  dueLabel.textContent = "Due Date";

  // clickable calendar icon
  const dueBtn = document.createElement("i");
  dueBtn.classList.add("fa-solid", "fa-calendar-days", "icon-btn");

  const dueInput = document.createElement("input");
  dueInput.type = "date";
  dueInput.style.display = "none";

  // clicking the icon triggers the hidden date input
  dueBtn.addEventListener("click", () => dueInput.showPicker());

  dueDiv.append(dueLabel, dueBtn, dueInput);

  // ---------- PRIORITY ICON BUTTONS ----------
  const priorityDiv = document.createElement("div");
  priorityDiv.classList.add("modal-row");

  const pLabel = document.createElement("label");
  pLabel.textContent = "Priority";

  let selectedPriority = null;

  const low = document.createElement("i");
  low.classList.add("fa-solid", "fa-flag", "priority-low", "icon-btn");

  const med = document.createElement("i");
  med.classList.add("fa-solid", "fa-flag", "priority-medium", "icon-btn");

  const high = document.createElement("i");
  high.classList.add("fa-solid", "fa-flag", "priority-high", "icon-btn");

  [low, med, high].forEach((btn, index) => {
    btn.dataset.level = ["low", "medium", "high"][index];
    btn.addEventListener("click", () => {
      selectedPriority = btn.dataset.level;
    });
  });

  priorityDiv.append(pLabel, low, med, high);

  // ---------- PROJECT DROPDOWN ICON ----------
  const projectDiv = document.createElement("div");
  projectDiv.classList.add("modal-row");

  const projLabel = document.createElement("label");
  projLabel.textContent = "Project";

  const projBtn = document.createElement("i");
  projBtn.classList.add("fa-solid", "fa-folder-plus", "icon-btn");

  const projSelect = document.createElement("select");
  projSelect.style.display = "none";

  projBtn.addEventListener("click", () => {
    projSelect.style.display =
      projSelect.style.display === "none" ? "block" : "none";
  });

  projectDiv.append(projLabel, projBtn, projSelect);

  // ------------------ SUBMIT ICON ------------------
  const submitBtn = document.createElement("button");
  submitBtn.textContent = "Add task";

  // submit form when clicking icon
  submitBtn.addEventListener("click", () => form.requestSubmit());

  // ------------------ FORM SUBMIT ------------------
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
    renderPages();
  });

  // ------------------ BUILD DOM ------------------
  modalBtns.append(dueDiv, priorityDiv, projectDiv, submitBtn);
  content.append(titleDiv, descDiv, modalBtns);

  form.append(header, content);
  container.append(form);
  modal.append(container);
  document.body.append(modal);
}

// main content section of the page
export function renderContentDetails(todo) {
  const main = document.querySelector("#main");
  main.innerHTML = "";

  const mainTitle = document.createElement("h2");
  mainTitle.textContent = todo.title;

  const todos = getTodos();

  const todoList = document.createElement("div");
  todoList.id = "todoList";

  todos.forEach((todo) => {
    const todoItem = document.createElement("div");
    todoItem.id = "todoItem";

    const todoTitle = document.createElement("p");
    todoTitle.textContent = todo.title;

    const actionsDiv = document.createElement("div");
    actionsDiv.classList.add("actions");

    const todoCheck = document.createElement("i");
    todoCheck.classList.add("fas", "fa-check");

    const editTodo = document.createElement("i");
    editTodo.classList.add("fas", "fa-pen-to-square");

    const dueDate = document.createElement("span");
    dueDate.textContent = todo.dueDate;

    const delTodo = document.createElement("i");
    delTodo.classList.add("fas", "fa-ban");

    actionsDiv.append(todoCheck, editTodo, delTodo);
    todoItem.append(todoTitle, dueDate, actionsDiv);
    todoList.appendChild(todoItem);
  });

  main.append(mainTitle, todoList);
}

export function renderHome() {
  const todos = getTodos();
  renderList("Home", todos);
}

export function renderToday() {
  const todos = getTodos();

  const today = new Date().toDateString();
  const todayList = todos.filter((todo) => {
    if (!todo.dueDate) return false;
    return new Date(todo.dueDate).toDateString() == today;
  });

  renderList("Today", todayList);
}

export function renderWeek() {
  const todos = getTodos();

  const now = new Date();
  const week = new Date().toDateString();
  console.log(now);
  console.log(week);
  const todayList = todos.filter((todo) => {
    if (!todo.dueDate) return false;

    const due = new Date(todo.dueDate);
    return new Date(todo.dueDate).toDateString() == today;
  });

  renderList("Today", todayList);
}

export function renderList(title, list) {}

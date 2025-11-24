import "./styles.css";
import { renderContentDetails, renderSidebar } from "./modules/ui";
import "./modules/todoManager";
import { format } from "date-fns";

function createLayout() {
  // header
  const header = document.createElement("header");
  const title = document.createElement("h1");
  title.textContent = "Todoer";

  const today = new Date();
  const formattedDateTime = format(today, "dd-MMM-yy");
  const formattedDnT = document.createElement("div");
  formattedDnT.append(formattedDateTime);
  formattedDnT.id = "formattedDnT";

  header.append(title, formattedDateTime);

  document.body.append(header);

  // content to include sidebar and main
  const content = document.createElement("div");
  content.id = "content";
  document.body.append(content);

  // sidebar
  const sidebar = document.createElement("div");
  sidebar.id = "sidebar";

  // main
  const main = document.createElement("div");
  const mainTitle = document.createElement("h2");
  main.id = "main";
  main.append(mainTitle);
  content.append(sidebar, main);
}

document.addEventListener("DOMContentLoaded", () => {
  createLayout();
  renderSidebar();
  renderContentDetails();
});

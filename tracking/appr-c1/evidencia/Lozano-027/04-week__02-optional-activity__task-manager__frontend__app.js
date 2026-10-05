// Public API: JSONPlaceholder (https://jsonplaceholder.typicode.com)
// It's a real, free, public REST API with no authentication required.
// Note: it accepts POST/PATCH/DELETE and answers as if they worked, but it
// does NOT actually persist writes on its server (it's a fake/testing API).
// So the app performs the real fetch() calls (to satisfy the "consume an
// API" requirement) and then reflects the change in local state, since the
// server itself won't keep it.
const API_BASE = "https://jsonplaceholder.typicode.com/todos";
const USER_ID = 1; // limit the public dataset to one "user" so the list stays short

let tasks = []; // local copy of the tasks currently shown

const elements = {
  form: document.getElementById("task-form"),
  input: document.getElementById("task-title"),
  summary: document.getElementById("task-summary"),
  loading: document.getElementById("state-loading"),
  error: document.getElementById("state-error"),
  errorMessage: document.getElementById("error-message"),
  retryButton: document.getElementById("retry-button"),
  empty: document.getElementById("state-empty"),
  list: document.getElementById("task-list"),
  template: document.getElementById("task-item-template"),
};

function setState(state) {
  // state: "loading" | "error" | "empty" | "data"
  elements.loading.hidden = state !== "loading";
  elements.error.hidden = state !== "error";
  elements.empty.hidden = state !== "empty";
  elements.list.hidden = state !== "data";
}

function updateSummary(list) {
  const pending = list.filter((t) => t.status === "pending").length;
  const completed = list.filter((t) => t.status === "completed").length;
  elements.summary.textContent = `${pending} pending · ${completed} completed`;
}

function formatDate(isoString) {
  try {
    return new Date(isoString).toLocaleDateString(undefined, {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  } catch {
    return "";
  }
}

function render() {
  elements.list.innerHTML = "";

  if (tasks.length === 0) {
    setState("empty");
    updateSummary(tasks);
    return;
  }

  tasks.forEach((task) => {
    const node = elements.template.content.firstElementChild.cloneNode(true);
    node.dataset.id = task.id;
    node.classList.toggle("completed", task.status === "completed");

    node.querySelector(".task-title").textContent = task.title;
    node.querySelector(".task-date").textContent = `Created: ${formatDate(task.createdAt)}`;
    node.querySelector(".status-badge").textContent = task.status;

    node.querySelector(".status-toggle").addEventListener("click", () => {
      toggleTaskStatus(task.id);
    });
    node.querySelector(".delete-button").addEventListener("click", () => {
      deleteTask(task.id);
    });

    elements.list.appendChild(node);
  });

  setState("data");
  updateSummary(tasks);
}

async function loadTasks() {
  setState("loading");
  try {
    const response = await fetch(`${API_BASE}?userId=${USER_ID}`);
    if (!response.ok) {
      throw new Error(`Server responded with status ${response.status}`);
    }
    const data = await response.json();
    // Map the public API shape ({ id, title, completed }) to our own model.
    tasks = data.map((item) => ({
      id: item.id,
      title: item.title,
      status: item.completed ? "completed" : "pending",
      createdAt: new Date().toISOString(),
    }));
    render();
  } catch (err) {
    console.error("Failed to load tasks:", err);
    elements.errorMessage.textContent =
      "Could not load tasks from the API. Check your connection and try again.";
    setState("error");
  }
}

async function addTask(title) {
  try {
    const response = await fetch(API_BASE, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, completed: false, userId: USER_ID }),
    });
    if (!response.ok) {
      throw new Error(`Server responded with status ${response.status}`);
    }
    // JSONPlaceholder answers with a fake new id, but does not really store it.
    const created = await response.json();
    tasks.unshift({
      id: created.id ?? Date.now(),
      title,
      status: "pending",
      createdAt: new Date().toISOString(),
    });
    render();
  } catch (err) {
    console.error("Failed to add task:", err);
    elements.errorMessage.textContent = "Could not add the task. Please try again.";
    setState("error");
  }
}

async function toggleTaskStatus(id) {
  const task = tasks.find((t) => t.id === id);
  if (!task) return;
  const nextStatus = task.status === "pending" ? "completed" : "pending";

  try {
    const response = await fetch(`${API_BASE}/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ completed: nextStatus === "completed" }),
    });
    if (!response.ok) {
      throw new Error(`Server responded with status ${response.status}`);
    }
    task.status = nextStatus;
    render();
  } catch (err) {
    console.error("Failed to update task:", err);
    elements.errorMessage.textContent = "Could not update the task. Please try again.";
    setState("error");
  }
}

async function deleteTask(id) {
  try {
    const response = await fetch(`${API_BASE}/${id}`, { method: "DELETE" });
    if (!response.ok) {
      throw new Error(`Server responded with status ${response.status}`);
    }
    tasks = tasks.filter((t) => t.id !== id);
    render();
  } catch (err) {
    console.error("Failed to delete task:", err);
    elements.errorMessage.textContent = "Could not delete the task. Please try again.";
    setState("error");
  }
}

elements.form.addEventListener("submit", (event) => {
  event.preventDefault();
  const title = elements.input.value.trim();
  if (!title) return;
  addTask(title);
  elements.form.reset();
});

elements.retryButton.addEventListener("click", loadTasks);

loadTasks();

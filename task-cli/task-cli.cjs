#!/usr/bin/env node
//helper functions
const fs = require("fs");
const path = require("path");

const FILE_PATH = path.join(process.cwd(), "tasks.json");

function loadTasks() {
  if (!fs.existsSync(FILE_PATH)) {
    fs.writeFileSync(FILE_PATH, JSON.stringify([], null, 2));
    return [];
  }
  try {
    const raw = fs.readFileSync(FILE_PATH, "utf-8");
    return raw.trim() ? JSON.parse(raw) : [];
  } catch (err) {
    console.error("Error: tasks.json is corrupted or unreadable.");
    process.exit(1);
  }
}

function saveTasks(tasks) {
  fs.writeFileSync(FILE_PATH, JSON.stringify(tasks, null, 2));
}

//Parsing the command arguments
const args = process.argv.slice(2);
const command = args[0];
console.log(args);
console.log(command);

//Implement add
function addTask(description) {
  if (!description) {
    console.error("Error: Please provide a task description.");
    process.exit(1);
  }
  const tasks = loadTasks();
  const newId = tasks.length ? Math.max(...tasks.map((t) => t.id)) + 1 : 1;
  const now = new Date().toISOString();
  const task = {
    id: newId,
    description,
    status: "todo",
    createdAt: now,
    updatedAt: now,
  };
  tasks.push(task);
  saveTasks(tasks);
  console.log(`Task added successfully (ID: ${newId})`);
}

//implement update and delete
function findTaskOrExit(tasks, id) {
  const task = tasks.find((t) => t.id === Number(id));
  if (!task) {
    console.error(`Error: No task found with ID ${id}.`);
    process.exit(1);
  }
  return task;
}

function updateTask(id, newDescription) {
  if (!id || !newDescription) {
    console.error("Error: Usage: update <id> <new description>");
    process.exit(1);
  }
  const tasks = loadTasks();
  const task = findTaskOrExit(tasks, id);
  task.description = newDescription;
  task.updatedAt = new Date().toISOString();
  saveTasks(tasks);
  console.log(`Task ${id} updated successfully.`);
}

function deleteTask(id) {
  if (!id) {
    console.error("Error: Usage: delete <id>");
    process.exit(1);
  }
  const tasks = loadTasks();
  findTaskOrExit(tasks, id); // confirms it exists
  const filtered = tasks.filter((t) => t.id !== Number(id));
  saveTasks(filtered);
  console.log(`Task ${id} deleted successfully.`);
}

//Implement status change
function markTask(id, status) {
  const tasks = loadTasks();
  const task = findTaskOrExit(tasks, id);
  task.status = status;
  task.updatedAt = new Date().toISOString();
  saveTasks(tasks);
  console.log(`Task ${id} marked as ${status}.`);
}

//implement listing
function listTasks(filterStatus) {
  const tasks = loadTasks();
  const filtered = filterStatus
    ? tasks.filter((t) => t.status === filterStatus)
    : tasks;

  if (filtered.length === 0) {
    console.log("No tasks found.");
    return;
  }

  filtered.forEach((t) => {
    console.log(`[${t.id}] (${t.status}) ${t.description}`);
  });
}

switch (command) {
  case "add":
    addTask(args[1]);
    break;
  case "update":
    updateTask(args[1], args[2]);
    break;
  case "delete":
    deleteTask(args[1]);
    break;
  case "mark-in-progress":
    markTask(args[1], "in-progress");
    break;
  case "mark-done":
    markTask(args[1], "done");
    break;
  case "list":
    if (args[1] === "done") listTasks("done");
    else if (args[1] === "todo") listTasks("todo");
    else if (args[1] === "in-progress") listTasks("in-progress");
    else listTasks(); // no filter = all tasks
    break;
  default:
    console.log("Unknown command. Available commands:");
    console.log("  add <description>");
    console.log("  update <id> <description>");
    console.log("  delete <id>");
    console.log("  mark-in-progress <id>");
    console.log("  mark-done <id>");
    console.log("  list [done|todo|in-progress]");
}

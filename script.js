// Select elements
const todoInput = document.getElementById("todoInput");
const addBtn = document.getElementById("addBtn");
const todoList = document.getElementById("todoList");

// Load tasks from localStorage when the page loads
window.addEventListener("load", loadTasks);

// Add event listener to the "Add Task" button
addBtn.addEventListener("click", addTask);

// Function to add a new task
function addTask() {
    const taskText = todoInput.value.trim();
    if (taskText !== "") {
        const task = {
            text: taskText,
            completed: false
        };
        addTaskToDOM(task); // Add to the DOM
        saveTask(task); // Save to localStorage
        todoInput.value = ""; // Clear input field
    } else {
        alert("Please enter a task!");
    }
}

// Function to add a task to the DOM
function addTaskToDOM(task) {
    const newTask = document.createElement("li");
    newTask.innerHTML = `
        <input type="checkbox" class="completeCheckbox" ${task.completed ? "checked" : ""}>
        <span class="${task.completed ? "completed" : ""}">${task.text}</span>
        <button class="deleteBtn">Delete</button>
    `;

    // Event listener for marking task as completed
    const checkbox = newTask.querySelector(".completeCheckbox");
    checkbox.addEventListener("change", () => toggleComplete(task, newTask));

    // Event listener for deleting a task
    const deleteBtn = newTask.querySelector(".deleteBtn");
    deleteBtn.addEventListener("click", () => deleteTask(task, newTask));

    // Append the task to the list
    todoList.appendChild(newTask);
}

// Function to toggle task completion
function toggleComplete(task, taskElement) {
    task.completed = !task.completed; // Toggle completion state
    const span = taskElement.querySelector("span");
    span.classList.toggle("completed", task.completed); // Update styling
    updateTasks(); // Update localStorage
}

// Function to delete a task
function deleteTask(task, taskElement) {
    todoList.removeChild(taskElement); // Remove from DOM
    const tasks = getTasks();
    const updatedTasks = tasks.filter((t) => t.text !== task.text);
    saveTasks(updatedTasks); // Update localStorage
}

// Function to load tasks from localStorage
function loadTasks() {
    const tasks = getTasks();
    tasks.forEach((task) => addTaskToDOM(task));
}

// Function to get tasks from localStorage
function getTasks() {
    return JSON.parse(localStorage.getItem("tasks")) || [];
}

// Function to save a single task to localStorage
function saveTask(task) {
    const tasks = getTasks();
    tasks.push(task);
    saveTasks(tasks);
}

// Function to save all tasks to localStorage
function saveTasks(tasks) {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Optional: Add "Enter" key functionality for adding tasks
todoInput.addEventListener("keypress", (event) => {
    if (event.key === "Enter") {
        addTask();
    }
});


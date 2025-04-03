document.addEventListener("DOMContentLoaded", loadTasks);

const taskInput = document.getElementById("taskInput");
const addTaskButton = document.getElementById("addTask");
const taskList = document.getElementById("taskList");

// Add task to the list
addTaskButton.addEventListener("click", function () {
    const taskText = taskInput.value.trim();
    
    if (taskText === "") {
        alert("Task cannot be empty!");
        return;
    }

    addTaskToDOM(taskText);
    saveTask(taskText);
    taskInput.value = "";
});

// Function to add task to DOM with Edit & Delete buttons
function addTaskToDOM(taskText) {
    const li = document.createElement("li");
    li.innerHTML = `
        <span class="task-text">${taskText}</span>
        <div class="btn-group">
            <button class="edit-btn">Edit</button>
            <button class="delete-btn">X</button>
        </div>
    `;

    const editButton = li.querySelector(".edit-btn");
    const deleteButton = li.querySelector(".delete-btn");

    // Edit task
    editButton.addEventListener("click", function () {
        const taskSpan = li.querySelector(".task-text");
        const newText = prompt("Edit your task:", taskSpan.innerText);

        if (newText !== null && newText.trim() !== "") {
            updateTask(taskSpan.innerText, newText.trim());
            taskSpan.innerText = newText.trim();
        }
    });

    // Delete task
    deleteButton.addEventListener("click", function () {
        li.remove();
        removeTask(taskText);
    });

    taskList.appendChild(li);
}

// Save task to local storage
function saveTask(taskText) {
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.push(taskText);
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Load tasks from local storage
function loadTasks() {
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.forEach(task => addTaskToDOM(task));
}

// Remove task from local storage
function removeTask(taskText) {
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks = tasks.filter(task => task !== taskText);
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Update task in local storage
function updateTask(oldText, newText) {
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    let taskIndex = tasks.indexOf(oldText);
    
    if (taskIndex !== -1) {
        tasks[taskIndex] = newText;
        localStorage.setItem("tasks", JSON.stringify(tasks));
    }
}

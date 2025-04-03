document.addEventListener("DOMContentLoaded", loadTasks);

const taskInput = document.getElementById("taskInput");
const categorySelect = document.getElementById("categorySelect");
const addTaskButton = document.getElementById("addTask");
const taskList = document.getElementById("taskList");

// Add task to the list
addTaskButton.addEventListener("click", function () {
    const taskText = taskInput.value.trim();
    const category = categorySelect.value;
    
    if (taskText === "") {
        alert("Task cannot be empty!");
        return;
    }

    addTaskToDOM(taskText, category);
    saveTask(taskText, category);
    taskInput.value = "";
});

// Function to add task to DOM with Edit & Delete buttons
function addTaskToDOM(taskText, category) {
    const li = document.createElement("li");
    li.innerHTML = `
        <span class="task-text">${taskText} </span>
        <span class="task-category ${category.toLowerCase()}">${category}</span>
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
            updateTask(taskSpan.innerText, newText.trim(), category);
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
function saveTask(taskText, category) {
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.push({ text: taskText, category: category });
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Load tasks from local storage
function loadTasks() {
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.forEach(task => addTaskToDOM(task.text, task.category));
}

// Remove task from local storage
function removeTask(taskText) {
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks = tasks.filter(task => task.text !== taskText);
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Update task in local storage
function updateTask(oldText, newText, category) {
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    let taskIndex = tasks.findIndex(task => task.text === oldText);
    
    if (taskIndex !== -1) {
        tasks[taskIndex].text = newText;
        localStorage.setItem("tasks", JSON.stringify(tasks));
    }
}

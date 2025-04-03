document.addEventListener("DOMContentLoaded", function () {
    const taskInput = document.getElementById("taskInput");
    const categorySelect = document.getElementById("categorySelect");
    const addTaskButton = document.getElementById("addTask");
    const taskList = document.getElementById("taskList");

    addTaskButton.addEventListener("click", function () {
        const taskText = taskInput.value.trim();
        const category = categorySelect.value;

        if (taskText === "") {
            alert("Please enter a task!");
            return;
        }

        addTaskToList(taskText, category);
        taskInput.value = ""; // Clear input after adding
    });

    function addTaskToList(taskText, category) {
        const li = document.createElement("li");
        li.innerHTML = `
            <span class="task-category ${category.toLowerCase()}">${category}</span>
            <span class="task-text">${taskText}</span>
            <div class="btn-group">
                <button class="edit-btn">Edit</button>
                <button class="delete-btn">Delete</button>
            </div>
        `;

        taskList.appendChild(li);

        // Delete Button
        li.querySelector(".delete-btn").addEventListener("click", function () {
            li.remove();
        });

        // Edit Button
        li.querySelector(".edit-btn").addEventListener("click", function () {
            const newTask = prompt("Edit your task:", taskText);
            if (newTask !== null && newTask.trim() !== "") {
                li.querySelector(".task-text").textContent = newTask.trim();
            }
        });
    }
});

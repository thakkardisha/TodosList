const form = document.getElementById("todo-form");
const addBtn = document.getElementById("todo-btn");
let editingTaskCard = null;
const input = document.getElementById("todo-input");
const taskList = document.getElementById("task-list");
const taskStats = document.getElementById("task-stats");

// Function to update task stats
function updateTaskStats() {
    const allTasks = document.querySelectorAll(".task-card");
    let pending = 0, completed = 0;
    allTasks.forEach(card => {
        if (card.querySelector("h5").classList.contains("done")) {
            completed++;
        } else {
            pending++;
        }
    });
    taskStats.textContent = `Pending tasks : ${pending} | Completed tasks : ${completed}`;
}

// Add task
form.addEventListener("submit", function (e) {
    e.preventDefault();
    const taskText = input.value.trim();

    if (taskText === "") return;

    if (editingTaskCard) {
        // Update the existing task
        const taskTextElem = editingTaskCard.querySelector("#inputtedTask");
        taskTextElem.textContent = taskText;
        editingTaskCard = null;
        addBtn.textContent = "Add Task";
        input.value = "";
        updateTaskStats();
        return;
    }

    const taskCard = document.createElement("div");
    taskCard.classList.add("task-card");

    taskCard.innerHTML = `
        <h5 id="inputtedTask" style="color:white; margin-bottom:25px">${taskText}</h5>
        <button class="btn btn-done btn-sm">Mark as Done</button>
        <button class="btn btn-edit btn-sm">Edit</button>
        <button class="btn btn-delete btn-sm">Delete</button>                
    `;

    // Mark as done
    taskCard.querySelector(".btn-done").addEventListener("click", function () {
        taskCard.querySelector("h5").classList.toggle("done");
        updateTaskStats();
    });

    // Edit task
    // Edit task
taskCard.querySelector(".btn-edit").addEventListener("click", function () {
    const taskTextElem = taskCard.querySelector("#inputtedTask");

    // ❌ Prevent editing if task is already marked as done
    if (taskTextElem.classList.contains("done")) {
        alert("You cannot edit a completed task!");
        return;
    }

    input.value = taskTextElem.textContent;
    input.focus();
    addBtn.textContent = "Update Task";
    editingTaskCard = taskCard;
});


    // Delete task
    taskCard.querySelector(".btn-delete").addEventListener("click", function () {
        taskCard.remove();
        if (editingTaskCard === taskCard) {
            editingTaskCard = null;
            addBtn.textContent = "Add Task";
            input.value = "";
        }
        updateTaskStats(); 
    });

    taskList.appendChild(taskCard);
    input.value = "";

    updateTaskStats();
});

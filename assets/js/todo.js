const form = document.getElementById("todo-form");
const input = document.getElementById("todo-input");
const taskList = document.getElementById("task-list");

// Add task
form.addEventListener("submit", function (e) {
    e.preventDefault();
    const taskText = input.value.trim();

    if (taskText === "") return;

    const taskCard = document.createElement("div");
    taskCard.classList.add("task-card");

    taskCard.innerHTML = `
                <h5 style="color:white; margin-bottom:25px">${taskText}</h5>
                <button class="btn btn-success btn-sm">Mark as Done</button>
                <button class="btn btn-danger btn-sm">Delete</button>
            `;

    // Mark as done
    taskCard.querySelector(".btn-success").addEventListener("click", function () {
        taskCard.querySelector("h5").classList.toggle("done");
    });

    // Delete task
    taskCard.querySelector(".btn-danger").addEventListener("click", function () {
        taskCard.remove();
    });

    taskList.appendChild(taskCard);
    input.value = "";
});


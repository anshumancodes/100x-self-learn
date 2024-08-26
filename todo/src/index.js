// Display today's date
const dateToday = document.getElementsByClassName("dateToday")[0];
const today = new Date();
const todaydate = document.createElement("p");
todaydate.textContent = today.toDateString();
dateToday.appendChild(todaydate);

// Initialize task list and tasks array
const taskList = document.getElementsByClassName("taskList")[0];
const input = document.getElementsByClassName("input")[0];
const addButton = document.getElementsByClassName("addtask")[0];
const clear = document.getElementsByClassName("clear")[0];
let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

// Add task
addButton.addEventListener("click", (e) => {
    e.preventDefault();
    const task = input.value.trim();
    if (task) {
        tasks.push(task);
        localStorage.setItem("tasks", JSON.stringify(tasks));
        renderTasks();
        input.value = "";
    }
});

// Delete or update task
document.addEventListener("click", (e) => {
    const taskElement = e.target.closest("li");
    if (taskElement) {
        if (e.target.textContent === "✖") { // Delete
            tasks = tasks.filter(task => task !== taskElement.firstChild.textContent.trim());
            localStorage.setItem("tasks", JSON.stringify(tasks));
            renderTasks();
        } else if (e.target.textContent === "✎") { // Update
            const input = document.createElement("input");
            input.type = "text";
            input.value = taskElement.firstChild.textContent.trim();
            taskElement.replaceChild(input, taskElement.firstChild);
            input.focus();
            input.addEventListener("keypress", (e) => {
                if (e.key === "Enter") {
                    const newTask = input.value.trim();
                    if (newTask) {
                        tasks[tasks.indexOf(taskElement.firstChild.textContent.trim())] = newTask;
                        localStorage.setItem("tasks", JSON.stringify(tasks));
                        renderTasks();
                    }
                }
            });
        } else if (e.target.textContent === "☐") { // Toggle completion
            e.target.textContent = e.target.textContent === "☐" ? "✔" : "☐";
        }
    }
});

// Clear all tasks
clear.addEventListener("click", (e) => {
    e.preventDefault();
    tasks = [];
    localStorage.removeItem("tasks");
    renderTasks();
});

// Render tasks
function renderTasks() {
    taskList.innerHTML = "";
    tasks.forEach(task => {
        const taskElement = document.createElement("li");
        const actionBox = document.createElement("div");
        const deletetask = document.createElement("span");
        const updatetask = document.createElement("span");
        const completed = document.createElement("span");

        taskElement.textContent = task;
        taskElement.appendChild(actionBox);
        actionBox.classList.add("actionBox");
        actionBox.appendChild(deletetask);
        actionBox.appendChild(updatetask);
        actionBox.appendChild(completed);
        deletetask.textContent = "✖"; // Cross mark
        updatetask.textContent = "✎"; // Pencil/Edit icon
        completed.textContent = "☐"; // Empty checkbox

        deletetask.style.color = "red";
        deletetask.style.cursor = "pointer";
        updatetask.style.color = "yellow";
        updatetask.style.cursor = "pointer";
        completed.style.color = "green";
        completed.style.cursor = "pointer";

        taskList.appendChild(taskElement);
    });
}

// Initial render
window.addEventListener("load", renderTasks);

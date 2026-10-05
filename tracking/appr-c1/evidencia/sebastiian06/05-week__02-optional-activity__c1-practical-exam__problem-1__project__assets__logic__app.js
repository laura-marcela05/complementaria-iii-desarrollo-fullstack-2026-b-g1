const button = document.getElementById("addButton");
const taskList = document.getElementById("taskList");

button.addEventListener("click", function () {

    const newTask = document.createElement("li");

    newTask.textContent = "Nueva tarea agregada";

    taskList.appendChild(newTask);

});
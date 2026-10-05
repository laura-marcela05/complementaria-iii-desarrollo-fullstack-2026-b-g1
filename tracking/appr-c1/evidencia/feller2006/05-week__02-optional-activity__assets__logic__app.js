const button = document.getElementById("loadButton");
const message = document.getElementById("message");
const taskList = document.getElementById("taskList");

button.addEventListener("click", function() {

    message.textContent = "Loading tasks...";

    fetch("https://jsonplaceholder.typicode.com/todos?_limit=5")
        .then(response => {
            if (!response.ok) {
                throw new Error("Error loading data");
            }

            return response.json();
        })
        .then(tasks => {

            message.textContent = "Tasks loaded successfully.";

            taskList.innerHTML = "";

            tasks.forEach(task => {

                const li = document.createElement("li");

                li.textContent = task.title;

                taskList.appendChild(li);
            });
        })
        .catch(error => {

            message.textContent = "Error loading tasks.";

            console.error(error);
        });
});
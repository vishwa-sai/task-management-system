function register(){

    let name = document.getElementById("name").value;
    let email = document.getElementById("regEmail").value;
    let password = document.getElementById("regPassword").value;

    let user = {
        name,
        email,
        password
    };

    localStorage.setItem(email, JSON.stringify(user));

    alert("Registration Successful");

    window.location.href = "login.html";
}

function login(){

    let email = document.getElementById("email").value;
    let password = document.getElementById("password").value;

    let user = JSON.parse(localStorage.getItem(email));

    if(user && user.password === password){
    alert("Login Successful");
    window.location.href = "dashboard.html";
    }else{
        alert("Invalid Credentials");
    }
}
function addTask() {

    let taskInput = document.getElementById("taskInput");
    let taskText = taskInput.value;

    if(taskText.trim() === ""){
        alert("Enter a task");
        return;
    }

    let taskList = document.getElementById("taskList");

    let li = document.createElement("li");

    li.innerHTML = `
        <input type="checkbox" onchange="toggleTask(this)">
        <span>${taskText}</span>
        <button onclick="editTask(this)">Edit</button>
        <button onclick="deleteTask(this)">Delete</button>
    `;

    taskList.appendChild(li);
    saveTasks();
    taskInput.value = "";
    updateTaskCount();
}

function deleteTask(button){
    button.parentElement.remove();
    saveTasks();
    updateTaskCount();
}

function editTask(button){

    let currentTask =
        button.parentElement.querySelector("span");

    let newTask =
        prompt("Edit Task", currentTask.innerText);

    if(newTask){
        currentTask.innerText = newTask;
        saveTasks();
    }
}
function saveTasks() {
    let tasks = [];
    
    document.querySelectorAll("#taskList li span").forEach(task => {
        tasks.push(task.innerText);
    });

    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function loadTasks() {

    let tasks =
        JSON.parse(localStorage.getItem("tasks")) || [];

    tasks.forEach(task => {

        let li = document.createElement("li");

    li.innerHTML = `
        <input type="checkbox" onchange="toggleTask(this)">
        <span>${task}</span>
        <button onclick="editTask(this)">Edit</button>
        <button onclick="deleteTask(this)">Delete</button>
    `;

        document.getElementById("taskList")
            .appendChild(li);
    });
    updateTaskCount();
}

window.onload = loadTasks;
function logout(){
    window.location.href = "login.html";
}

function toggleTask(checkbox){

    let taskText =
        checkbox.parentElement.querySelector("span");

    if(checkbox.checked){
        taskText.style.textDecoration = "line-through";
        taskText.style.opacity = "0.6";
    }
    else{
        taskText.style.textDecoration = "none";
        taskText.style.opacity = "1";
    }

    saveTasks();
}
function updateTaskCount(){
    let count = document.querySelectorAll("#taskList li").length;
    document.getElementById("taskCount").innerText =
        "Total Tasks: " + count;
}
document.addEventListener("DOMContentLoaded", () => {

    let input = document.getElementById("taskInput");

    if(input){
        input.addEventListener("keypress", function(event){

            if(event.key === "Enter"){
                addTask();
            }

        });
    }

});
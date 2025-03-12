var todo = []
var completed

// get task list from local storage
if (localStorage.getItem('todo'))
    todo = JSON.parse(localStorage.getItem('todo'))


if (localStorage.getItem('completed'))
    completed = JSON.parse(localStorage.getItem('completed'))
else completed = new Array(todo.length).fill(false)

let taskContainer = document.getElementById('tasks')

// populate the task container with data
if (todo.length > 0 && taskContainer.innerHTML == "") {
    for (let i = 0; i < todo.length; i++) {
        addTask(todo[i])
        if (completed[i] == true)
            completeTask(i)
    }
}


const todoForm = document.getElementById('todoForm')

// form handling
todoForm.addEventListener('submit', (event) => {
    event.preventDefault()

    let task = todoForm.elements['task'].value // get task name

    if (todo.indexOf(task) == -1 && task != "") { // check if a task is unique and non-empty
        todo.push(task)
        completed.push(false)
        addTask(task)
        localStorage.setItem('todo', JSON.stringify(todo))
        localStorage.setItem('completed', JSON.stringify(completed))

    } else 
        alert("task already exists / can't set an empty task")
    
    todoForm.elements['task'].value = ''   // reset input 
})

function addTask(taskName) {
    const newTask = document.createElement("div")
    newTask.className = "simple-flex"

    const taskContent = document.createElement("div")
    taskContent.textContent = taskName

    const deleteButton = document.createElement("img")
    deleteButton.src = "/assets/delete.svg"
    deleteButton.className = "delete"
    deleteButton.addEventListener("click", () => removeTask(taskName))

    const checkButton = document.createElement("img")
    checkButton.src = "/assets/checkmark-square.svg"
    checkButton.className = "check"
    checkButton.addEventListener("click", () => completeTask(taskName))

    const buttonContainer = document.createElement("div")
    buttonContainer.className = "simple-flex"
    buttonContainer.appendChild(checkButton)
    buttonContainer.appendChild(deleteButton)

    newTask.appendChild(taskContent)
    newTask.appendChild(buttonContainer)

    taskContainer.appendChild(newTask)
}

function removeTask(task) {
    const index = todo.indexOf(task)
    todo.splice(index, 1)
    completed.splice(index, 1)
    localStorage.setItem('todo', JSON.stringify(todo))
    localStorage.setItem('completed', JSON.stringify(completed))
    taskContainer.removeChild(taskContainer.children[index])
}

function completeTask(task) {
    const index = todo.indexOf(task)
    if (taskContainer.children[index].classList.contains("task-done")) {
        taskContainer.children[index].classList.remove("task-done")
        completed[index] = false
    } else {
        taskContainer.children[index].classList.add("task-done")
        completed[index] = true
    }
    localStorage.setItem('completed', JSON.stringify(completed))
}

let todos = [];


const todoList = document.getElementById('todo-list');
const addButton = document.getElementById('add-button');
const titleInput = document.getElementById('title');
const descriptionInput = document.getElementById('description');
const countElement = document.getElementById('count');

// Function to update the todo list in the HTML
function updateTodoList() {
    todoList.innerHTML = '';
    todos.forEach((todo, index) => {
        const listItem = document.createElement('li');
        listItem.innerHTML = `
            <span>${todo.title} - ${todo.description}</span>
            <button onclick="markAsDone(${index})">${todo.done ? 'Undone' : 'Done'}</button>
            <button onclick="editTodo(${index})">Edit</button>
            <button onclick="deleteTodo(${index})">Delete</button>
        `;
        if (todo.done) {
            listItem.style.textDecoration = 'line-through';
        }
        todoList.appendChild(listItem);
    });
    updateTodoCount();
}

// Function to add a new todo
function addTodo() {
    const title = titleInput.value;
    const description = descriptionInput.value;
    todos.push({ title, description, done: false });
    updateTodoList();
    saveToLocalStorage();
    titleInput.value = '';
    descriptionInput.value = '';
}

// Function to mark a todo as done/undone
function markAsDone(index) {
    todos[index].done = !todos[index].done;
    updateTodoList();
    saveToLocalStorage();
}

// Function to edit a todo
function editTodo(index) {
    const newTitle = prompt('Edit Title:', todos[index].title);
    const newDescription = prompt('Edit Description:', todos[index].description);
    if (newTitle !== null && newDescription !== null) {
        todos[index].title = newTitle;
        todos[index].description = newDescription;
        updateTodoList();
        saveToLocalStorage();
    }
}

// Function to delete a todo
function deleteTodo(index) {
    todos.splice(index, 1);
    updateTodoList();
    saveToLocalStorage();
}

// Function to update the todo count
function updateTodoCount() {
    countElement.textContent = `Total Todos: ${todos.length}`;
}

// Function to save todos to local storage
function saveToLocalStorage() {
    localStorage.setItem('todos', JSON.stringify(todos));
}

// Function to load todos from local storage
function loadFromLocalStorage() {
    const storedTodos = localStorage.getItem('todos');
    if (storedTodos) {
        todos = JSON.parse(storedTodos);
        updateTodoList();
    }
}

// Event listeners
addButton.addEventListener('click', addTodo);
window.addEventListener('load', loadFromLocalStorage);

// Initialize the app
loadFromLocalStorage();

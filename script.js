const addButton = document.getElementById('add-btn');
const input = document.getElementById('task-input');
const taskList = document.getElementById('tasks');

// Load tasks from localStorage on page load
window.addEventListener('load', () => {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.forEach(task => addTaskToDOM(task.text, task.completed));
});

// Add new task
addButton.addEventListener('click', () => {
    const taskText = input.value.trim();
    if(taskText === '') return;
    addTaskToDOM(taskText);
    input.value = '';
    saveTasks();
});

input.addEventListener('keypress', (e) => {
    if(e.key === 'Enter') addButton.click();
});

// Function to add task to DOM
function addTaskToDOM(text, completed = false) {
    const li = document.createElement('li');
    li.textContent = text;
    if(completed) li.classList.add('completed');

    // Complete task on click
    li.addEventListener('click', () => {
        li.classList.toggle('completed');
        saveTasks();
    });

    // Delete button
    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'Delete';
    deleteBtn.classList.add('delete-btn');
    deleteBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        li.remove();
        saveTasks();
    });

    li.appendChild(deleteBtn);
    taskList.appendChild(li);
}

// Function to save tasks to localStorage
function saveTasks() {
    const tasks = [];
    taskList.querySelectorAll('li').forEach(li => {
        tasks.push({
            text: li.firstChild.textContent,
            completed: li.classList.contains('completed')
        });
    });
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

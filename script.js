const addButton = document.getElementById('add-btn');
const input = document.getElementById('task-input');
const taskList = document.getElementById('tasks');

window.addEventListener('load', () => {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.forEach(task => addTaskToDOM(task.text, task.completed));
    updateCounter();
});

// Add task function
function addTask() {
    const taskText = input.value.trim();
    if (taskText === '') return;

    addTaskToDOM(taskText);
    input.value = '';
    saveTasks();
}

// Button click
addButton.addEventListener('click', addTask);

// Enter key
input.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') addTask();
});

function addTaskToDOM(text, completed = false) {
    const li = document.createElement('li');

    const span = document.createElement('span');
    span.textContent = text;

    if (completed) li.classList.add('completed');

    li.addEventListener('click', () => {
        li.classList.toggle('completed');
        saveTasks();
    });

    li.appendChild(span);
    taskList.appendChild(li);

    updateCounter();
}

function saveTasks() {
    const tasks = [];

    document.querySelectorAll('li').forEach(li => {
        tasks.push({
            text: li.querySelector('span').textContent,
            completed: li.classList.contains('completed')
        });
    });

    localStorage.setItem('tasks', JSON.stringify(tasks));
    updateCounter();
}

function updateCounter() {
    const total = document.querySelectorAll('li').length;
    const completed = document.querySelectorAll('.completed').length;

    document.getElementById('counter').textContent =
        `${total - completed} tasks remaining`;
}

// Filter
function filterTasks(type) {
    document.querySelectorAll('li').forEach(li => {
        const done = li.classList.contains('completed');

        if (type === 'all') li.style.display = 'flex';
        else if (type === 'active') li.style.display = done ? 'none' : 'flex';
        else li.style.display = done ? 'flex' : 'none';
    });

    document.querySelectorAll('.filters span').forEach(btn => {
        btn.classList.remove('active');
    });

    event.target.classList.add('active');
}

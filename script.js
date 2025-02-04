document.addEventListener('DOMContentLoaded', () => {
	const taskForm = document.getElementById('taskForm');
	const taskInput = document.getElementById('taskInput');
	const taskList = document.getElementById('taskList');
	let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

	function saveTasks() {
		localStorage.setItem('tasks', JSON.stringify(tasks));
	}

	function renderTasks() {
		taskList.innerHTML = '';
		tasks.forEach((task, index) => {
			const li = document.createElement('li');
			li.className = `task-item ${task.completed ? 'completed' : ''}`;
			li.innerHTML = `
				<span>${task.text}</span>
				<span class="task-date">${task.date ? new Date(task.date).toLocaleString() : ''}</span>
				<div class="task-actions">
					<button class="edit-btn">Edit</button>
					<button class="delete-btn">Delete</button>
					<button class="complete-btn">${task.completed ? 'Undo' : 'Complete'}</button>
				</div>
			`;

			const editBtn = li.querySelector('.edit-btn');
			const deleteBtn = li.querySelector('.delete-btn');
			const completeBtn = li.querySelector('.complete-btn');

			editBtn.addEventListener('click', () => editTask(index));
			deleteBtn.addEventListener('click', () => deleteTask(index));
			completeBtn.addEventListener('click', () => toggleComplete(index));

			taskList.appendChild(li);
		});
	}

	function addTask(text) {
		const newTask = {
			text,
			completed: false,
			date: new Date().toISOString()
		};
		tasks.push(newTask);
		saveTasks();
		renderTasks();
	}

	function editTask(index) {
		const newText = prompt('Edit task:', tasks[index].text);
		if (newText !== null) {
			tasks[index].text = newText;
			tasks[index].date = new Date().toISOString();
			saveTasks();
			renderTasks();
		}
	}

	function deleteTask(index) {
		if (confirm('Are you sure you want to delete this task?')) {
			tasks.splice(index, 1);
			saveTasks();
			renderTasks();
		}
	}

	function toggleComplete(index) {
		tasks[index].completed = !tasks[index].completed;
		saveTasks();
		renderTasks();
	}

	taskForm.addEventListener('submit', (e) => {
		e.preventDefault();
		const text = taskInput.value.trim();
		if (text) {
			addTask(text);
			taskInput.value = '';
		}
	});

	renderTasks();
});
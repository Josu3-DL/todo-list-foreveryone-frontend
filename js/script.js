const taskinput = document.getElementById('taskInput')
const tasklist = document.getElementById('taskList')

function getTask()
{
    axios.get('api/tasks/')
        .then(response => {
            tasklist.innerHTML = '';
            response.data.forEach(element => {
                const li = document.createElement('li');
                li.innerHTML = `
                    ${element.title} 
                   <input type="checkbox" ${element.completed ? 'checked' : ''} onclick="toggleTask(${element.id}, ${element.completed})">
                    <button onclick="deleteTask(${element.id})">Delete</button>
                `;
                tasklist.appendChild(li);
            });
        });
}

function addTask() {
    const title = taskInput.value;
    if (!title) return alert('Task title is required!');
    axios.post('/api/tasks/', { title, completed: false })
        .then(() => {
            taskInput.value = '';
            getTask();

        });
}

function toggleTask(id, completed) {
    const newCompletedState = !completed;
    axios.patch(`/api/tasks/${id}/`, { completed: newCompletedState })
        .then(() => getTask())
}

function deleteTask(id){
    axios.delete(`/api/tasks/${id}/`)
        .then(() => getTask());
}

getTask();

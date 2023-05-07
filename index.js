console.log('funguju!');

const Task = (props) => {
    const { name, due, done } = props
    let taskMark = ''
    if (done) {
        taskMark = '✓'
    }
    return `
        <div class="task">
            <div class="task__body">
                <div class="task__name">${name}</div>
                <div class="task__due">${due}</div>
            </div>
            <div class="task__done">${taskMark}</div>
        </div>
        `
}

const renderTasks = (tasks) => {
    const todoTasksElm = document.querySelector('.todo__tasks')
    todoTasksElm.innerHTML = tasks.map(task => Task(task)).join('')
}

fetch('https://apps.kodim.cz/daweb/trening-api/apis/tasks-api/tasks')
    .then((response) => response.json())
    .then((data) => renderTasks(data))

const checkBoxElm = document.querySelector('#checkbox-undone')
checkBoxElm.addEventListener('change', (event) => {
    event.preventDefault()
    if (event.target.checked === true) {
        console.log('checked')
        fetch('https://apps.kodim.cz/daweb/trening-api/apis/tasks-api/tasks?done=false')
            .then((response) => response.json())
            .then((data) => renderTasks(data))
    }
    if (event.target.checked === false) {
        console.log('unchecked')
        fetch('https://apps.kodim.cz/daweb/trening-api/apis/tasks-api/tasks')
            .then((response) => response.json())
            .then((data) => renderTasks(data))
    }
})

const get = document.getElementById.bind(document)
const escapeHTMLSpecialChars = text => {
    return text.replace(/</g, '&lt;').replace(/>/g, '&gt;')
}
const validateTask = (event) => {
    event.preventDefault()
    let task = document.forms['form']['task'].value
    let addedTasks = get('tasks_list').children
    if (task.trim() == '') {
        alert('Please you cannot add an empty task')
        get('task').focus()
    } else if ((addedTasks.length == 0) && (task.trim() != '')) {
        addTask(task)
    } else {
        let taskList = []
        for (let addedTask of addedTasks) {
            taskList.push(addedTask.children[1].textContent.toLowerCase().trim())
        }
        if (taskList.indexOf(task.toLowerCase().trim()) == -1) {
            addTask(task)
        } else {
            alert('This task has been added')
            get('task').value = ''
            get('task').focus()
        }
    }
    return false
}
const addTask = (task) => {
    task = task.trim()
    task = escapeHTMLSpecialChars(task)
    let HTMLFragment = `
    <div class='task'>
      <input class="checkbox" type="checkbox">
      <p onclick="checkTaskOnTextClick(event)">${task}</p>
      <span onclick="removeTask(event)">Remove</span>
    </div>`
    let tasksList = get('tasks_list')
    tasksList.insertAdjacentHTML('beforeend', HTMLFragment)
    textbox = document.forms['form']['task']
    textbox.value = ''
    textbox.focus()
    updateRecords()
}
const checkTaskOnTextClick = event => {
    event.target.previousElementSibling.click()
    updateRecords()
}
const removeTask = event => {
    event.target.parentElement.remove()
    updateRecords()
}
const updateRecords = () => {
    let total = get('total')
    let done = get('done')
    let remaining = get('remaining')
    let totalTasks = get('tasks_list').children.length
    let doneTasks = []
    let checkboxes = document.getElementsByClassName('checkbox')
    for (let checkbox of checkboxes) {
        checkbox.checked ? doneTasks.push(checkbox) : console.log()
    }
    total.textContent = checkboxes.length
    done.textContent = doneTasks.length
    remaining.textContent = checkboxes.length - doneTasks.length
}
const clearTasks = () => {
    get('tasks_list').textContent = ''
    updateRecords()
}
get('form').addEventListener('submit', validateTask)
get('clear_btn').addEventListener('click', clearTasks)
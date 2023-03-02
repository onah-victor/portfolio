const get = document.getElementById.bind(document)
const noteEditor = get('note_editor')
const notesList = get('notes_list')
const noteSearch = get('note_search')
const views = document.getElementsByClassName('view')
class Note{
    constructor(title, content, dateCreated, timeCreated, id, edited) {
        this.title = title
        this.content = content
        this.dateCreated = dateCreated
        this.timeCreated = timeCreated
        this.id = id
        this.edited = false
    }
}
const notes = []
const days = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday']
const months = ['January', 'February','March','April','May','June','July','August','September','October','November','December']
const createNewNote = (title, content) => {
    const date = new Date()
    let month, day, monthDay, year
    day = days[date.getDay(date)]
    monthDay = date.getDate()
    month = months[date.getMonth()]
    year = date.getFullYear()
    let hours = date.getHours()
    let minutes = date.getMinutes()
    let amPm
    if (hours >= 12) {
        amPm = 'PM'
    } else {
        amPm = 'AM'
    }
    let formattedDateTime = formatDateTime(minutes, hours, monthDay)
    let dateCreated = `${day} ${formattedDateTime.day} ${month}, ${year}`
    let timeCreated = `${formattedDateTime.hours} : ${formattedDateTime.minutes} ${amPm}`
    let id = date.getTime() + date.getMilliseconds()
    let note = new Note(title, content, dateCreated, timeCreated, id, false)
    notes.push(note)
    getNotes(notes)
}
const saveNote = () => {
    let title = get('note_title').textContent.trim()
    let content = get('note').textContent.trim()
    if (title == '') {
        history.back()
    } else {
        createNewNote(title, content)
        get('note_title_input').value = ''
        get('new_note_title').style.display = 'grid'
        get('note').textContent = ''
        history.back()
    }
    console.log(notes.length)
}
const showNoteEditor = () => {
    for (let view of views) {
        if (!(view.classList.contains('hidden_view'))) view.classList.add('hidden_view')
    }
    noteEditor.classList.remove('hidden_view')
    get('note_title_input').focus()
}
const showNoteSearch = () => {
    for (let view of views) {
        if (!(view.classList.contains('hidden_view'))) view.classList.add('hidden_view')
    }
    noteSearch.classList.remove('hidden_view')
    get('searchbox').focus()
}
const showNotesList = () => {
    for (let view of views) {
        if (!(view.classList.contains('hidden_view'))) view.classList.add('hidden_view')
    }
    notesList.classList.remove('hidden_view')
}
const updateNoteTitle = () => {
    get('note_title').textContent = get('note_title_input').value
}
const saveNoteTitle = (event) => {
    event.preventDefault()
    get('new_note_title').style.display = 'none'
    get('note').focus()
    return false
}
const getNotes = notes => {
    get('notes').innerHTML = ''
    for (let note of notes) {
        let htmlFragment = `
        <div class="note" id="${note.id}">
          <div class="note_title">${note.title}</div>
          <div class="note_content">${note.content}</div>
          <div class="date_time">
            <p>Created on <span>${note.dateCreated}</span>. <span>${note.timeCreated}</span></p>
          </div>
        </div>
        `
        console.log(htmlFragment)
        get('notes').insertAdjacentHTML('afterbegin', htmlFragment)
    }
}
const toggleViewsOnHashChange = (event) => {
    event.preventDefault()
    if (location.hash != '') {
        let hashFragment = location.hash
        switch (hashFragment) {
            case ('#note_editor'):
            showNoteEditor()
            document.body.children[0].style.display = 'none'
            break
            case ('#note_search'):
            showNoteSearch()
            document.body.children[0].style.display = 'none'
            break
            default:
            showNotesList()
            document.body.children[0].style.display = 'flex'
            break
        }
    } else {
        showNotesList()
        document.body.children[0].style.display = 'flex'
    }
}
const formatDateTime = (minutes, hours, day) => {
    minutes = Number(minutes)
    hours = Number(hours)
    if (minutes < 10) {
        minutes = '0'+minutes;
    } else {
        minutes = minutes
    }
    switch (true) {
        case (hours == 0):
        hours = 12
        break
        case (hours > 12):
        hours = hours - 12
        break
        default:
        hours = hours
        break
    }
    day = String(day)
    switch (true) {
        case (day.endsWith(1)):
        day = day + 'st'
        break
        case (day.endsWith(2)):
        day = day + 'nd'
        break
        case (day.endsWith(3)):
        day = day + 'rd'
        break
        default:
        day = day + 'th'
    }
    return {minutes, hours, day}
}
get('note_title_input').addEventListener('keyup', updateNoteTitle)
document.forms['new_note_title'].addEventListener('submit', saveNoteTitle)
addEventListener('hashchange', toggleViewsOnHashChange)
get('note_editor_back_btn').addEventListener('click', () => history.back())
get('note_search_back_btn').addEventListener('click', () => history.back())
get('done').addEventListener('click', saveNote)
addEventListener('load', () => {
    if (location.hash) {
        location.hash = ''
    }
})
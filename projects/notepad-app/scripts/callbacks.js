import date from './date.js'


window.notes = []
const notes = window.notes
const get = document.getElementById.bind(document)
const views = document.querySelectorAll('.view')
class Note {
    constructor(title, content, id, dateCreated, edited) {
        this.title = title
        this.content = content
        this.id = id
        this.dateCreated = dateCreated
        this.edited = edited
    }
}
const showNoteEditor = () => {
    views.forEach(view => {
        view.classList.add('hidden')
    })
    get('note-editor').classList.remove('hidden')
    document.forms['note-title-input'].style.display = 'grid'
    document.forms['note-title-input']['new-note-title-input'].focus()
    get('new-note-title-input').value = ''
    get('new-note-title').textContent = ''
    get('new-note-content').value = ''
    toggleHeader()
}
const showNoteSearch = () => {
    views.forEach(view => {
        view.classList.add('hidden')
    })
    get('note-search').classList.remove('hidden')
    toggleHeader()
}
const showNotesList = () => {
    views.forEach(view => {
        view.classList.add('hidden')
    })
    get('notes-list').classList.remove('hidden')
    document.body.querySelector('header').classList.remove('hidden')
}
const showNoteViewer = () => {
    views.forEach(view => {
        view.classList.add('hidden')
    })
    get('note-viewer').classList.remove('hidden')
    toggleHeader()
}
const toggleHeader = () => {
    document.body.querySelector('header').classList.toggle('hidden')
}
const getNote = () => {
    let title = get('new-note-title').textContent
    let content = get('new-note-content').value
    let note = createNote(title, content)
    return note
}
const saveNote = () => {
    let note = getNote()
    note = new Note(note.title, note.content, note.id, note.dateCreated, note.edited)
    notes.unshift(note)
    displayNotes()
}
const createNote = (title, content) => {
    let dt = new Date()
    let monthDay, day, minutes, hours, year, month, amPm, id, edited
    month = date.months[dt.getMonth()]
    monthDay = dt.getDate()
    day = date.days[dt.getDay(dt)]
    minutes = dt.getMinutes()
    hours = dt.getHours()
    year = dt.getFullYear()
    amPm = 'AM'
    id = Math.floor(Math.random() * dt.getTime() * Math.random() * 15)
    edited = false
    let formatedDate = formatDate(minutes, hours, amPm)
    let dateCreated = `Created on ${day} ${month} ${monthDay}, ${year} at ${formatedDate.hours}:${formatedDate.minutes} ${formatedDate.amPm}`
    return {
        title,
        content,
        dateCreated,
        id,
        edited
    }
}
const formatDate = (minutes, hours, amPm) => {
    if (minutes && hours && amPm) {
        switch (true) {
            case (hours < 10):
                hours = '0'+hours
                break
            case (hours > 12):
                hours = hours - 12
                amPm = 'PM'
                break
            case (hours == 0):
                hours = 12
                break
            default:
                hours = hours
                amPm = amPm
        }
        if (minutes < 10) minutes = '0'+minutes
        return {
            minutes,
            hours,
            amPm
        }
    }
}
const displayNotes = () => {
    let container = get('intro')
    container.parentElement.style.display = 'block'
    container.style.textAlign = 'left'
    container.textContent = ''
    for (let note of notes) {
        let template = `
        <a href="#note-viewer"><div id="${note.id}" class="note">
            <h4 class="note-title">${note.title}</h4>
            <p class="note-content-preview">${note.content.substring(0, 20)}...</p>
            <small class="note-creation-time">${note.dateCreated}</small>
        </div></a>
        `
        container.insertAdjacentHTML('beforeend', template)
    }
    console.log(container.outerHTML)
}



export default {
    Note,
    notes,
    showNoteEditor,
    showNoteViewer,
    showNotesList,
    showNoteSearch,
    formatDate,
    saveNote
}
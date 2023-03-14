import date from './date.js'



window.notes = []
let notes = window.notes
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

const saveEditedNote = event => {
    let noteId = event.currentTarget.dataset.id
    for (let note of notes) {
        if (note.id == noteId) {
            let newTitle, newContent
            newTitle = get('new-note-title').textContent
            newContent = document.querySelector('textarea').value
            note.title = newTitle
            note.content = newContent
        }
    }
    history.back()
    displayNotes()
    alert('Note updated successfully')
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
    let formatedDate = date.formatDate(minutes, hours, amPm)
    let dateCreated = `Created on ${day} ${month} ${monthDay}, ${year} at ${formatedDate.hours}:${formatedDate.minutes} ${formatedDate.amPm}`
    return {
        title,
        content,
        dateCreated,
        id,
        edited
    }
}

const displayNotes = () => {
    let container = get('intro')
    container.parentElement.style.display = 'block'
    container.style.textAlign = 'left'
    container.textContent = ''
    for (let note of notes) {
        let template = `
        <a href="#note-viewer"><div onclick="viewNote(event)" id="${note.id}" class="note">
            <h4 class="note-title">${note.title}</h4>
            <p class="note-content-preview">${note.content.substring(0, 20)}...</p>
            <small class="note-creation-time">${note.dateCreated}</small>
        </div></a>
        `
        container.insertAdjacentHTML('beforeend', template)
    }
}

const createNewNote = () => {
    let noteTitle = get('new-note-title').textContent
    if (noteTitle != '') {
        saveNote()
        history.back()
    } else {
        history.back()
    }
}
const showNoteEditor = () => {
    for (let view of views) {
        view.classList.add('hidden')
    }
    get('note-editor').classList.remove('hidden')
}
const editNote = () => {
    let noteId = get('note-viewer-title').dataset.id
    for (let note of notes) {
        if (noteId == note.id) {
            get('new-note-title').textContent = note.title
            document.querySelector('textarea').value = note.content
            let saveEditBtn = get('save-edit-btn')
            saveEditBtn.style.display = 'block'
            saveEditBtn.dataset.id = noteId
            get('note-save-btn').style.display = 'none'
            showNoteEditor()
        }
    }
}
const deleteNote = () => {
    let confirmation = confirm('Are you sure you want to delete this note?')
    if (confirmation) {
        let noteId = get('note-viewer-title').dataset.id
        notes = notes.filter(note => {
            if (note.id != noteId) {
                return note
            }
        })
    }
    displayNotes()
    history.back()
}


export default {
    Note,
    notes,
    getNote,
    createNote,
    createNewNote,
    displayNotes,
    saveEditedNote,
    editNote,
    deleteNote,
    saveNote
}

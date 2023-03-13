import views from './views.js'
import callback from './callbacks.js'


const get = document.getElementById.bind(document)
const toggleViews = () => {
    switch (true) {
        case (location.hash == '#'+views.noteViewer):
            callback.showNoteViewer()
            break
        case (location.hash == '#'+views.noteSearch):
            callback.showNoteSearch()
            break
        case (location.hash == '#'+views.noteEditor):
            callback.showNoteEditor()
            break
        default:
            callback.showNotesList()
            break
    }
}
const saveNoteTitle = e => {
    e.preventDefault()
    document.forms['note-title-input'].style.display = 'none'
    return false
}
const setNoteTitle = () => {
    let title = get('new-note-title-input').value.trim()
    get('new-note-title').textContent = title
}
const editNoteTitle = () => {
    document.forms['note-title-input'].style.display = 'grid'
}
const createNewNote = () => {
    let noteTitle = get('new-note-title').textContent
    if (noteTitle != '') {
        callback.saveNote()
        history.back()
    } else {
        history.back()
    }
}
const returnToHome = () => {
    history.back()
}
const viewNote = e => {
    let note = e.currentTarget
    let noteId = note.id
    let notes = window.notes
    for (let note of notes) {
        if (note.id == noteId) {
            let noteIndex = notes.indexOf(note)
            let noteViewerTitle = get('note-viewer-title')
            noteViewerTitle.textContent = notes[noteIndex].title
            noteViewerTitle.dataset.id = notes[noteIndex].id
            get('note-viewer-content').textContent = notes[noteIndex].content
        }
    }
}




export default {
    toggleViews,
    saveNoteTitle,
    editNoteTitle,
    returnToHome,
    createNewNote,
    viewNote,
    setNoteTitle
}
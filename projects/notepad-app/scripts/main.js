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
const getNote = () => {
    let title = get('new-note-title').textContent
    let content = get('new-note-content').value
    let noteDetails = callback.createNote(title, content)
    console.log(noteDetails)
}

export default {
    toggleViews,
    getNote
}